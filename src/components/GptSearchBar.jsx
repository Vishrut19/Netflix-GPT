import React from "react";

const GptSearchBar = () => {
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input
          type="text"
          name=""
          id=""
          className="p-4 m-4 col-span-9"
          placeholder="What Would You Like to Watch Today ?"
        />
        <button className="col-span-3 m-4 px-4 py-2 bg-red-700 text-white rounded-lg">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
