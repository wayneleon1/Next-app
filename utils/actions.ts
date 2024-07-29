"use server";
import { signIn, signOut } from "@/auth";

export async function HandleSignIn() {
  await signIn("github", { redirectTo: "/" });
}

export async function HandleSignOut() {
  await signOut();
}
