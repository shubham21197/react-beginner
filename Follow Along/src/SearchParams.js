import { useState, useEffect, useContext } from "react";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Pagination from './Pagination';

const ANIMALS = ["bird", "cat", "dog", "rabbit", "mice"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(0);
  const [petParams, setPetParams] = useState({});
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, [page]); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const response = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${page}`
    );

    const json = await response.json();

    setPets(json.pets);
    setPetParams({
      start: json.startIndex,
      end: json.endIndex,
      maxResults: json.numberOfResults,
      hasNext: json.hasNext,
    });

    console.log(petParams)
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animalMap) => (
              <option key={animalMap} value={animalMap}>
                {animalMap}
              </option>
            ))}
          </select>
        </label>

        <label>
          Breed
          <select
            id="breed"
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
            onBlur={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {breeds.map((breedMap) => (
              <option key={breedMap} value={breedMap}>
                {breedMap}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="#f06d06">Fog Dog</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets}/>
      <Pagination props={petParams} page={page} handleChange={setPage} pageSize={10} />
    </div>
  );
};

export default SearchParams;
