import { useState, useEffect } from "react";
import { Users } from "./data/users";
import { IUser } from "./interfaces";
import "./app.css";

function App(): JSX.Element {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    setUsers(
      Users.filter((item) => item.first_name.toLowerCase().includes(query)),
    );
  }, [query]);

  return (
    <div className="app">
      <input
        className="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <ul className="list">
        {users.map((user: IUser) => (
          <li className="listItem" key={user.id}>
            {user.first_name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
