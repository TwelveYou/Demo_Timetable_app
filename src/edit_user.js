import React from 'react';
import HeaderApp from './header_app'; 
import ModalMessage from './modal_message';

import './styles/edit_user.css'

export default class EditUser extends React.Component{ // Класс админа системы
    constructor(props) {
      super(props);

        let user = '';
        if (this.props.id_user == 'new'){
            user ={
                id: 'new',
                username: '',  
                password: '',  
                repeat_password: '',
                admin: '',
                surname: '',
                name: '',
                second_name: '',
                birthday: '',
                board_list: []
            }
        } else
        for (let i = 0; i < this.props.users.length; i++){
            if (this.props.users[i].id == this.props.id_user){
                user = this.props.users[i];
                // user.repeat_password = user.password;
            }
        } 

      this.state = {
        // user: user  
        id: user.id ,
        username: user.username,  
        // password: user.password,  
        // repeat_password: user.password,
        password: '',
        repeat_password: '',
        admin: user.admin,
        surname: user.surname,
        name: user.name,
        second_name: user.second_name,
        birthday: user.birthday,
        board_list: user.board_list,
        
        flag_change_user: false,
        true_password: user.password
      };   
      this.change_user_info = this.change_user_info.bind(this); 
      this.change_board_list = this.change_board_list.bind(this);  
      this.bild_user = this.bild_user.bind(this);    
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

    change_board_list(id_board){
        let board_list = this.state.board_list;

        if (board_list.includes(id_board)){ 
            board_list = board_list.filter(board => board != id_board);
        } else board_list.push(id_board)

        this.setState({
            board_list: board_list,
            flag_change_user: true
        })
    }

    change_user_info(event,type){
        let target = event.target;
        let value = target.value; 
        
        if (type == 'username'){
            this.setState({
                username: value
              })
        } else if (type == 'password'){
            this.setState({
                password: value
              })
        } else if (type == 'repeat_password'){
            this.setState({
                repeat_password: value
              })
        } else if (type == 'admin'){
            this.setState({
                admin: !this.state.admin
              })
        } else if (type == 'surname'){
            this.setState({
                surname: value
              })
        } else if (type == 'name'){
            this.setState({
                name: value
              })
        } else if (type == 'second_name'){
            this.setState({
                second_name: value
              })
        } else if (type == 'birthday'){
            this.setState({
                birthday: value
              })
        }

        this.setState({
            flag_change_user: true
          })        
    }

    bild_user(){
        let user = {
            id: this.state.id ,
            username: this.state.username,  
            password: this.state.password,                
            admin: this.state.admin,
            surname: this.state.surname,
            name: this.state.name,
            second_name: this.state.second_name,
            birthday: this.state.birthday,
            board_list: this.state.board_list            
        };

        // Поставить пароль, который был по умолчанию
        if (this.state.password == ''){
            user.password = this.state.true_password;
        }

        return user
    }

    render(){

        let boardlist = <BoardList board_list={this.state.board_list} boards={this.props.boards} change_board_list={this.change_board_list}/>;
        let controling_board_heading = <p className='app-edit-user__heading'>Закрепленные табло</p>;
        if (this.state.admin){
            boardlist = <div></div>;
            controling_board_heading = <div></div>
        }

        let edit_user_message = 'Создание нового пользователя';
        let save_user_message ='Вы хотите создать пользователя с введенными данными?';
        if (this.state.id != 'new'){
            edit_user_message = 'Редактирование пользователя '+ this.state.username;
            save_user_message = 'Вы подтверждаете изменения редактируемого пользователя «' + this.state.username + '»?';
        }

        return(
          <div className="app">


            <ModalMessage message={save_user_message} answer1={'Сохранить'} answer2={'Закрыть и отменить'} button_x={this.hide_modal} button_answer2={() => this.props.finish_edit_user(false)} button_answer1={() => this.props.save_edit_user(this.bild_user()) }/> 


            <HeaderApp log_out={this.props.log_out} username={this.props.username} message_info={edit_user_message}/>
            <div className="app-edit-user">
                <UserAuthorizationData username={this.state.username} password={this.state.password} repeat_password={this.state.repeat_password} admin={this.state.admin} change_user_info={this.change_user_info}/>
                <UserInfoData surname={this.state.surname} name={this.state.name} second_name={this.state.second_name} birthday={this.state.birthday} change_user_info={this.change_user_info}/>
                {/* <p className='app-edit-user__heading'>Закрепленные табло</p> */}
                {controling_board_heading}
                <div className='app-edit-user__last-block'>
                    {/* <BoardList board_list={this.state.board_list} boards={this.props.boards} change_board_list={this.change_board_list}/> */}
                    {boardlist}
                    <div className="app-edit-user-buttons">
                        {/* <button className="app-edit-user-buttons__button" onClick={() => {this.props.finish_edit_user(false);} }>Отменить</button>
                        <button className="app-edit-user-buttons__button" onClick={() => this.props.save_edit_user(this.bild_user())}>Сохранить</button> */}

                        <button className="app-edit-user-buttons__button" onClick={() => {if(this.state.flag_change_user) {this.show_modal();} else {this.props.finish_edit_user(false);} } } >Отменить</button>
                        <button className="app-edit-user-buttons__button" onClick={() => {if(this.state.flag_change_user) {this.show_modal();} else { if(this.state.id != 'new'){this.props.finish_edit_user(false);} else{this.show_modal();} } } }>Сохранить</button>
                    </div>                                       
                </div>
                <button className="app-edit-user-buttons__button-close" onClick={() => {if(this.state.flag_change_user) {this.show_modal();} else {this.props.finish_edit_user(false);} }  }>X</button>
            </div>
          </div>
        )
    }
}

class InputField extends React.Component{
    render(){
        return(
            <div className="app-edit-user-input-field">
                <p className="app-edit-user-input-field__label">{this.props.text_label}</p>
                <input type="text" className="app-edit-user-input-field__input" value={this.props.text_input} onChange={this.props.change_function}/>
            </div>
        )
    }
}

class InputFieldPassword extends React.Component{
    render(){
        return(
            <div className="app-edit-user-input-field">
                <p className="app-edit-user-input-field__label">{this.props.text_label}</p>
                <input type="password" className="app-edit-user-input-field__input" placeholder="******" value={this.props.text_input} onChange={this.props.change_function}/>
            </div>
        )
    }
}

class InputFieldChekBox extends React.Component{
    render(){
        return(
            <div className="app-edit-user-input-field">
                <p className="app-edit-user-input-field__label">{this.props.text_label}</p>
                <input type="checkbox" checked={this.props.checked} className="app-edit-user-input-field__input-check-box" onChange={this.props.change_function}/>
            </div>
        )
    }
}

class InputFieldDate extends React.Component{
    render(){
        return(
            <div className="app-edit-user-input-field">
                <p className="app-edit-user-input-field__label">{this.props.text_label}</p>
                <input type="date" value={this.props.birthday} className="app-edit-user-input-field__input-date" onChange={this.props.change_function} />  
            </div>        
        )
    }
}

class UserAuthorizationData extends React.Component{
    constructor(props) {
        super(props); 
        this.check_admin = this.check_admin.bind(this);                     
      }
  
