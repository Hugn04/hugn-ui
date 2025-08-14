import Link from "next/link";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import InfoUser from "./InfoUser";
import { ModeToggle } from "../ModeToggle";
export default function Header() {
  return (
    <header className="bg-[var(--background)] border-b-[var(--hover)] border-b-[2] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-[var(--foreground)] group-hover:text-blue-600 transition-colors duration-200">
                HUGN
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation />

          {/* User Actions */}
          <div className="flex gap-4">
            <InfoUser></InfoUser>
            <ModeToggle type="icon"></ModeToggle>
          </div>

          {/* Mobile menu button */}
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
