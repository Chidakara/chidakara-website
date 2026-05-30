"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="fixed left-1/2 top-4 z-50 w-[92%] sm:w-[95%] max-w-7xl -translate-x-1/2">

      <div className="rounded-full border border-white/10 bg-black/50 backdrop-blur-2xl">

        <div className="flex items-center justify-between px-4 py-3 sm:px-6">

          {/* LOGO */}

          <Link
            href="/"
            className="text-lg font-semibold tracking-[0.2em] text-white"
          >
            CHIDAKARA
          </Link>

          {/* DESKTOP LINKS */}

          <div className="hidden items-center gap-6 text-sm text-gray-300 md:flex">

            <Link
              href="/solutions"
              className="transition-colors duration-300 hover:text-white"
            >
              Solutions
            </Link>

            <Link
              href="/showcase"
              className="transition-colors duration-300 hover:text-white"
            >
              Showcase
            </Link>

            <Link
              href="/case-studies"
              className="transition-colors duration-300 hover:text-white"
            >
              Case Studies
            </Link>

            <Link
              href="/dashboard-demo"
              className="transition-colors duration-300 hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/contact"
              className="transition-colors duration-300 hover:text-white"
            >
              Contact
            </Link>

          </div>

          {/* CTA BUTTON */}

          <div className="hidden md:block">

            <Link
  href="/contact"
  className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-500"
>
  Let’s Build
</Link>

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] md:hidden"
          >

            <div className="space-y-1">

              <div className="h-[2px] w-5 rounded-full bg-white" />
              <div className="h-[2px] w-5 rounded-full bg-white" />

            </div>

          </button>

        </div>

        {/* MOBILE MENU */}

        <div
          className={`overflow-hidden transition-all duration-500 md:hidden ${
            menuOpen
              ? "max-h-[500px] border-t border-white/10 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >

          <div className="flex flex-col gap-5 text-base px-6 py-8 text-gray-300">

            <Link href="/solutions">
              Solutions
            </Link>

            <Link href="/showcase">
              Showcase
            </Link>

            <Link href="/case-studies">
              Case Studies
            </Link>

            <Link href="/dashboard-demo">
              Dashboard
            </Link>

            <Link href="/contact">
              Contact
            </Link>

           <Link
  href="/contact"
  className="mt-2 rounded-full bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white"
>
  Let’s Build
</Link>
          </div>

        </div>

      </div>

    </nav>

  );
}