import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-3">

          <div>
            <h2 className="text-2xl font-semibold tracking-[0.2em]">
              CHIDAKARA
            </h2>

            <p className="mt-6 max-w-sm text-gray-400">
              Enterprise AI infrastructure,
              intelligent automation systems,
              operational intelligence,
              and analytics platforms.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">
              Navigation
            </h3>

            <div className="mt-6 flex flex-col gap-3 text-gray-400">

              <Link href="/about">About</Link>
              <Link href="/solutions">Solutions</Link>
              <Link href="/technology">Technology</Link>
              <Link href="/case-studies">Case Studies</Link>
              <Link href="/contact">Contact</Link>

            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">
              Connect
            </h3>

            <div className="mt-6 flex flex-col gap-3 text-gray-400">

              <a href="mailto:hello@chidakara.com">
                hello@chidakara.com
              </a>

              <a href="#">
                LinkedIn
              </a>

              <a href="#">
                GitHub
              </a>

            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}