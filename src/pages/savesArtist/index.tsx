import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';

import { Button } from '../../components/Button/Button';
import { ListItem } from '../../components/ListItem/ListItem';
import { useSavedArtists } from '../../context/ArtistSave';
import styles from "../../styles/SavesArtist.module.css";

export default function SavedList() {
  const { savedArtists } = useSavedArtists()
  return (
    <div className={styles.containerSaves}>
      <div className={styles.ButtonBack} >
        <Link href="/">
          <Button>
            <ChevronLeftIcon className={styles.leftIcon} aria-hidden="true" />
            Back to Search
          </Button>
        </Link>
        <div />
      </div>
      <div className={styles.artistList}>
        <h1 className={styles.myList}>My Fav artist</h1>
        {savedArtists.length > 0 ? (
          <ListItem artists={savedArtists} />
        ) : (
          <p className={styles.noArtistListed}>
            No Artists in List
          </p>
        )}
      </div>
    </div>
  )
}
