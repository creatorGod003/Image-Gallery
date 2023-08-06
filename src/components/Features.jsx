/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Features = ({image}) => {


  const [downloadCount, setDownloadCount] = useState(1);
  function handleDownloadImage() {
    fetch(image.webformatURL)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `image${downloadCount}.jpg`;
        link.click();
        URL.revokeObjectURL(url);
        setDownloadCount(downloadCount + 1);
      });
  }

  function handleClipboardCopy(url) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopiedStatusVisible(true);
      })
      .catch(() => {
        // console.log("Error in copying image");
      });
  }

  const [copiedStatusVisible, setCopiedStatusVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedStatusVisible(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [copiedStatusVisible]);

  return (
    <>
      {copiedStatusVisible ? (
        <div className="absolute top-10 left-[50%] bg-green-600 text-white p-[4px] rounded flex justify-center items-center">
          <span className="text-center">Text Copied Successfully!</span>
        </div>
      ) : null}
      <div className="absolute top-3 right-3 space-x-2">
        <button className="" onClick={handleDownloadImage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
            />
          </svg>
        </button>
        <button
          className=""
          onClick={() => {
            handleClipboardCopy(image.webformatURL);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Features;
