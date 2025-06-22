import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Aditya Gambhir
            </span>
          </Link>
          <nav
            className="flex items-center space-x-6 text-sm font-medium"
            aria-label="Main navigation"
          >
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#about"
            >
              About
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#experience"
            >
              Experience
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#projects"
            >
              Projects
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#contact"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
