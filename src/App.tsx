import { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { songs as songsData, bands } from "./data/songs";
import { ISelectValue, ISong } from "./interfaces";
import "./app.css";

const App = (): JSX.Element => {
  const [query, setQuery] = useState("");
  const [bandIds, setBandsIds] = useState<number[]>([]);
  const [songs, setSongs] = useState<ISong[]>([]);

  const filterByName = (songs: ISong[], text: string) =>
    songs.filter((item) => item.title.toLowerCase().includes(text));

  const filterByBands = (songs: ISong[], bands: number[]) =>
    songs.filter((item) => bands.includes(item.band));

  useEffect(() => {
    console.log(query, bandIds);
    const byName = filterByName(songsData, query);
    setSongs(bandIds.length === 0 ? byName : filterByBands(byName, bandIds));
  }, [query, bandIds]);

  const bandOptions = bands.map((el) => ({ value: el.id, label: el.title }));

  const bandHandler = (data: MultiValue<ISelectValue>) => {
    setBandsIds(data.map((el) => el.value));
  };

  return (
    <div className="app">
      <h1>Синяя папка))</h1>
      <div className="filters">
        <Select
          options={bandOptions}
          onChange={bandHandler}
          isMulti
          name="bands"
          className="filter-band"
          placeholder="Select band"
        />
        <div className="right">
          <input
            className="search"
            placeholder="Search by name"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      <ul className="list">
        {songs.map((song: ISong) => (
          <li className="listItem" key={song.id}>
            {`${song.title} (${bands[song.band].title})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
