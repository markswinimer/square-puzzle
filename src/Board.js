import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.

 * State:
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 50
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.createBoard = this.createBoard.bind(this)
    this.flipCellsAround = this.flipCellsAround.bind(this)
  }

  /** create a board nRows high/nCols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    while(this.props.nRows > board.length) {
      let i = 0;
      let row = [];
      for(i = 0; i < this.props.nCols; i++) {
        row.push((Math.floor(Math.random() * 100)) >= this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board
  }
    // TODO: create array-of-arrays of true/false values

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log(" ------- ")
    let {nCols, nRows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nCols && y >= 0 && y < nRows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = board.every(row => row.every(cell => !cell))
    this.setState({board: board, hasWon: hasWon});
  }


  /** Render game board or winning message. */


  render() {
    if(this.state.hasWon) {
      return <h1>You did it!</h1>
    }
    let renderBoard = [];
    for (let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for(let x = 0; x < this.props.nCols; x++) {
        let coord = `${y}-${x}`;
        row.push(<Cell key={ y + '-' + x } isLit={this.state.board[y][x]} flipCellsAround={() => this.flipCellsAround(coord)}/>)
      }
      renderBoard.push(<tr key={y}>{row}</tr>)
    }
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    return(
      <table className="Board">
        <tbody>
            {renderBoard}
        </tbody>
      </table>
    )
  }
}


export default Board;
