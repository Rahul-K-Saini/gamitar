export class GameStateManager {
    constructor() {
        this.state = {
            grid: {
                cells: Array(10).fill('').map(() => Array(10).fill(''))
            },
            players: new Map()
        };
    }
    addPlayer(playerId) {
        this.state.players.set(playerId, { id: playerId, hasPlayed: false });
    }
    removePlayer(playerId) {
        this.state.players.delete(playerId);
    }
    updateCell(row, col, value, playerId) {
        const player = this.state.players.get(playerId);
        if (!player || player.hasPlayed || this.state.grid.cells[row][col] !== '') {
            return false;
        }
        this.state.grid.cells[row][col] = value;
        player.hasPlayed = true;
        this.state.players.set(playerId, player);
        return true;
    }
    getGrid() {
        return this.state.grid;
    }
    getOnlinePlayersCount() {
        return this.state.players.size;
    }
    hasPlayerPlayed(playerId) {
        return this.state.players.get(playerId)?.hasPlayed ?? false;
    }
}
//# sourceMappingURL=GameStateManager.js.map