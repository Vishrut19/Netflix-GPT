/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 md:px-12 py-6">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">{title}</h2>
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} movie={movie} />
        ))}
      </div>
    </div>
  );
};
export default MovieList;
