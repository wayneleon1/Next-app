"use client";

import * as React from "react";
import { ModeToggle } from "@/components/ui/toggle-mode";
export const NavBar = () => {
  return (
    <div>
      <nav className="py-4 border-b border-b-gray-200 dark:border-b-slate-800">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">Dev Tasks</h1>
          <div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};
