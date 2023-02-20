import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

import { Button } from "../../../components/Button/Button";
import { Artist, getArtistDetails, getSimilarArtists } from "../../../api";
import { ListItem } from "../../../components/ListItem/ListItem";
import { useSavedArtists } from "../../../context/ArtistSave";
import styles from "../../../styles/Artist.module.css";

type ArtistDetailsProps = {
  details: Artist[];
  similarArtists: Artist[];
};

export default function ArtistDetails({
  details,
  similarArtists,
}: ArtistDetailsProps) {
  const { savedArtists, addArtist, removeArtist } = useSavedArtists();
  const [artist] = details;
  const primaryGenre = artist.genres.find((genre) => genre.is_primary);
  const filteredGenres = artist.genres.filter(
    (genre) => genre.name !== primaryGenre?.name
  );
  const filteredSimilarArtists = similarArtists.filter(
    (similarArtist) => similarArtist.id !== artist.id
  );
  const isArtistSaved = savedArtists.some(
    (savedArtists) => savedArtists.id === artist.id
  );
  const handleSaveArtist = () => addArtist(artist);
  const handleRemoveArtist = () => removeArtist(artist.id);

  return (
    <div>
      <h1>{`${artist.name} Details`}</h1>
      <div className={styles.containerInfo}>
        <div className={styles.ButtonBack}>
        <Link href="/">
          <Button>
            <ChevronLeftIcon className={styles.leftIcon} aria-hidden="true" />
            Back to Search
          </Button>
          </Link>
        </div>
        <div className={styles.artistList}>
        <Link href="/savesArtist">
          <Button>
            <div className={styles.listedArtist}>
              View My List
              {savedArtists.length ? ` (${savedArtists.length})` : null}
            </div>
          </Button>
          </Link>
          </div>
      </div>

      <div className={styles.containerArtistDetail}>
        <main className={styles.containerInfoArt}>
          <div className={styles.positionContainer}>
            <div className={styles.containerImg}>
              <Image
                src={artist.image}
                alt={`${artist.name} profile picture`}
                width={100}
                height={100}
                className={styles.imageArtist}
              />
            </div>
            <div>
              <h4 className={styles.nameArtist}>
                {artist.name}
              </h4>
              <p className={styles.genreArtist}>
                Primary Genre: {primaryGenre?.name ?? "not apply"}
              </p>
              <p className={styles.popularityArtist}>
                Popularity: {artist.popularity}
              </p>
            </div>
            <div />
          </div>
          <div className={styles.otherInformation}>
            <div>
              <h3 className={styles.genresAdition}>
                Additional Genres:
              </h3>
              <p className={styles.filterGenres}>
                {filteredGenres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
            <div />
            <Button
              onClick={isArtistSaved ? handleRemoveArtist : handleSaveArtist}>
              {isArtistSaved ? "Remove" : "Add"}
            </Button>
          </div>
        </main>

        {filteredSimilarArtists.length > 0 ? (
          <>
            <h2 className={styles.reletedArtist}>Related Artists</h2>
            <ListItem
              artists={filteredSimilarArtists}
              genre={primaryGenre?.name ?? "NA"}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  details: Artist[];
}> = async (context) => {
  const { id } = context.query;

  // @ts-ignore
  const { data: details } = await getArtistDetails(Number(id));
  // @ts-ignore
  const { data: similarArtists } = await getSimilarArtists(Number(id));

  return { props: { details, similarArtists } };
};
