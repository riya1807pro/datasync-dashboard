// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/","/SignUp","/SignIn"],
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
