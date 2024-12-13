import { GridState, GameState, Player } from '../types/index.js';

export class GameStateManager {
  private state: GameState;

  constructor() {
    this.state = {
      grid: {
        cells: Array(10).fill('').map(() => Array(10).fill(''))
      },
      players: new Map()
    };
  }

  public addPlayer(playerId: string): void {
    this.state.players.set(playerId, { id: playerId, hasPlayed: false });
  }

  public removePlayer(playerId: string): void {
    this.state.players.delete(playerId);
  }

  public updateCell(row: number, col: number, value: string, playerId: string): boolean {
    const player = this.state.players.get(playerId);
    console.log("sssssssssssssssssss")
    console.log(player, player?.hasPlayed, this.state.grid.cells[row][col] !== '')
    if (!player || player.hasPlayed || this.state.grid.cells[row][col] !== '') {
      console.log("sdjjsbdbvsdbvbsdjvjsdjfvsjdhfjusdjfhjsdhjfhssssssssssssssssss")
      return false;
    }

    this.state.grid.cells[row][col] = value;
    player.hasPlayed = true;
    this.state.players.set(playerId, player);
    return true;
  }

  public getGrid(): GridState {
    return this.state.grid;
  }

  public getOnlinePlayersCount(): number {
    return this.state.players.size;
  }

  public hasPlayerPlayed(playerId: string): boolean {
    return this.state.players.get(playerId)?.hasPlayed ?? false;
  }

  public updatePlayerStatus(playerId: string, status: boolean) {
    this.state.players.set(playerId, { id: playerId, hasPlayed: status });
  }

}