/* eslint-disable react/prop-types */

import Features from "./Features";

const ImageCard = ({ image }) => {
  const tags = image.tags.split(", ");

  return (
    <div className="max-w-sm rounded shadow-lg dark:bg-slate-800 dark:shadow-md dark:shadow-gray-500 h-full">
      <img
        src={image.webformatURL}
        alt=""
        className="w-full h-60 rounded hover:scale-[110%] duration-300 z-100"
      />

      <div className="px-6 py-4 relative">
        <div className="font-bold text-blue-500 text-xl">
          Photo by {image.user}
        </div>
        <Features image={image} />
        <ul className="dark:text-gray-100">
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads: </strong>image.downloads
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-6 py-4 flex justify-items-center flex-wrap items-center">
        {tags.map((tag, ind) => {
          return (
            <span
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2"
              key={image.id + "$" + ind}
            >
              {"#" + tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ImageCard;
