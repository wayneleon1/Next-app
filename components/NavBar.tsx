"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { ModeToggle } from "@/components/ui/toggle-mode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

interface UserProps {
  user: { name: string; email: string; image: string } | null;
}
export const NavBar: React.FC<UserProps> = ({ user }) => {
  return (
    <div>
      <nav className="py-4 border-b border-b-gray-200 dark:border-b-slate-800">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">Dev Tasks</h1>
          <div className="flex gap-4">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div>
                    <Avatar>
                      <AvatarImage src={user.image} alt="@shadcn" />
                      <AvatarFallback>OK</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <p className="text-sm">{user.email}</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/api/auth/signout"> Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
