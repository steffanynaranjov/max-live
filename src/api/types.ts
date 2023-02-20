export type Genre = {
  id: number
  parent_id: number
  name: string
}

interface ArtistGenres extends Omit<Genre, 'parent_id'> {
  is_primary: number
}

export type Artist = {
  genres: ArtistGenres[]
  id: number
  image: string
  name: string
  popularity: number
}