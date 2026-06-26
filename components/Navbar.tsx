"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navClass = (path: string) =>
    pathname === path
      ? "text-white"
      : "text-gray-400 transition-colors duration-300 hover:text-white";

  return (
    <nav className="fixed left-1/2 top-4 z-[99999] w-[92%] sm:w-[95%] max-w-7xl -translate-x-1/2">

      <div className="rounded-full border border-white/10 bg-black/80 backdrop-blur-xl md:blur-2xl">

        <div className="flex items-center justify-between px-4 py-2.5 sm:px-6">

          {/* LOGO */}

          <Link
            href="/"
            className="text-base font-semibold tracking-[0.18em] text-white sm:text-lg"
          >
            CHIDAKARA
          </Link>

          {/* DESKTOP NAVIGATION */}

          <div className="hidden items-center gap-6 text-sm text-gray-300 md:flex">

            <Link
 href="/about"
 className={navClass("/about")}
>
 About
</Link>

            <Link
              href="/solutions"
              className="transition-colors duration-300 hover:text-white"
            >
              Solutions
            </Link>

            <Link
              href="/ai-agents"
              className="transition-colors duration-300 hover:text-white"
            >
              AI Agents
            </Link>

            <Link
              href="/technology"
              className="transition-colors duration-300 hover:text-white"
            >
              Technology
            </Link>

            <Link
              href="/case-studies"
              className="transition-colors duration-300 hover:text-white"
            >
              Case Studies
            </Link>

            <Link
              href="/contact"
              className="transition-colors duration-300 hover:text-white"
            >
              Contact
            </Link>

          </div>

          {/* CTA */}

          <div className="hidden md:block">

            <Link
              href="/contact"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-500"
            >
              Let's Build
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] md:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
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

          <div className="flex flex-col gap-5 px-6 py-8 text-base text-gray-300">

            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/solutions"
              onClick={() => setMenuOpen(false)}
            >
              Solutions
            </Link>

            <Link
              href="/ai-agents"
              onClick={() => setMenuOpen(false)}
            >
              AI Agents
            </Link>

            <Link
              href="/technology"
              onClick={() => setMenuOpen(false)}
            >
              Technology
            </Link>

            <Link
              href="/case-studies"
              onClick={() => setMenuOpen(false)}
            >
              Case Studies
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="mt-2 rounded-full bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white"
              onClick={() => setMenuOpen(false)}
            >
              Let's Build
            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
}