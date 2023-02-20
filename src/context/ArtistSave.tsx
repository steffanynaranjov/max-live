import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react'
import { Artist } from '../api'

type SavedArtistsProviderProps = {
  children: ReactNode
}

const SavedArtistsStateContext = createContext<
  | {
      savedArtists: Artist[]
      addArtist: (newArtist: Artist) => void
      removeArtist: (id: number) => void
    }
  | undefined
>(undefined)

function SavedArtistsProvider({ children }: SavedArtistsProviderProps) {
  const [savedArtists, setSavedArtists] = useState<Artist[]>([])
  const initialRender = useRef(true)

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('savedArtists') as string)) {
      const artistsData = JSON.parse(
        localStorage.getItem('savedArtists') as string
      )
      setSavedArtists(artistsData)
    }
  }, [])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }
    window.localStorage.setItem('savedArtists', JSON.stringify(savedArtists))
  }, [savedArtists])

  function addArtist(newArtist: Artist) {
    setSavedArtists((prevArtists) => [...prevArtists, newArtist])
  }

  function removeArtist(id: number) {
    setSavedArtists((prevArtists) =>
      prevArtists.filter((artist) => artist.id !== id)
    )
  }

  const value = { savedArtists, addArtist, removeArtist }

  return (
    <SavedArtistsStateContext.Provider value={value}>
      {children}
    </SavedArtistsStateContext.Provider>
  )
}

function useSavedArtists() {
  const context = useContext(SavedArtistsStateContext)

  if (context === undefined) {
    throw new Error(
      'useSavedArtists must be used within a SavedArtistsProvider'
    )
  }
  return context
}

export { SavedArtistsProvider, useSavedArtists }
