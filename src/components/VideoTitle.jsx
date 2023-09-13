/* eslint-disable react/prop-types */
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen px-24 text-white aspect-video pt-[20%] bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="w-1/4 py-6 text-lg">{overview}</p>
      <div>
        <button className="p-4 px-12 text-xl text-black bg-white rounded-lg hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="p-4 px-12 mx-2 text-xl bg-gray-500 bg-opacity-50 rounded-lg hover:bg-opacity-20">
          &#9432; More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
