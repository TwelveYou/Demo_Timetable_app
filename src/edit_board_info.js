import React from 'react';
import HeaderApp from './header_app'; 
import ModalMessage from './modal_message';

import './styles/edit_board_info.css'

export default class EditBoardInfo extends React.Component{ // Класс админа системы
    constructor(props) { 
        super(props);
        let board = '';

        if (this.props.id_board == 'new'){
            board = {
                id: 'new',
                name_board:"",
                link_board:'',
                city:'',
                street:'',
                number_house:'',
                place:''
            }
        } else{
            for (let i = 0; i < this.props.boards.length; i++){
                if (this.props.boards[i].id == this.props.id_board){
                    board = this.props.boards[i];
                }
            }
        }



        this.state = {
            // board: board  // ПЕРВОЕ ТАБЛО ВЫБРАНО ПО УМОЛЧАНИЮ +++++++++++++++++++++++++++++++++++  
            id: board.id,
            name_board: board.name_board,
            link_board: board.link_board,
            city: board.city,
            street: board.street,
            number_house: board.number_house,
            place: board.place  ,

            flag_change_board: false  
        };   
        this.change_board = this.change_board.bind(this);      
        this.build_board = this.build_board.bind(this);  
        this.show_modal = this.show_modal.bind(this);  
        this.hide_modal = this.hide_modal.bind(this);               
    }

    show_modal(){
        let show_modal = document.getElementsByClassName('modal-window');
        show_modal[0].style = "visibility: visible";      
    }
    
    hide_modal(){
        let show_modal = document.getElementsByClassName('modal-window');
        show_modal[0].style = "visibility: hide";
    }

    build_board(){
        return{
            id: this.state.id,
            name_board: this.state.name_board,
            link_board: this.state.link_board,
            city: this.state.city,
            street: this.state.street,
            number_house: this.state.number_house,
            place: this.state.place 
        }
    }

    change_board(event,type){
        let target = event.target;
        let value = target.value; 

        if (type == 'name_board'){
            this.setState({
                name_board: value
              })
        } else if (type == 'link_board'){
            this.setState({
                link_board: value
              })
        } else if (type == 'city'){
            this.setState({
                city: value
              })
        } else if (type == 'street'){
            this.setState({
                street: value
              })
        } else if (type == 'number_house'){
            this.setState({
                number_house: value
              })
        } else if (type == 'place'){
            this.setState({
                place: value
              })
        }

        this.setState({
            flag_change_board: true
        })
    }

    render(){
        let edit_board_message = 'Создание нового электронного табло';
        let save_board_message ='Вы хотите создать электронное табло с введенными данными?';
        if (this.state.id != 'new'){
            edit_board_message = 'Редактирование электронного табло «'+ this.state.name_board +'» по адресу «'+this.state.city +' '+ this.state.street +' '+ this.state.number_house +'»';
            save_board_message = 'Вы подтверждаете изменения редактируемого электронного табло «'+ this.state.name_board +'» по адресу «'+this.state.city +' '+ this.state.street +' '+ this.state.number_house +'»?';
        }

        return(
          <div className="app">

            <ModalMessage message={save_board_message} answer1={'Сохранить'} answer2={'Закрыть и отменить'} button_x={this.hide_modal} button_answer2={() => this.props.finish_edit_board(false)} button_answer1={() => this.props.save_edit_board(this.build_board()) }/> 
            {/* this.props.finish_edit_board(false); */}

            <HeaderApp log_out={this.props.log_out} username={this.props.username} message_info={edit_board_message}/>
            <div className="app-edit-board-info">
                <NameLink name_board={this.state.name_board} link_board={this.state.link_board} change_board={this.change_board}/>
                <Address city={this.state.city} street={this.state.street} number_house={this.state.number_house} place={this.state.place} change_board={this.change_board}/>
                <ButtonList 
                    close={() => {if(this.state.flag_change_board) {this.show_modal();} else {this.props.finish_edit_board(false);} } } 
                    save_edit_board={() => {if(this.state.flag_change_board) {this.show_modal();} else { if(this.state.id != 'new'){this.props.finish_edit_board(false);} else{this.show_modal();} } } } 
                    build_board={this.build_board}
                />
                <button className="app-edit-board-info-buttons__button-close" onClick={() => {if(this.state.flag_change_board) {this.show_modal();} else {this.props.finish_edit_board(false);} }  }>X</button>
            </div>
          </div>
        )
    }
}

class InputField extends React.Component{
    render(){
        return(
            <div className="app-edit-board-info-input-field">
                <p className="app-edit-board-info-input-field__label">{this.props.text_label}</p>
                <input type="text" className="app-edit-board-info-input-field__input" value={this.props.text_input} onChange={this.props.change_function}/>
            </div>
        )
    }
}

class InputFieldOneOnString extends React.Component{
    render(){
        return(
            <div className="app-edit-board-info-input-field">
                <p className="app-edit-board-info-input-field__label">{this.props.text_label}</p>
                <input type="text" className="app-edit-board-info-input-field__input_one-one-string" value={this.props.text_input} onChange={this.props.change_function}/>
            </div>
        )
    }
}

class NameLink extends React.Component{
    render(){
        return(
            <div className="app-edit-board-info__name-and-link">
                <p className="app-edit-board-info__heading">Табло</p>
                <div className="app-edit-board-info__flex">
                    <InputField text_label="Наименование табло" text_input={this.props.name_board} change_function={(event) => this.props.change_board(event,'name_board')}/>
                    <InputField text_label="Ссылка для доступа" text_input={this.props.link_board} change_function={(event) => this.props.change_board(event,'link_board')}/>
                    <input className="invisible_element" type='text'/>
                </div>
            </div>
        )
    }
}

class Address extends React.Component{
    render(){
        return(
            <div className="app-edit-board-info__address">
                <p className="app-edit-board-info__heading  ">Адрес</p>
                <div className="app-edit-board-info__flex">
                    <InputField text_label="Населенный пункт" text_input={this.props.city} change_function={(event) => this.props.change_board(event,'city')}/>
                    <InputField text_label="Улица" text_input={this.props.street} change_function={(event) => this.props.change_board(event,'street')}/>
                    <InputField text_label="Номер дома" text_input={this.props.number_house} change_function={(event) => this.props.change_board(event,'number_house')}/>
                </div>
                <InputFieldOneOnString text_label="Информация о помещении" text_input={this.props.place} change_function={(event) => this.props.change_board(event,'place')}/>
            </div>
        )
    }
}

class ButtonEditBoard extends React.Component{
    render(){
        return(
            <button className="app-edit-board-info__button" onClick={this.props.click}> {this.props.label_button} </button>
        )
    }
}

class ButtonList extends React.Component{
    render(){
        return(
            <div className="app-edit-board-info__button-list">
                <ButtonEditBoard click={() => this.props.close() } label_button='Отменить'/>
                <ButtonEditBoard click={() => this.props.save_edit_board()} label_button='Сохранить'/>
            </div>
        )
    }
}