      check_admin(value){
            if (value != false){
                return 'checked'
            } else return ''
        }

    render(){
        return(
            <div className="app-edit-user-authorization">
                <p className="app-edit-user__heading">Авторизация</p>
                <div className="app-edit-user-authorization-data">
                    <InputField text_label='Логин' text_input={this.props.username} change_function={(event) => this.props.change_user_info(event,'username')}/>
                    <InputFieldPassword text_label='Пароль' text_input={this.props.password} change_function={(event) => this.props.change_user_info(event,'password')}/> 
                    <InputFieldPassword text_label='Повторите пароль' text_input={this.props.repeat_password} change_function={(event) => this.props.change_user_info(event,'repeat_password')}/>
                    <InputFieldChekBox text_label='Администратор' checked={this.check_admin(this.props.admin) } change_function={(event) => this.props.change_user_info(event,'admin')}/>                
                </div>
            </div>
        )
    }
}

class UserInfoData extends React.Component{
    render(){
        return(
            <div className="app-edit-user-name-info">
                <p className="app-edit-user__heading">ФИО</p>
                <div className="app-edit-user-name-info-data">
                    <InputField text_label='Фамилия' text_input={this.props.surname} change_function={(event) => this.props.change_user_info(event,'surname')}/>
                    <InputField text_label='Имя' text_input={this.props.name} change_function={(event) => this.props.change_user_info(event,'name')}/>
                    <InputField text_label='Отчество' text_input={this.props.second_name} change_function={(event) => this.props.change_user_info(event,'second_name')}/>
                    <InputFieldDate text_label='Дата рождения' birthday={this.props.birthday} change_function={(event) => this.props.change_user_info(event,'birthday')}/>
                </div>
            </div>
        )
    }
}

class BoardList extends React.Component{
    constructor(props) {
        super(props); 
        this.check_admined_board = this.check_admined_board.bind(this);                     
    }
    
    check_admined_board(value){
            if (value){
                return 'checked'
            } else return ''
    }
    render(){
        let boards = this.props.boards;

        return(
            <div className="app-edit-user-controled-board">
                <table className="app-edit-user-controled-board-table">
                    <tbody>     
                        <tr className="app-edit-user-controled-board-table__heading">
                            <th className="app-edit-user-controled-board-table__heading-name-columm">Табло</th>
                            <th className="app-edit-user-controled-board-table__heading-name-columm">Доступ</th>          
                        </tr> 
                            {boards.map((board, key) => (<Board key={key} board_name={board.name_board + ' (' + board.city+' '+ board.street + ' ' + board.number_house + ')'}    checked={this.check_admined_board( this.props.board_list.includes(board.id)) }     change_function={() => this.props.change_board_list(board.id) }/>))}
                    </tbody>              
                </table>  
            </div>
        )
    }
}

class Board extends React.Component{
    render(){
        return(    
                    <tr className="app-edit-user-controled-board-table__board">
                        <th className="app-edit-user-controled-board-table__board-name">{this.props.board_name}</th>
                        <th className="app-edit-user-controled-board-table__board-is-controled">
                            <input type="checkbox" checked={this.props.checked} className="aapp-edit-user-controled-board-table__board-is-controled-check-box" onChange={this.props.change_function}/>
                        </th>          
                    </tr> 
        )
    }
}