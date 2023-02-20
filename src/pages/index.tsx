import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Genre, getGenres, getArtistByGenre, Artist } from "../api";
import { DEFAULT_ID } from "../dependencies/default";
import { Header } from "../components/Header/Header";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { ListItem } from "../components/ListItem/ListItem";
import { Button } from "../components/Button/Button";
import { useSavedArtists } from "../context/ArtistSave";
import {Footer} from '../components/Footer/Footer'
import styles from "../styles/Pages.module.css";

export default function Home() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({
    id: DEFAULT_ID,
    name: "",
    parent_id: DEFAULT_ID,
  });
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<Artist[]>();
  const { savedArtists } = useSavedArtists();

  useEffect(() => {
    getGenres(query).then((response: any) => setGenres(response.data));
  }, [query]);

  useEffect(() => {
    if (selectedGenre.id !== DEFAULT_ID) {
      getArtistByGenre(selectedGenre.id).then((response: any) =>
        setArtists(response.data)
      );
    }
  }, [selectedGenre]);

  return (
    <>
      <Head>
        <title>MAX.LIVE</title>
        <meta name="description" content="application to search your artist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <h2 className={styles.headerViewList}>
        Enter the genre and find an artist
      </h2>

      <div className={styles.containerViewList}>
        <SearchBar
          items={genres}
          selected={selectedGenre}
          setSelected={setSelectedGenre}
          setQuery={setQuery}
        />
        {artists ? (
          <ListItem artists={artists} genre={selectedGenre.name} />
        ) : null}
        <div className={styles.buttonLink}>
        <Link href="/savesArtist">
          <Button>
            <div className={styles.buttonQueo}>
              View My List
              {savedArtists.length > 0 ? ` (${savedArtists.length})` : null}
            </div>
          </Button>
          </Link>
          </div>
      </div>
      <Footer/>
    </>
  );
}
