import { useEffect, useCallback } from 'react';
import { socketService } from '../services/socket';

export const useSocket = () => {
  useEffect(() => {
    socketService.connect();
    return () => socketService.disconnect();
  }, []);

  const updateCell = useCallback((row: number, col: number, value: string) => {
    socketService.updateCell(row, col, value);
  }, []);

  return {
    updateCell,
    onGameState: (callback: (data: any) => void) => socketService.on('gameState', callback),
    onGridUpdate: (callback: (data: any) => void) => socketService.on('gridUpdate', callback),
    onPlayerCount: (callback: (count: number) => void) => socketService.on('playerCount', callback),
    offGameState: (callback: () => void) => socketService.off('gameState', callback),
    offGridUpdate: (callback: () => void) => socketService.off('gridUpdate', callback),
    offPlayerCount: (callback: () => void) => socketService.off('playerCount', callback),
  };
};