'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function ThemeProvider({ children }:any) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={true}>
      {children}
    </NextThemesProvider>
  )
}