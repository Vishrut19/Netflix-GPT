import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";

const GptMovieSuggestions = () => {
  // From store we are extracting Movie Result and Movie Names
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-50 rounded-xl">
      <div>
        {/* This will give me list of movies according to their index numbers. */}
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
        <MovieList title={movieNames[0]} movies={movieResults[0]} />
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
