"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import LeftSideBarLink from "./LeftSideBarLink";

function LeftSideBar() {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r p-6 pb-5 pt-32 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            return (
              <SignedIn key={item.route}>
                <LeftSideBarLink
                  route={`${item.route}/${userId}`}
                  isActive={isActive}
                  imgURL={item.imgURL}
                  label={item.label}
                />
              </SignedIn>
            );
            // if (userId) {
            //   console.log(userId);
            //   item.route = `${item.route}/${userId}`;
            // } else {
            //   return null;
            // }
          }

          return (
            <LeftSideBarLink
              key={item.route}
              route={item.route}
              isActive={isActive}
              imgURL={item.imgURL}
              label={item.label}
            />
            // <Link
            //   href={item.route}
            //   key={item.route}
            //   className={`${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"} flex items-center justify-start gap-4 bg-transparent p-4`}
            // >
            //   <Image
            //     src={item.imgURL}
            //     width={20}
            //     height={20}
            //     alt="logo"
            //     className={`${isActive ? "" : "invert-colors"}`}
            //   />
            //   <p
            //     className={`${isActive ? "base-bold" : "base-medium"} max-lg:hidden `}
            //   >
            //     {item.label}
            //   </p>
            // </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <SignedOut>
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <span className="primary-text-gradient max-lg:hidden">
                Log in
              </span>
              <Image
                src="assets/icons/account.svg"
                width={20}
                height={20}
                alt="login"
                className="invert-colors lg:hidden"
              />
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <span className="max-lg:hidden">Sign up</span>
              <Image
                src="assets/icons/sign-up.svg"
                width={20}
                height={20}
                alt="sign-up"
                className="invert-colors lg:hidden"
              />
            </Button>
          </Link>
        </SignedOut>
      </div>
    </section>
  );
}

export default LeftSideBar;
