import Link from "next/link";

function NavBar() {
  return (
    <nav className="hidden md:flex gap-6">
      <Link
        className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300 text-black font-medium"
        href="/"
      >
        Trang chủ
      </Link>
      <Link href="/template" className="hover:text-blue-700">
        Mẫu
      </Link>
      <a href="#" className="hover:text-blue-700">
        Game
      </a>
      <a href="#" className="hover:text-blue-700">
        Blog
      </a>
    </nav>
  );
}

export default NavBar;
