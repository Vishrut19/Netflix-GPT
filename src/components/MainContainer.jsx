import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  //* Early Return i.e. if the  movies is empty then return.
  if (movies === null) return;

  const mainMovie = movies[0];
  //   console.log(mainMovie);

  const { original_title, overview } = mainMovie;
  //   console.log(original_title, overview);

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground />
    </div>
  );
};

export default MainContainer;
