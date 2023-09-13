import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const VideoBackground = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  //* Fetch Movie Trailer according to Movie ID and also Store the Trailer Video Data.
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/615656/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json);

    const filterData = json.results.filter((video) => video.type === "Trailer");
    //* If the Trailer doesn't exist then according to this condition it will take the first video from the list of videos.
    const trailer = filterData.length ? filterData[0] : json.results[0];
    console.log(trailer);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);

  return (
    <div>
      <iframe
        src={"https://www.youtube.com/embed/" + trailerVideo?.key}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
