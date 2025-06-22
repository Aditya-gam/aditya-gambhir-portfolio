import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 mobile-hidden">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block">
              Aditya Gambhir
            </span>
          </Link>
          <nav className="nav-main" aria-label="Main navigation">
            <a className="nav-link" href="#about">
              About
            </a>
            <a className="nav-link" href="#experience">
              Experience
            </a>
            <a className="nav-link" href="#projects">
              Projects
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
