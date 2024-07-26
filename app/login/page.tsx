"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm p-6 shadow-lg rounded-lg bg-white">
        <CardHeader className="mb-4 text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Log in to TaskDev
          </CardTitle>
          <CardDescription className="text-gray-600">
            Continue with GitHub to login to our App
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Button
            variant="outline"
            className="mt-2 w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
          >
            <FaGithub className="text-xl" />
            <Link href="/api/auth/signin">Continue with GitHub</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
