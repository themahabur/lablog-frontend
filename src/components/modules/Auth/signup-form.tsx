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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log("Form submitted with values:", value);
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input 
                    id="name"
                    name="name" 
                    type="text"
                    value={field.state.value}
                    onChange={(e)=> field.handleChange(e.target.value)}
                    placeholder="John Doe"
                     />
                  </Field>
                );
              }}
            />
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input 
                    id="email"
                    name="email" 
                    type="email"
                    value={field.state.value}
                    onChange={(e)=> field.handleChange(e.target.value)}
                    placeholder="john@example.com"
                     />
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input 
                    id="password"
                    name="password" 
                    type="password"
                    value={field.state.value}
                    onChange={(e)=> field.handleChange(e.target.value)}
                    placeholder="••••••••"
                     />
                  </Field>
                );
              }}
            />
            <form.Field
              name="confirmPassword"
              children={(field) => {
                return (
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <Input 
                    id="confirmPassword"
                    name="confirmPassword" 
                    type="password"
                    value={field.state.value}
                    onChange={(e)=> field.handleChange(e.target.value)}
                    placeholder="••••••••"
                     />
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-4">
        <Button form="register-form" type="submit">
          Create Account
        </Button>
      </CardFooter>
    </Card>
  );
}
