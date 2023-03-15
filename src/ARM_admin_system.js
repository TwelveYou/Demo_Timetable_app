import React from 'react';
import HeaderApp from './header_app'; 
import AdminListUsers from './list_users'
import AdminListBoards from './list_boards'

import './styles/ARM_admin_system.css'

export default class ArmBoardAdmin extends React.Component{ // Класс админа системы
  constructor(props) {
    super(props);
  }

    render(){
        return(
          <div className="app">
                <HeaderApp log_out={this.props.log_out} username={this.props.username} message_info='Здесь вы можете редактировать списки пользователей и табло'/>
                <div className="app-arm-admin-system">
                  <SelectList what_list={this.props.what_list_admin_system} select_list={[['Пользователи','users'],['Табло','boards']]} change_admin_list={this.props.change_what_list_admin_system} />
                  <AdminList what_list={this.props.what_list_admin_system} users={this.props.users} start_edit_user={this.props.start_edit_user} boards={this.props.boards} start_edit_board={this.props.start_edit_board} delete_user={this.props.delete_user} delete_board={this.props.delete_board}/>
                </div> 
          </div>
        )
    }
}

class SelectList extends React.Component{
  render(){
    return(
      <ul className="app-arm-admin-system__select_list">
        {this.props.select_list.map((one_of_list, id) => (<OneOfSelectList key={id} one_of_list={one_of_list} change_admin_list={this.props.change_admin_list} what_list={this.props.what_list}/>))}
      </ul>
    )
  }
}

class OneOfSelectList extends React.Component{
  render(){
    let class_name_for_one_of_select_list = 'app-arm-admin-system__one-of-list';
    if (this.props.one_of_list[1]==this.props.what_list){
      class_name_for_one_of_select_list+= ' app-arm-admin-system__one-of-list-active_true';
    }
    return(
      <li className={class_name_for_one_of_select_list} onClick={()=>this.props.change_admin_list(this.props.one_of_list[1])}> 
        {this.props.one_of_list[0]} 
      </li>
    )
  }
}

class AdminList extends React.Component{  
    render(){
      let what_show = <AdminListUsers users={this.props.users} start_edit_user={this.props.start_edit_user} delete_user={this.props.delete_user}/>;
      if (this.props.what_list == 'users'){
        what_show = <AdminListUsers users={this.props.users} start_edit_user={this.props.start_edit_user} delete_user={this.props.delete_user}/>;
      } else if (this.props.what_list == 'boards'){
        what_show = <AdminListBoards boards={this.props.boards} start_edit_board={this.props.start_edit_board} delete_board={this.props.delete_board}/>;        
      }
      return(
        what_show
      )
    }
  }