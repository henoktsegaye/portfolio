import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import Link from "./genial/Link";
import Navbar from "./genial/Navbar";
import GithubIcon from "icons/github.svg";
import TwitterIcon from "icons/twitter.svg";

import { ThemeSwitch } from "@/components/theme-switch";
import { User } from "@nextui-org/react";

export const NavbarComponent = () => {
  return (
    <Navbar.Navbar  isBordered  maxWidth="xl" >
      <Navbar.NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <Navbar.NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <User
              name="Henok Tsegaye"
              description="Software Engineer"
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/37017648?v=4",
              }}
            />
          </NextLink>
        </Navbar.NavbarBrand>
      </Navbar.NavbarContent>

      <Navbar.NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <div className="hidden lg:flex gap-4 justify-start ml-2"></div>
        <Navbar.NavbarItem className="hidden sm:flex gap-4">
          <Link isExternal href={siteConfig.links.twitter}>
            <TwitterIcon
              width="24px"
              height="24px"
              className="text-default-500"
            />
          </Link>

          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon
              width="24px"
              height="24px"
              className="text-default-500"
            />
          </Link>
          <ThemeSwitch />
        </Navbar.NavbarItem>
      </Navbar.NavbarContent>

      <Navbar.NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon
            width="24px"
            height="24px"
            className="text-default-500"
          />
        </Link>
        <Link isExternal href={siteConfig.links.twitter}>
          <TwitterIcon
            width="26px"
            height="26px"
            className="text-default-500"
          />
        </Link>
        <ThemeSwitch />
        
      </Navbar.NavbarContent>
 
    </Navbar.Navbar>
  );
};
