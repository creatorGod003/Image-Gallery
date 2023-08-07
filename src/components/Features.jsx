/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Features = ({ image }) => {
  const [downloadCount, setDownloadCount] = useState(1);
  function handleDownloadImage() {
    setDownloadStatusVisible(true);
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
  const [downloadStatusVisible, setDownloadStatusVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if(copiedStatusVisible)
        setCopiedStatusVisible(false);
      if(downloadStatusVisible)
        setDownloadStatusVisible(false);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [copiedStatusVisible, downloadStatusVisible]);

  



  return (
    <>
      {copiedStatusVisible ? (
        <div className="absolute top-10 left-[50%] bg-green-600 dark:bg-slate-700 dark:text-gray-100 text-white p-[4px] rounded flex justify-center items-center">
          <span className="text-center">URL Copied Successfully!</span>
        </div>
      ) : null}
      {downloadStatusVisible ? (
        <div className="absolute top-10 left-[50%] bg-green-600 dark:bg-slate-700 dark:text-gray-100 text-white p-[4px] rounded flex justify-center items-center">
          <span className="text-center">Image started downloading...</span>
        </div>
      ) : null}
      <div className="absolute top-3 right-3 space-x-2">
        <button onClick={handleDownloadImage} className="dark:text-blue-400">
          <ion-icon name="arrow-down-circle" size="large"></ion-icon>
        </button>
        <button
          onClick={() => {
            handleClipboardCopy(image.webformatURL);
          }}
          className="dark:text-blue-400"
        >
          <ion-icon name="copy" size="large"></ion-icon>
        </button>
      </div>
    </>
  );
};

export default Features;
