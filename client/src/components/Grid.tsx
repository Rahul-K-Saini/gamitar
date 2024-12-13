import React from "react";

interface GridProps {
  grid: string[][];
  onCellClick: (row: number, col: number) => void;
  hasPlayed: boolean;
  onlineUsers: number;
  timer: number;
}

export const Grid: React.FC<GridProps> = ({
  grid,
  timer,
  onCellClick,
  hasPlayed,
  onlineUsers,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <small className="text-red-400">Note: Please check in local the render free server has 1-2 min of cold start and for some time at start it will not work </small>
        <h1 className="text-2xl font-bold text-gray-800">Unicode Grid Game</h1>
        <div className="flex gap-2  items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-gray-600"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-blue-500">{timer}</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-gray-600"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>

          <span className="text-green-600">{onlineUsers} online</span>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1 bg-gray-200 p-2 rounded-lg">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => !hasPlayed && onCellClick(rowIndex, colIndex)}
              disabled={hasPlayed || cell !== ""}
              className={`
                aspect-square flex items-center justify-center
                text-xl font-medium bg-white rounded-md
                transition-colors duration-200
                ${
                  !hasPlayed && cell === ""
                    ? "hover:bg-gray-50 cursor-pointer"
                    : ""
                }
                ${hasPlayed ? "cursor-not-allowed" : ""}
              `}
            >
              {cell || " "}
            </button>
          ))
        )}
      </div>

      {hasPlayed && (
        <p className="mt-4 text-center text-gray-600">
          You've made your move! Wait for other players.
        </p>
      )}
    </div>
  );
};
