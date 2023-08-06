import "./App.css";
import { useState, useEffect, useRef } from "react";
import ImageCard from "./components/ImageCard.jsx";
import ImageSearch from "./components/ImageSearch";
import Pagination from "./components/Pagination";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("image");
  const apikey = import.meta.env.VITE_PIXABAY_API_KEY;
  const ref = useRef(null);
  const [currentPage, setCurrentPage] = useState(1)
  
  function moveForward(){
    setCurrentPage(currentPage+1);
    if(currentPage==3){
      return;
    }
    setCurrentPage(currentPage+1);
  }
  function moveBackward(){
    if(currentPage==1){
      return;
    }
    setCurrentPage(currentPage-1);
  }

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${apikey}&q=${term}&image_type=photo&pretty=true&per_page=12&page=${currentPage}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(() => {
        // console.log(err);
      });
    ref.current.focus();
  }, [apikey, term,currentPage]);

  return (
    <div className="container flex-col items-center ">
      <header className="bg-blue-200 ">
        <h1 className="text-center text-3xl py-4 font-serif">
          Image Galary
        </h1>
        <ImageSearch onTermChange={setTerm} inputRef={ref} />
      </header>
      {isLoading ? (
        <h1 className="text-3xl text-center">Loading...</h1>
      ) : images.length != 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-4 place-items-top">
          {images.map((image) => {
            return <ImageCard key={image.id} image={image} />;
          })}
        </div>
      ) : (
        <h1 className="text-2xl text-center font-bold text-slate-600">
          Oops! No image found with keyword{" "}
          <span className="underline">{term}</span>
        </h1>
      )}

      <Pagination currentPage={currentPage} moveForward={moveForward} moveBackward={moveBackward}/>
    
    </div>
    
  );
}

export default App;
