import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";

const Browse = () => {
  //* Custom Hook to make TMDB API call and also, dispatch an action to update the store.
  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
      {/*
        Main Container
          - Video Background
          - Video Title
        Secondary Container
          - Movie List * n
            -  Cards * n 
       */}
    </div>
  );
};

export default Browse;
