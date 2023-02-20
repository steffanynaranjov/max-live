import { Artist } from '../../api'
import { List } from './List/List'
import styles from  '../../styles/ListItem.module.css'

type ListProps = {
  artists: Artist[]
  genre?: string | null
}

export const ListItem = ({ artists, genre = null }: ListProps) => {
  return (
    <div className={styles.listItemDiv}>
      {artists.map((artist: Artist) => (
        <List
          key={artist.id}
          artist={artist}
          genre={genre ?? artist.genres[0].name}
        />
      ))}
    </div>
  )
}
