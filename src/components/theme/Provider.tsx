import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import React from 'react'
import { EdgeStoreProvider } from '../../lib/edgestore'

type Props = {
  children: React.ReactNode
}

export default function Provider({ children }: Props) {
  return (
    <div>
      <SessionProvider>
        <EdgeStoreProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </NextThemesProvider>
        </EdgeStoreProvider>
      </SessionProvider>
    </div>
  )
}