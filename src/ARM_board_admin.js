import React from 'react';
import HeaderApp from './header_app'; 
import BoardSelect from './board_select'; 
import ChangeBoard from './change_board';
import ModalMessage from './modal_message';

import './styles/ARM_board_admin.css';

    //  username - приветствие
    //  message_info - Информация о доступных действиях
    //  logout

export default class ArmBoardAdmin extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        // chousen_board: this.props.user_list_boards[0].id,  // ПЕРВОЕ ТАБЛО ВЫБРАНО ПО УМОЛЧАНИЮ +++++++++++++++++++++++++++++++++++       
        id_doctor_for_delete: false
      };   
      // this.change_board = this.change_board.bind(this);      
      this.delete_doctor = this.delete_doctor.bind(this);    
      this.show_modal = this.show_modal.bind(this);  
      this.hide_modal = this.hide_modal.bind(this); 
    }

    // change_board(id_board){
    //   this.setState({
    //     chousen_board: id_board
    //   })
    // }

    async delete_doctor(id){
      await this.setState({
        id_doctor_for_delete: id
      });
      this.show_modal();
      console.log('убили врача под номером '+String(id));
    }    

    show_modal(){
      let show_modal = document.getElementsByClassName('modal-window');
      show_modal[0].style = "visibility: visible";      
    }
  
    hide_modal(){
      let show_modal = document.getElementsByClassName('modal-window');
      show_modal[0].style = "visibility: hide";
    }

    render(){
        return(
          <div className="app">
              <HeaderApp log_out={this.props.log_out}  username={this.props.username} message_info='Здесь вы можете редактировать информацию на электронном табло'/> 
              <WorkSpaceBoardAdmin error_overlay={this.props.error_overlay} hide_modal ={this.hide_modal} close_edit_doctor={this.hide_modal} delete_doctor={this.delete_doctor} id_doctor_for_delete={this.state.id_doctor_for_delete} user_list_boards={this.props.user_list_boards} doctors_from_boards={this.props.doctors_from_boards} chousen_board={this.props.chousen_board} change_board={this.props.change_board} start_edit_doctor={this.props.start_edit_doctor} delete_doctor_on_board={this.props.delete_doctor_on_board} change_order_doctor={this.props.change_order_doctor}/>             
          </div>
        )
    }
}

class WorkSpaceBoardAdmin extends React.Component{
  render(){
    let a = 'test'
    return(
      <div className="app-arm-admin-board"> 
          <ModalMessage message={'Вы подтверждаете удаление расписания врача?'} answer1={'Да'} answer2={'Нет'} id_doctor={(this.props.id_doctor)} button_x={this.props.hide_modal} button_answer2={this.props.hide_modal} button_answer1={async() => {await this.props.delete_doctor_on_board(this.props.id_doctor_for_delete); this.props.hide_modal()} }/>
          <BoardSelect user_list_boards={this.props.user_list_boards}  chousen_board={this.props.chousen_board} change_board={this.props.change_board} />
          <ChangeBoard error_overlay={this.props.error_overlay} id_board={this.props.chousen_board} delete_doctor={this.props.delete_doctor} user_list_boards={this.props.user_list_boards} doctors_from_boards={this.props.doctors_from_boards} start_edit_doctor={this.props.start_edit_doctor} change_order_doctor={this.props.change_order_doctor} change_board={this.props.change_board} chousen_board={this.props.chousen_board}/>
      </div>
    )
  }
}