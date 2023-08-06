/* eslint-disable react/prop-types */

import Features from "./Features";

const ImageCard = ({ image }) => {
  const tags = image.tags.split(", ");


  return (
    <div className="max-w-sm rounded shadow-lg">
      <img src={image.webformatURL} alt="" className="w-full h-60" />
      <div className="px-6 py-4 relative">
        <div className="font-bold text-blue-500 text-xl">
          Photo by {image.user}
        </div>
        <Features/>
        <ul>
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
      <div className="px-6 py-4">
        {tags.map((tag, ind) => {
          return (
            <span
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
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
