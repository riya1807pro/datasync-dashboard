import { ClerkProvider } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import '@/styles/globals.css'
import { AppProps } from 'next/app';
import { Provider } from "react-redux";
import { store } from '@/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Provider store={store}>
          <ErrorBoundary>
         <ThemeProvider attribute="class" defaultTheme="light">
          <Component {...pageProps}/>
        </ThemeProvider>
        </ErrorBoundary>
      </Provider>
    </ClerkProvider>
  );
}