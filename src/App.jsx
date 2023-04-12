import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import pokeDatos from "./Pokedatos";
import pokeball from "./assets/pokebola.jpg";
import arrow from "./assets/Arrow.svg";

function App() {
  const [pokemonList, setPokemonList] = useState(pokeDatos);
  const [orderType, setOrderType] = useState("id");
  const [searchValue, setSearchValue] = useState("");

  const ordenar = () => {
    setOrderType(orderType === "id" ? "name" : "id");
    setPokemonList(
      pokemonList.sort((a, b) => {
        if (orderType === "id") {
          return a.id - b.id;
        } else {
          return a.name.localeCompare(b.name);
        }
      })
    );
  };

  const search = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="App">
      <header className="header">
        <img src={pokeball} alt="Pokeball" />
        <h1>PokeDex</h1>
      </header>
      <div className="input">
        <div className="input-wrapper">
          <input
            className="buscador"
            type="search"
            placeholder="Buscar"
            value={searchValue}
            onChange={search}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="input-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <button className="button" onClick={ordenar}>
          {`${orderType === "id" ? "A " : "# "}`}
          <img src={arrow} alt="Flecha" />
        </button>
      </div>
      <div className="list">
        {filteredPokemonList.map((pokemon) => (
          <div className="container" key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <div className="pokemon">
                <h4>{pokemon.id}</h4>
                <img src={pokemon.image} />
                <h3 className="name">{pokemon.name}</h3>
                <div className="bg"></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
