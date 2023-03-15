import React from 'react';
import './styles/board_select.css'

export default class BoardSelect extends React.Component{
  constructor(props) {
    super(props);
    if(this.props.user_list_boards.length > 0){
      if(this.props.chousen_board == null){
        this.props.change_board(this.props.user_list_boards[0].id);  
      }
      // this.props.change_board(this.props.user_list_boards[0].id);
    }
  //   let boards = <p> У вас нет ни одного подконтрольного табло </p>; 
  //   if (this.props.boards_user_can_control){
  //     boards = this.props.boards.map((board) => (<Board key={board.id} id={board.id} board_enter={board} chousen_board={this.props.chousen_board} change_board={() => this.props.change_board(board.id)}/>)) 
  //   }                
  }

  render(){
    
    
    let boards = <p className='big-message'> У вас нет ни одного подконтрольного табло </p>;

    if (this.props.user_list_boards.length > 0){
      boards = this.props.user_list_boards.map((board) => (<Board key={board.id} id={board.id} board_enter={board} chousen_board={this.props.chousen_board} change_board={() => this.props.change_board(board.id)}/>)) 
      // this.props.change_board(this.props.user_list_boards[0].id);
    } 

    return(
      <div className='board-select'>
        <ul className='board-select-list'>
          {boards}
        </ul>
      </div>
    )
  }
}


class Board extends React.Component{
  render(){
    let class_board = 'board-select-list__board'
    if (this.props.id == this.props.chousen_board){
      class_board = 'board-select-list__board board-select-list__board_active_true'
    }

    return(
      <li className={class_board} id={this.props.id} onClick={()=>this.props.change_board(this.props.id)}>
        <p className='board-select-list__board-name'> 
          {this.props.board_enter.name_board}    
        </p>
        <p className='board-select-list__board-address'> 
          {/* {this.props.board_enter.address_board}     */}
          {this.props.board_enter.city+' '+this.props.board_enter.street+' '+this.props.board_enter.number_house}
        </p>
      </li>
    )
  }
}