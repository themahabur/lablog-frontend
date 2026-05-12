import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL =env.AUTH_URL

const getSession = async () => {
  try {
    const cookieStore = await cookies();

    console.log(cookieStore.toString());

    const res = await fetch(`${AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const session = await res.json();

    if (session === null) {
      return { data: null, error: { message: "Session is missing." } };
    }

    return { data: session, error: null };
  } catch (err) {
    console.error(err);
    return { data: null, error: { message: "Something Went Wrong" } };
  }
};

export const userService = {
  getSession,
};
