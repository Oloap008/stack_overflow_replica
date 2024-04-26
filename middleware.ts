// import { authMiddleware } from "@clerk/nextjs";

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/ask-question"]);

export default clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  },
  { debug: true }
);

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
