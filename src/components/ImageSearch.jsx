/* eslint-disable react/prop-types */

import { useRef, useState } from "react";

const ImageSearch = ({ onTermChange, inputRef, setCurrentPage }) => {
  const [text, setText] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onTermChange(text);
    setCurrentPage(1);
  }
  const searchRef = useRef(null);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center py-6"
    >
      <input
        ref={inputRef}
        type="text"
        className="outline-none px-2 py-2 rounded-r-none rounded-l-md text-xl"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            searchRef.current.click();
            setCurrentPage(1);
          }
        }}
      />
      <button
        ref={searchRef}
        id="search"
        className="p-2 bg-teal-400 text-xl rounded-l-none rounded-r-md text-blue-800"
        type="submit"
      >
        <ion-icon name="search"></ion-icon>
      </button>
    </form>
  );
};

export default ImageSearch;
