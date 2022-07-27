import { useState, useEffect } from "react";
import Results from "./Results";
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

  console.log(page)

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
        onSubmit={e => {
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
        <button>Submit</button>
      </form>
      <Results pets={pets}/>
      <Pagination props={petParams} page={page} handleChange={setPage} pageSize={10} />
    </div>
  );
};

export default SearchParams;
