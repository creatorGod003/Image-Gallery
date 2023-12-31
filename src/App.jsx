import "./App.css";
import { useState, useEffect, useRef } from "react";
import ImageCard from "./components/ImageCard.jsx";
import ImageSearch from "./components/ImageSearch";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import Theme from "./components/Theme";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("image");
  const apikey = import.meta.env.VITE_PIXABAY_API_KEY;
  const ref = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPagination, setShowPagination] = useState(false);

  function moveForward() {
    setCurrentPage(currentPage + 1);
    if (currentPage == 3) {
      return;
    }
    setCurrentPage(currentPage + 1);
  }
  function moveBackward() {
    if (currentPage == 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${apikey}&q=${term}&image_type=photo&pretty=true&per_page=12&page=${currentPage}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
        if (data.hits.length == 0) setShowPagination(false);
        else setShowPagination(true);
      })
      .catch(() => {
        // console.log(err);
      });
    ref.current.focus();
  }, [apikey, term, currentPage, showPagination]);

  return (
    <div className="flex-col items-center dark:bg-slate-900 duration-300">
      <Theme />
      <header className="bg-blue-200 dark:bg-slate-900">
        <h1 className="text-center text-3xl py-4 font-serif dark:text-gray-100">
          Image Gallery
        </h1>
        <ImageSearch
          onTermChange={setTerm}
          setCurrentPage={setCurrentPage}
          inputRef={ref}
        />
      </header>
      {isLoading ? (
        <h1 className="text-3xl text-center  my-10">Loading...</h1>
      ) : images.length != 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-full place-items-center my-20">
          {images.map((image) => {
            return <ImageCard key={image.id} image={image} />;
          })}
        </div>
      ) : (
        <h1 className="text-2xl text-center font-bold text-slate-600 my-10">
          Oops! No image found with keyword{" "}
          <span className="underline">{term}</span>
        </h1>
      )}

      {showPagination ? (
        <Pagination
          currentPage={currentPage}
          moveBackward={moveBackward}
          moveForward={moveForward}
        />
      ) : null}
      <Footer />
    </div>
  );
}

export default App;
