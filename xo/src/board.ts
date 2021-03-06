export enum Team {
  X = 'X',
  O = 'O',
  Empty = '.',
  CAT = 'CAT'
}

export class Board {
  private readonly cols = 3;
  private readonly rows = 3;
  private readonly spaces: Team[] = new Array(this.cols * this.rows).fill(
    Team.Empty
  );

  get squares() {
    return [...this.spaces];
  }

  set(row: number, col: number, team: Team) {
    const i = row * 3 + col;

    this.spaces[i] = team;
  }

  setByIndex(index: number, team: Team) {
    this.spaces[index] = team;
  }

  key() {
    return this.spaces.join('');
  }

  print() {
    const board = this.spaces.reduce((b: string, team: Team, i: number) => {
      if (!(i % 3)) {
        b += '\n';
      }

      b += team + ' ';

      return b;
    }, '');

    console.log(board + '\n');
  }

  determineWinner() {
    const squares = this.squares;

    if (this.checkBoard(0, 1, 2)) {
      // row 1
      return squares[0];
    } else if (this.checkBoard(3, 4, 5)) {
      // row 2
      return squares[3];
    } else if (this.checkBoard(6, 7, 8)) {
      // row3
      return squares[6];
    } else if (this.checkBoard(0, 3, 6)) {
      // col 1
      return squares[0];
    } else if (this.checkBoard(1, 4, 7)) {
      // col 2
      return squares[1];
    } else if (this.checkBoard(2, 5, 8)) {
      // col 3
      return squares[2];
    } else if (this.checkBoard(0, 4, 8)) {
      // Diagonal top-left > bottom-right
      return squares[0];
    } else if (this.checkBoard(2, 4, 6)) {
      // Diagonal top-right > bottom-left
      return squares[2];
    } else if (squares.every(square => square !== Team.Empty)) {
      return Team.CAT;
    }

    return Team.Empty;
  }

  private checkBoard(first: number, second: number, third: number): boolean {
    const squares = this.squares;

    return (
      squares[first] !== Team.Empty &&
      squares[second] !== Team.Empty &&
      squares[third] !== Team.Empty &&
      squares[first] === squares[second] &&
      squares[second] === squares[third]
    );
  }
}
