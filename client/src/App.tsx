import { useState, useEffect } from 'react';
import { Grid } from './components/Grid';
import { CharacterSelector } from './components/CharacterSelector';
import { useSocket } from './hooks/useSocket';

function App() {
  const [grid, setGrid] = useState<string[][]>(
    Array(10).fill('').map(() => Array(10).fill(''))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(1);
  
  const socket = useSocket();

  useEffect(() => {
    socket.onGameState((data: any) => {
      setGrid(data.grid.cells);
      setHasPlayed(data.hasPlayed);
    });

    socket.onGridUpdate((data: any) => {
      setGrid(data.grid.cells);
    });

    socket.onPlayerCount((count: number) => {
      setOnlineUsers(count);
    });

    return () => {
      socket.offGameState(() => {});
      socket.offGridUpdate(() => {});
      socket.offPlayerCount(() => {});
    };
  }, [socket]);

  const handleCellClick = (row: number, col: number) => {
    if (!hasPlayed && grid[row][col] === '') {
      setSelectedCell([row, col]);
    }
  };

  const handleCharacterSelect = (character: string) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      socket.updateCell(row, col, character);
      setSelectedCell(null);
      setHasPlayed(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Grid
        grid={grid}
        onCellClick={handleCellClick}
        hasPlayed={hasPlayed}
        onlineUsers={onlineUsers}
      />
      <CharacterSelector
        onSelect={handleCharacterSelect}
        isOpen={selectedCell !== null}
      />
    </div>
  );
}

export default App;