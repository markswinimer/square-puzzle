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

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

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
    console.log("IT WORKED")

    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({board, hasWon});
  }


  /** Render game board or winning message. */


  render() {
    let board = [];
    for (let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for(let x = 0; x < this.props.nCols; x++) {
        row.push(<Cell value={ y + '-' + x } isLit={this.state.board[y][x]} flipCellsAround={this.flipCellsAround}/>)
      }
      board.push(<tr>{row}</tr>)
    }
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    return(
      <table className="Board">
        <tbody>
          <tr>
            {board}
          </tr>
        </tbody>
      </table>
    )
  }
}


export default Board;
