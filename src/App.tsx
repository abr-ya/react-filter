import { useState, useEffect } from "react";
import { Songs, Bands } from "./data/songs";
import { ISong, IBand } from "./interfaces";
import "./app.css";

function App(): JSX.Element {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    setSongs(Songs.filter((item) => item.title.toLowerCase().includes(query)));
  }, [query]);

  return (
    <div className="app">
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <ul className="list">
        {songs.map((song: ISong) => (
          <li className="listItem" key={song.id}>
            {`${song.title} (${Bands[song.band].title})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
