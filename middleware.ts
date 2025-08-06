import { clerkMiddleware } from '@clerk/nextjs/server';

const options: any = {
  publicRoutes: ['/', '/SignIn(.*)', '/SignUp(.*)'],
};

export default clerkMiddleware(options);