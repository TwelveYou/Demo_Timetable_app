import React from 'react';
import ModalMessage from './modal_message';

import './styles/list_boards.css'


export default class AdminListBoards extends React.Component{    
    constructor(props) {
        super(props);

        let min_id_board = '';

        if (this.props.boards.length > 0){
            min_id_board = this.props.boards[0].id;
            for(let i = 0; i < this.props.boards.length; i++){
                if(this.props.boards[i].id < min_id_board){
                    min_id_board = this.props.boards[i].id;
                }
            }
        }

        this.state = {
          chosen_board: min_id_board  // ПЕРВОЕ ТАБЛО ВЫБРАНО ПО УМОЛЧАНИЮ +++++++++++++++++++++++++++++++++++       
        };   
        this.change_chosen_board = this.change_chosen_board.bind(this);                     
        this.refresh_chosen_board = this.refresh_chosen_board.bind(this);   
        this.show_modal = this.show_modal.bind(this);  
        this.hide_modal = this.hide_modal.bind(this);    
        this.board_get_name_and_address_for_id = this.board_get_name_and_address_for_id.bind(this);  
      }
    
    async change_chosen_board(value){
        await this.setState({
            chosen_board: value
        });
    }

    async refresh_chosen_board(){
        if (this.props.boards.length > 0){
            let min_id_board = this.props.boards[0].id;
            for(let i = 0; i < this.props.boards.length; i++){
                if(this.props.boards[i].id < min_id_board){
                    min_id_board = this.props.boards[i].id;
                }
            }
            this.setState({
                chosen_board: min_id_board
            });
        }

        // let button_delete = document.getElementsByClassName('list-boards__button-delete button')[0]            
        // if (this.props.boards.length > 0){
        //     button_delete.style = "visibility: visible"; 
        // } else {
        //     button_delete.style = "visibility: hidden";
        // }
    }

    show_modal(){
        let show_modal = document.getElementsByClassName('modal-window');
        show_modal[0].style = "visibility: visible";      
      }
    
    hide_modal(){
        let show_modal = document.getElementsByClassName('modal-window');
        show_modal[0].style = "visibility: hide";
    }

    board_get_name_and_address_for_id(){
        let name_and_address_board = '';
        for (let i=0; i< this.props.boards.length; i++){
            if (this.props.boards[i].id == this.state.chosen_board){
                name_and_address_board = '«'+this.props.boards[i].name_board+'», расположенного по адресу «'+this.props.boards[i].city +' '+ this.props.boards[i].street +' '+ this.props.boards[i].number_house+'»';
            }
        }
        return name_and_address_board;
    }
    
    render(){

        let visability_buttons_delete_and_edit = {visibility: 'visible'};
        if (this.props.boards.length <= 0){
            visability_buttons_delete_and_edit = {visibility: 'hidden'};
        }

        return(
          <div className='list-boards'>
            <ModalMessage message={'Вы подтверждаете удаление электронного табло ' + this.board_get_name_and_address_for_id()} answer1={'Да'} answer2={'Нет'} button_x={this.hide_modal} button_answer2={this.hide_modal} button_answer1={async () => { await this.props.delete_board(this.state.chosen_board); this.refresh_chosen_board(); this.hide_modal(); } }/> 
            <p className='list-boards__heading'>Список табло</p>
            <ListBoard boards={this.props.boards} chosen_board={this.state.chosen_board} change_chosen_board={this.change_chosen_board}/>
            <div className="list-boards__buttons">
                {/* <button className="list-boards__button-edit button" onClick={() => {console.log(this.state.chosen_board);this.props.start_edit_board(this.state.chosen_board)} }>Редактировать</button> */}
                <button className="list-boards__button-edit button" style={visability_buttons_delete_and_edit} onClick={() => {this.props.start_edit_board(this.state.chosen_board);} }>Редактировать</button>
                <button className="list-boards__button-add button"  onClick={() => this.props.start_edit_board('new')}>Добавить</button>
                {/* <button className="list-boards__button-delete button" onClick={async () => { await this.props.delete_board(this.state.chosen_board); this.refresh_chosen_board();}}>Удалить</button>  */}
                <button className="list-boards__button-delete button" style={visability_buttons_delete_and_edit} onClick={async () => { this.show_modal();}}>Удалить</button> 
            </div>
          </div>
        )
    }
}

class ListBoard extends React.Component{    
    render(){
        if (this.props.boards.length == 0){
            return(
                <p className='text-align-center'> В системе нет ни одного электронного табло </p>
            )            
        } else{
            return(
                <ul className='list-boards__list'>
                    {this.props.boards.map((board, id) => (<Board key={board.id} chosen_board={this.props.chosen_board} board={board} id={id} change_chosen_board={this.props.change_chosen_board}/>))} 
                </ul>
            )
        }
    }
}

class Board extends React.Component{    
    render(){
        let class_name_board='list-boards__board';
        if(this.props.chosen_board == this.props.board.id){
            class_name_board+=' list-boards__board-active-true';
        }

        return( 
            <li className={class_name_board} onClick={() => this.props.change_chosen_board(this.props.board.id)}>
                {this.props.board.name_board} ({this.props.board.city}, {this.props.board.street} {this.props.board.number_house}; {this.props.board.place})
            </li>
        )
    }
}