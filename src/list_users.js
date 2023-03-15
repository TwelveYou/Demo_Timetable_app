import React from 'react';
import ModalMessage from './modal_message';

import './styles/list_users.css'


export default class AdminListUsers extends React.Component{    
    constructor(props) {
        super(props);

        let min_id_user = '';
        if (this.props.users.length > 0){
            min_id_user = this.props.users[0].id;
            for(let i = 0; i < this.props.users.length; i++){
                if(this.props.users[i].id < min_id_user){
                    min_id_user = this.props.users[i].id;
                }
            }
        }

        this.state = {
        //   chosen_user: 0  // ПЕРВОЕ ТАБЛО ВЫБРАНО ПО УМОЛЧАНИЮ +++++++++++++++++++++++++++++++++++   
          chosen_user: min_id_user     
        };   
        this.change_chosen_user = this.change_chosen_user.bind(this); 
        this.refresh_chosen_user = this.refresh_chosen_user.bind(this);   
        this.show_modal = this.show_modal.bind(this);  
        this.hide_modal = this.hide_modal.bind(this);     
        this.get_username_for_id = this.get_username_for_id.bind(this);     
        // this.show_hide_buttons_on_user_list_is_empty = this.show_hide_buttons_on_user_list_is_empty.bind(this);    
        }
    
    async change_chosen_user(value){
        await this.setState({
            chosen_user: value
        });
        // console.log(this.state.chosen_user);
    }

    async refresh_chosen_user(){
        if (this.props.users.length > 0){
            let min_id_user = this.props.users[0].id;
            for(let i = 0; i < this.props.users.length; i++){
                if(this.props.users[i].id < min_id_user){
                    min_id_user = this.props.users[i].id;
                }
            }
            this.setState({
                chosen_user: min_id_user
            });
        }

        // this.show_hide_buttons_on_user_list_is_empty();
    }

    // show_hide_buttons_on_user_list_is_empty(){
    //     let button_delete = document.getElementsByClassName('list-users__button-delete button')[0];   
    //     let button_add = document.getElementsByClassName('list-users__button-edit button')[0];         
    //     if (this.props.users.length > 0){
    //         button_delete.style = "visibility: visible";
    //         button_add.style = "visibility: visible";
    //     } else { 
    //         button_delete.style = "visibility: hidden";
    //         button_add.style = "visibility: hidden";
    //     }
    // }

    show_modal(){
        let show_modal = document.getElementsByClassName('modal-window');
        show_modal[0].style = "visibility: visible";      
      }
    
    hide_modal(){
        let show_modal = document.getElementsByClassName('modal-window');
        show_modal[0].style = "visibility: hide";
    }

    get_username_for_id(){
        let username = '';
        for (let i=0; i< this.props.users.length; i++){
            if (this.props.users[i].id == this.state.chosen_user){
                username = this.props.users[i].username;
            }
        }
        return username;
    }

    render(){
        let visability_buttons_delete_and_edit = {visibility: 'visible'};
        if (this.props.users.length <= 0){
            visability_buttons_delete_and_edit = {visibility: 'hidden'};
        }

        return(
          <div className='list-users'>
            <ModalMessage message={'Вы подтверждаете удаление пользователя «' + this.get_username_for_id() + '»?'} answer1={'Да'} answer2={'Нет'} button_x={this.hide_modal} button_answer2={this.hide_modal} button_answer1={async () => {await this.props.delete_user(this.state.chosen_user); this.refresh_chosen_user(); this.hide_modal(); } }/> 
            <p className='list-users__heading'>Список пользователей</p>
            <ListUsers users={this.props.users} chosen_user={this.state.chosen_user} change_chosen_user={this.change_chosen_user}/>
            <div className="list-users__buttons">
                <button className="list-users__button-edit button" style={visability_buttons_delete_and_edit} onClick={() => {this.props.start_edit_user(this.state.chosen_user)} }>Редактировать</button>
                <button className="list-users__button-add button" onClick={() => this.props.start_edit_user('new')}>Добавить</button>
                {/* <button className="list-users__button-delete button" onClick={async () => {await this.props.delete_user(this.state.chosen_user); this.refresh_chosen_user(); } }>Удалить</button> */}
                <button className="list-users__button-delete button" style={visability_buttons_delete_and_edit} onClick={() => this.show_modal() }>Удалить</button>
            </div>
          </div>
        )
    }
}

class ListUsers extends React.Component{     
    render(){
        if (this.props.users.length == 0)
            return(
                <p className='text-align-center'> В системе нет пользователей. При следующем запуске вы не сможете зайти в приложение </p>
            )
        else
            return(
                <ul className='list-users__list'>
                    {this.props.users.map((user, id) => (<User key={user.id} chosen_user={this.props.chosen_user} user={user} id={id} change_chosen_user={this.props.change_chosen_user}/>))} 
                </ul>
            )
    }
}

class User extends React.Component{    
    render(){
        let class_name_user='list-users__user';
        if(this.props.chosen_user == this.props.user.id){
            class_name_user+=' list-users__user-active-true';
        }

        return(
            <li className={class_name_user} onClick={() => this.props.change_chosen_user(this.props.user.id)}>
                {this.props.user.username} ({this.props.user.surname} {this.props.user.name[0]}. {this.props.user.second_name[0]}. {this.props.user.birthday})
            </li>
        )
    }
}