import { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { songs as songsData, bands } from "./data/songs";
import { IBand, ISelectValue, ISong } from "./interfaces";
import "./app.css";

const App = (): JSX.Element => {
  const [query, setQuery] = useState("");
  const [bandIds, setBandsIds] = useState<number[]>([]);
  const [songs, setSongs] = useState<ISong[]>([]);

  const filterByName = (songs: ISong[], text: string) =>
    songs.filter((item) => item.title.toLowerCase().includes(text));

  const filterByBands = (songs: ISong[], bands: number[]) => songs.filter((item) => bands.includes(item.band));

  const sortFunc = (b1: IBand, b2: IBand) => (b1.title > b2.title ? 1 : -1);
  const sortFunc2 = (b1: ISong, b2: ISong) => (b1.title > b2.title ? 1 : -1);

  useEffect(() => {
    const byName = filterByName(songsData, query);
    const byBandIfNeed = bandIds.length === 0 ? byName : filterByBands(byName, bandIds);
    setSongs(byBandIfNeed.sort(sortFunc2));
  }, [query, bandIds]);

  const bandOptions = bands.sort(sortFunc).map((el) => ({ value: el.id, label: el.title }));

  const bandHandler = (data: MultiValue<ISelectValue>) => {
    setBandsIds(data.map((el) => el.value));
  };

  return (
    <div className="app">
      <h1>Синяя папка))</h1>
      <div>
        Выбрано: {songs.length} из {songsData.length}
      </div>
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
            {`${song.title} (${bands.find((el: IBand) => el.id === song.band)?.title})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
