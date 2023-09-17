import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    // This will show GPT search when you click on GPT Search Button.
    showGptSearch: false,
  },
  reducers: {
    // This is like a toggle functionality to show or hide the GPT Search View
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
  },
});

export const { toggleGptSearchView } = gptSlice.actions;

export default gptSlice.reducer;
