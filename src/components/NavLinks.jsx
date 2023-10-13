"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const navLinks = [
  {
    name: "Work",
    href: "/profile/work",
  },
  {
    name: "Boosted Shots",
    href: "/profile/boosts",
  },
  {
    name: "Collections",
    href: "/profile/collections",
  },
  {
    name: "Liked Shots",
    href: "/profile/likes",
  },
  {
    name: "About",
    href: "/profile/about",
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const navLinksRef = useRef(null);

  const scrollRight = () => {
    const container = navLinksRef.current;
    if (container) {
      container.scrollLeft += 60;
    }
  };

  const scrollLeft = () => {
    const container = navLinksRef.current;
    if (container) {
      container.scrollLeft -= 60;
    }
  };

  return (
    <div className="w-full xmd:px-12 flex px-4 sm:px-6 mt-2 h-16 relative">
      <div
        onClick={scrollLeft}
        className="py-2 hover:text-black/70 cursor-pointer absolute left-2 sm:hidden text-black h-fit px-2 bg-gradient-to-r from-white via-white to-transparent"
      >
        <ChevronLeft />
      </div>
      <div
        ref={navLinksRef}
        className="w-full nav-link px-6 flex text-sm overflow-hidden"
        style={{
            scrollBehavior: 'smooth',
            // overflowX: 'auto',
            whiteSpace: 'nowrap'
        }}
      >
        {navLinks.map((navLink) => (
          <Link
            key={navLink.name}
            className={`hover:text-black/70 shrink-0 px-4 h-fit rounded-full py-2 ${
              pathname === navLink.href ||
              (pathname === "/profile" && navLink.href === "/profile/work")
                ? "bg-gray-100"
                : "bg-transparent"
            }`}
            title={navLink.name}
            href={navLink.href}
          >
            {navLink.name}
          </Link>
        ))}
      </div>
      <div
        onClick={scrollRight}
        className="py-2 hover:text-black/70 cursor-pointer absolute right-2 sm:hidden text-black h-fit px-2 bg-gradient-to-l from-white via-white to-transparent"
      >
        <ChevronRight />
      </div>
    </div>
  );
}
