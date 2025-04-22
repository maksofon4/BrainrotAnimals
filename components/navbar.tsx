"use client";
import { Navbar, NavbarContent, NavbarBrand, NavbarItem } from "@heroui/navbar";
import { usePathname } from "next/navigation";
import { Link } from "@heroui/link";
import { useEffect, useState } from "react";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function HeroUINavbar() {
  const [activeLink, setActiveLink] = useState<string>("/");
  const pathname = usePathname();

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">MEMES</p>
      </NavbarBrand>
      <NavbarContent className=" sm:flex gap-4" justify="center">
        <NavbarItem isActive={activeLink === "/"}>
          <Link
            href="/"
            {...(activeLink === "/"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
          >
            Table
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeLink === "/list"}>
          <Link
            href="/list"
            {...(activeLink === "/list"
              ? { "aria-current": "page" }
              : { color: "foreground" })}
          >
            List
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
