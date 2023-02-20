import Image from "next/image";
import Link from "next/link";

import { Artist } from "../../../api";
import { useSavedArtists } from "../../../context/ArtistSave";
import { Button } from "../../Button/Button";
import styles from "../../../styles/List.module.css";

type ListItemProps = {
  artist: Artist;
  genre: string;
};

export const List = ({ artist, genre }: ListItemProps) => {
  const { savedArtists, addArtist, removeArtist } = useSavedArtists();
  const isArtistSaved = savedArtists.some(
    (savedArtists) => savedArtists.id === artist.id
  );
  const handleSaveArtist = () => addArtist(artist);
  const handleRemoveArtist = () => removeArtist(artist.id);

  return (
    <div className={styles.listContainer} key={artist.id}>
      <div className={styles.containerArtist}>
        <div className={styles.constainerImageArtist}>
          <Image
            className={styles.imageArtist}
            src={artist.image}
            alt={`${artist.name} image`}
            width={100}
            height={100}
          />
        </div>

        <div className={styles.artistCenter}>
          <div className={styles.artisItem}>
            <Link href={`/artists/${artist.id}`}>
              <h4 className={styles.artisName}>
                {artist.name}
              </h4>
            </Link>
            <p className={styles.artistGenre}>{genre}</p>
          </div>
        </div>

        <div className={styles.buttonAdd}>
          <Button
            onClick={isArtistSaved ? handleRemoveArtist : handleSaveArtist}>
            {isArtistSaved ? "Remove" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};
