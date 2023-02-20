import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { SavedArtistsProvider } from '../context/ArtistSave'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SavedArtistsProvider>
      <Component {...pageProps} />
    </SavedArtistsProvider>
  )
}
