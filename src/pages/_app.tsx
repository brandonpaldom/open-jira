import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { EntriesProvider } from '@/context/entries'
import { UIProvider } from '@/context/ui'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme } from '@/themes'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}
