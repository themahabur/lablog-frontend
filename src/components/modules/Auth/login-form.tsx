"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { userService } from "@/services/user.service";
import { useForm } from "@tanstack/react-form";
import { console } from "inspector/promises";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import * as z from "zod";

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectPath = searchParams.get("redirect") || "/";

  const formSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing in...");

      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (error) {
          toast.error(error.message, {
            id: toastId,
          });
        }

        if (data) {
          toast.success("Signed in successfully", {
            id: toastId,
          });
          router.push(redirectPath);
        }
      } catch (error) {
        toast.error("An unexpected error occurred", {
          id: toastId,
        });
      }
    },
  });

  const continueWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: env.NEXT_PUBLIC_FRONTEND_API + redirectPath,
    });
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your information below to sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="john@example.com"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
        <Button form="login-form" type="submit" className="w-full">
          Sign In
        </Button>
        <p>or</p>
        <Button
          onClick={() => continueWithGoogle()}
          variant="outline"
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>
        <FieldDescription className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
