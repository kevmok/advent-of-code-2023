/* Solution to Cube Conundrum Part 1 & 2 */
/* --- Day 2: Cube Conundrum Part 1 --- */

type color = 'red' | 'green' | 'blue';
type ColorCounts = { [color: string]: number };
type GameMap = Map<number, ColorCounts[]>;

export function CubeConundrum(gameInput: string): number {
  let sum = 0;
  const game = parseGame(gameInput);

  for (const gameId of game.keys()) {
    if (isGameValid(game.get(gameId) as ColorCounts[])) {
      sum += gameId;
    }
  }
  return sum;
}

function isGameValid(game: ColorCounts[]): boolean {
  const count: Record<'blue' | 'red' | 'green', number> = {
    red: 12,
    green: 13,
    blue: 14,
  };
  for (const round of game) {
    for (const color in round) {
      if (round[color] > count[color as color]) {
        return false;
      }
    }
  }
  return true;
}

function parseGame(gameString: string): GameMap {
  const result: GameMap = new Map();
  const games = gameString.split('\n').map((game) => game.trim());

  for (const [index, game] of games.entries()) {
    const gameId = index + 1;
    const rounds = game.split(';').map((round) => round.trim());

    const roundsList = rounds.map((round) => {
      const roundResult: ColorCounts = {};

      // remove Game x: from the round
      const roundEdited = round.replace(/Game \d+: /, '');

      // Split each round into color counts
      const colorCounts = roundEdited.split(',').map((c) => c.trim());

      for (const colorCount of colorCounts) {
        const [count, color] = colorCount.split(' ');
        roundResult[color] = parseInt(count);
      }

      return roundResult;
    });
    result.set(index + 1, roundsList);
  }
  return result;
}

/* --- Day 2: Cube Conundrum Part 2 --- */
export function CubeConundrum_2(gameInput: string): number {
  let sum = 0;
  const game = parseGame(gameInput);

  for (const gameId of game.keys()) {
    const minCubesPower = getMinCubes(game.get(gameId) as ColorCounts[]);
    sum += minCubesPower;
  }
  return sum;
}
function getMinCubes(game: ColorCounts[]): number {
  const count: Record<'blue' | 'red' | 'green', number> = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const round of game) {
    for (const color in round) {
      count[color as color] = Math.max(count[color as color], round[color]);
    }
  }
  return count.red * count.green * count.blue;
}
