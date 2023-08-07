/* eslint-disable react/prop-types */

const Pagination = ({ currentPage, moveForward, moveBackward }) => {
  return (
    <footer>
      <div className="flex my-10 justify-center space-x-2 dark:text-gray-100">
        {currentPage != 1 ? (
          <button
            className="p-2 bg-blue-400 dark:bg-blue-800 rounded-md font-bold"
            onClick={() => {
              moveBackward();
            }}
          >
            {"<"}
          </button>
        ) : null}
        <div className="text-3xl font-bold">{currentPage}</div>
        {currentPage != 100 ? (
          <button
            className="p-2 bg-blue-400 dark:bg-blue-800 rounded-md font-bold"
            onClick={() => {
              moveForward();
            }}
          >
            {">"}
          </button>
        ) : null}
      </div>
    </footer>
  );
};

export default Pagination;
