"use client";

import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {

  return (
    <nav className="flex flex-row w-full items-center justify-between py-3">
      <div className="font-semibold text-lg">
        <Link href="/" className="hover:underline underline-offset-4">
          Omawang.
        </Link>
      </div>

      <ul className="flex flex-row items-center gap-4 text-sm">
        <li>
          <Link href="/blog" className="hover:underline underline-offset-4">
            Blog
          </Link>
        </li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
};
