import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-blue-950/10 px-6 py-20">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

        <div>

          <h3 className="text-xl font-semibold tracking-[0.2em] text-white">
            CHIDAKARA
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Intelligent AI infrastructure systems for modern businesses.
          </p>

        </div>

        <div className="flex gap-6 text-sm text-gray-400">

          <Link
  href="/about"
  className="transition-colors duration-300 hover:text-white"
>
  About
</Link>

<Link
  href="/privacy"
  className="transition-colors duration-300 hover:text-white"
>
  Privacy
</Link>

<Link
  href="/terms"
  className="transition-colors duration-300 hover:text-white"
>
  Terms
</Link>

<Link
  href="/contact"
  className="transition-colors duration-300 hover:text-white"
>
  Contact
</Link>

        </div>

      </div>

    </footer>
  );
}