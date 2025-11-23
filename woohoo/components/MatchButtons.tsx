interface MatchButtonsProps {
  onLike: () => void;
  onPass: () => void;
}

export default function MatchButtons({ onLike, onPass }: MatchButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-8">
      <button
        onClick={onPass}
        className=" w-16 h-16 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600
    hover:border-[#8A2BE2] cursor-pointer "
        aria-label="Pass"
      >
        <svg
          className="w-8 h-8 "
          fill="#8A2BE2"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        onClick={onLike}
        className="w-16 h-16 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:border-[#8A2BE2] cursor-pointer "
        aria-label="Like"
      >
        <svg
          className="w-8 h-8"
          fill=" #8A2BE2"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}