import React from 'react';

import {doctors_demo, users_demo, boards_demo} from './data_for_demo'; // для демонстрации клиента - данные из файла

import Autorization from './autorization'; // стиль готов
import ShowBoard from './show_board'; // стиль готов, проверить на читаемость
import ArmBoarsdAdmin from './ARM_board_admin';
import EditDoctor from './edit_doctor';

import EditUser from './edit_user';
import EditBoardInfo from './edit_board_info';

import ArmAdminSystem from './ARM_admin_system';
// import
// import ModalMessage from './modal_message';

const server_url = 'http://192.168.0.203:5000';

export default class App extends React.Component{
    constructor(props) {
        super(props);
        // let users = this.download_data_from_server('users');
        // let boards = this.download_data_from_server('boards');
        // let doctors = this.download_data_from_server('doctors');
        let users = users_demo;
        let boards = boards_demo;
        let doctors = doctors_demo;



        this.state = {
            login: false,
            user_list_boards: boards, // определяет, какие табло будут показываться
            doctors_from_boards: doctors,
            users: users,
            boards: boards,
            arm_admin_sys: false,
            board: false,
            edit_doctor: false  ,
            edit_user: false,
            edit_board_info: false,
            what_list_admin_system: 'users',

            error_overlay: [[],[],[],[]], // Список врачей с ошибками на табло. Чтобы использовать дальше, нужно сохранять.
            
            chousen_board: null,
            chousen_board_doctors: []
        };
        this.log_in = this.log_in.bind(this);
        this.log_out = this.log_out.bind(this);
        this.start_edit_doctor = this.start_edit_doctor.bind(this);
        this.close_edit_doctor = this.close_edit_doctor.bind(this);  

        this.edit_doctors_on_board = this.edit_doctors_on_board.bind(this);         
        this.change_board = this.change_board.bind(this);        

        this.delete_doctor_on_board = this.delete_doctor_on_board.bind(this);
        this.create_new_doctor_on_board = this.create_new_doctor_on_board.bind(this);        

        this.cheak_overlay_board = this.cheak_overlay_board.bind(this); 

        this.change_what_list_admin_system = this.change_what_list_admin_system.bind(this);

        this.start_edit_user = this.start_edit_user.bind(this); 
        this.save_edit_user = this.save_edit_user.bind(this); 
        this.delete_user = this.delete_user.bind(this);

        this.start_edit_board = this.start_edit_board.bind(this); 
        this.save_edit_board = this.save_edit_board.bind(this);
        this.delete_board = this.delete_board.bind(this);

        this.change_user_list_boards_after_autorization = this.change_user_list_boards_after_autorization.bind(this);
        this.change_order_doctor = this.change_order_doctor.bind(this);

        // ФУНКЦИИ ДЛЯ РАБОТЫ С СЕРВЕРОМ
        this.download_data_from_server = this.download_data_from_server.bind(this);
        this.update_data_on_server = this.update_data_on_server.bind(this);
        this.client_update_data_from_server = this.client_update_data_from_server.bind(this);
      }

      client_update_data_from_server(type_data){
        if(type_data == 'all'){
          this.setState({
            users: this.download_data_from_server('users'),
            boards: this.download_data_from_server('boards'),
            doctors: this.download_data_from_server('doctors'),       
          });      
        } else if (type_data == 'boards'){
          this.setState({
            boards: this.download_data_from_server(type_data),
            user_list_boards: this.download_data_from_server(type_data),
          });  
        }  else if (type_data == 'users'){
          this.setState({
            users: this.download_data_from_server(type_data),    
          });  
        }  else if (type_data == 'doctors'){
          this.setState({
            doctors_from_boards: this.download_data_from_server(type_data),  
          });  
          console.log(this.download_data_from_server(type_data))
        }  
        else {
          console.log('Ничего не обновили');
        }

      }

      download_data_from_server(data_type){
        let xhr = new XMLHttpRequest();
        let url = server_url+'/read_'+data_type;
        xhr.open("GET",url,false); // Конфигурируем запрос
        xhr.send();
        return JSON.parse(xhr.response);
      }

      update_data_on_server(data_type,data){
        let xhr = new XMLHttpRequest();
        let url = server_url+'/rewrite_'+data_type;
        xhr.open("POST",url); // Конфигурируем запрос
        
        xhr.send(JSON.stringify(data));
        xhr.onload = () => {
          if (xhr.status !== 200){
            console.log('Ошибка сервера ' + xhr.status);
          } else {
            console.log(xhr.response);
          }
        };
      }

    async change_user_list_boards_after_autorization(id_user){
      let boards = this.state.boards;

      let id_user_list_boards = []

      for(let i=0; i < this.state.users.length; i++){
        if (this.state.users[i].id == id_user){
          id_user_list_boards = this.state.users[i].board_list;
        }
      }


      boards = boards.filter( board =>  id_user_list_boards.includes(board.id));

      await this.setState({
        user_list_boards: boards
      });
    }

    log_in(username, arm){
      this.setState({
        login: username,
        arm_admin_sys: arm
      });
    }

    log_out(){
      this.setState({
        login: false,
        arm_admin_sys: false,
        edit_doctor: false,
        edit_user: false,
        chousen_board: null,
        what_list_admin_system: 'users'
      });      
    }   
    
    start_edit_doctor(doctor){ 
      this.setState({
        edit_doctor: doctor
      });
    }

    // Запоминание, что редатирует админ системы: табло или пользователей
    async change_what_list_admin_system(value){
      await  this.setState({
          what_list_admin_system: value
        })
      }

    // РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ
    start_edit_user(user){ 
      this.setState({
        edit_user: user
      });
    }    

    // Сохранение пользователя
    async save_edit_user(user){
      let users = this.state.users
      if (user.id == 'new'){
        let max_id_user = 0;
        for (let i=0; i < users.length; i++){
          if (users[i].id > max_id_user) {
            max_id_user = users[i].id;
          }
        }
        user.id = max_id_user +1  ;
        users.push(user); 
      } else {
        for (let i=0; i < users.length; i++){
          if (users[i].id == user.id) {
            users[i] = user;
          }
        }
      }
      await this.setState({
        users: users
      });

      this.start_edit_user(false);

      this.update_data_on_server('users',this.state.users);
    }

    // Удаление пользователя
    async delete_user(id_user){
      let users = this.state.users;

      users = users.filter(user => user.id != id_user);

      await this.setState({
        users: users
      });

      this.update_data_on_server('users',this.state.users);
    }

    // РЕДАКТИРОВАНИЕ ИНФО О ТАБЛО
    start_edit_board(board){ 
      this.setState({
        edit_board_info: board
      });
    } 

    // СОХРАНЕНИЕ ТАБЛО
    async save_edit_board(board){
      let boards = this.state.boards
      if (board.id == 'new'){
        let max_id_user = 0;
        for (let i=0; i < boards.length; i++){
          if (boards[i].id >max_id_user){
            max_id_user = boards[i].id
          }
        }

        board.id = max_id_user +1;
        boards.push(board);
        // console.log('Сохранено НОВОЕ табло ' + max_id_user)

        let doctors = this.state.doctors_from_boards
        doctors[max_id_user +1] = []

        await this.setState({
          doctors_from_boards: doctors        
        });


      } else{
        for (let i=0; i < boards.length; i++){
          if (boards[i].id == board.id) {
            boards[i] = board;
          }
        }
      }

      await this.setState({
        edit_doctors_on_board: boards        
      });

      this.start_edit_board(false);

      this.update_data_on_server('boards',this.state.boards);
    }

// Удаление табло
    async delete_board(board_id){
      let boards = this.state.boards;
      boards = boards.filter(board => board.id != board_id); //удаление табло

      let doctors = this.state.doctors_from_boards // удаление расписания на табло
      doctors.splice(board_id,1);

      let users = this.state.users // удаление закрепленного табло у пользователей
      // users = users.filter(user => !user.board_list.includes(board_id))
      for(let i = 0; i < users.length; i++){
        users[i].board_list = users[i].board_list.filter(board_id => board_id != board_id);
        // users[i].board_list = users[i].board_list.filter(user => !user.board_list.includes(board_id))
      }

      await this.setState({
        boards: boards,
        doctors_from_boards: doctors,
        users: users
      });

      this.update_data_on_server('boards',this.state.boards);

    }

// Закрыть окно редактирования врача    
  close_edit_doctor(){
      this.setState({
        edit_doctor: false
      });
    }

  change_board(id_board){ // смена табло, при администрировании расписания
    this.setState({
      chousen_board: id_board,
      chousen_board_doctors: this.state.doctors_from_boards[id_board]
    })
  }

//---Создание нового врача
async create_new_doctor_on_board(name, lastname, surname, week, date_birthday, speciality, department, station, cabinet){
  let max_index = 0;
  let doctors_from_boards = this.state.doctors_from_boards;
  for (let i=0; i < doctors_from_boards.length; i++){
    for (let j=0; j < doctors_from_boards[i].length; j++){
      if (doctors_from_boards[i][j].id > max_index) {
        max_index = doctors_from_boards[i][j].id;
      }
    }
  }

  let new_doctor = {
    id: max_index + 1,
    order: doctors_from_boards[this.state.chousen_board].length + 1, //-----------------------------
    name: name,
    lastname: lastname,
    surname: surname,
    speciality: speciality,
    department: department,
    station: station, // Отделение
    cabinet: cabinet, // Кабинет
    date_birthday: date_birthday,
    week: week
  }

  let bufer_chosen_doctor_list = this.state.chousen_board_doctors;
  bufer_chosen_doctor_list.push(new_doctor);

  doctors_from_boards[this.state.chousen_board]=bufer_chosen_doctor_list;

  await this.setState({
    doctors_from_boards: doctors_from_boards        
  }); 

  // Проверка на совпадение
  // this.cheak_overlay_board();
  this.update_data_on_server('doctors',this.state.doctors_from_boards);
}

//---редактирование текущего врача

    async edit_doctors_on_board(id_doctor, name, lastname, surname, week, date_birthday, speciality, department, station, cabinet){

      let bufer_chosen_doctor_list = this.state.chousen_board_doctors;

      for (let i=0; i < bufer_chosen_doctor_list.length; i++){
        if (bufer_chosen_doctor_list[i].id == id_doctor){

          bufer_chosen_doctor_list[i].name = name;
          bufer_chosen_doctor_list[i].lastname = lastname;
          bufer_chosen_doctor_list[i].surname = surname;
          bufer_chosen_doctor_list[i].speciality = speciality;
          bufer_chosen_doctor_list[i].department = department;
          bufer_chosen_doctor_list[i].station = station; // Отделение
          bufer_chosen_doctor_list[i].cabinet = cabinet; // Кабинет
          bufer_chosen_doctor_list[i].date_birthday = date_birthday;
          bufer_chosen_doctor_list[i].week = week;

          break;
        }
        // console.log(i);
      }     

      let doctors_from_boards = this.state.doctors_from_boards;
      doctors_from_boards[this.state.chousen_board]=bufer_chosen_doctor_list;

      await this.setState({
        doctors_from_boards: doctors_from_boards        
      }); 

      this.update_data_on_server('doctors',this.state.doctors_from_boards);

      // this.cheak_overlay_board();
    }


//---удаление текущего врача

    async delete_doctor_on_board(id_doctor){
      console.log('Старт удаления доктора номер '+ String(id_doctor));

      let bufer_chosen_doctor_list = this.state.chousen_board_doctors;

      for (let i=0; i < bufer_chosen_doctor_list.length; i++){
        if (bufer_chosen_doctor_list[i].id == id_doctor){
          bufer_chosen_doctor_list.splice(i, 1); // тут происходит удаление
          break;
        }
        // console.log(i);
      }

      // пересчет порядка --------------------------------
      bufer_chosen_doctor_list = bufer_chosen_doctor_list.sort((a, b) => a.order > b.order ? 1 : -1);
      for (let i=0; i < bufer_chosen_doctor_list.length; i++){
        bufer_chosen_doctor_list[i].order = i+1;
      }

      let doctors_from_boards = this.state.doctors_from_boards;
      doctors_from_boards[this.state.chousen_board]=bufer_chosen_doctor_list;

      await this.setState({
        doctors_from_boards: doctors_from_boards        
      });     
      
      // this.cheak_overlay_board();
      this.update_data_on_server('doctors',this.state.doctors_from_boards);
    }

// --- Проверка врачей на пересечение
    cheak_overlay_board(){
      // кабинет и время
      let doctors_from_boards = this.state.doctors_from_boards;
      let error_overscale = [[],[],[],[]];
      // console.log(doctors_from_boards);

      for (let i=0; i < doctors_from_boards.length; i++){
        for (let j=0; j < doctors_from_boards[i].length; j++){
          for (let k=0; k < doctors_from_boards.length; k++){
            for (let l=j; l < doctors_from_boards[k].length; l++){
              // console.log(i,j,k,l);
              // console.log('кабинет ',doctors_from_boards[i][j].cabinet == doctors_from_boards[k][l].cabinet);
              // console.log('рабочие дни ',doctors_from_boards[i][j].cabinet == doctors_from_boards[k][l].cabinet && (doctors_from_boards[i][j].week[0].is_work_day && doctors_from_boards[k][l].week[0].is_work_day));

// проверка, совпадают ли кабинеты
              if ( (j!=l) && (doctors_from_boards[i][j].cabinet == doctors_from_boards[k][l].cabinet || (doctors_from_boards[i][j].surname == doctors_from_boards[k][l].surname && doctors_from_boards[i][j].name == doctors_from_boards[k][l].name && doctors_from_boards[i][j].lastname == doctors_from_boards[k][l].lastname && doctors_from_boards[i][j].date_birthday == doctors_from_boards[k][l].date_birthday)) && 
// 1 день недели
((
              (doctors_from_boards[i][j].week[0].is_work_day && doctors_from_boards[k][l].week[0].is_work_day)||

              (doctors_from_boards[i][j].week[0].start_work <=  doctors_from_boards[k][l].week[0].start_work &&
              doctors_from_boards[i][j].week[0].finish_work >= doctors_from_boards[k][l].week[0].start_work) ||
              (doctors_from_boards[k][l].week[0].start_work <=  doctors_from_boards[i][j].week[0].start_work &&
              doctors_from_boards[k][l].week[0].finish_work >= doctors_from_boards[i][j].week[0].start_work) &&

              (doctors_from_boards[i][j].week[0].finish_work >= doctors_from_boards[k][l].week[0].finish_work &&
              doctors_from_boards[i][j].week[0].start_work <=  doctors_from_boards[k][l].week[0].finish_work) ||
              (doctors_from_boards[k][l].week[0].finish_work >= doctors_from_boards[i][j].week[0].finish_work &&
              doctors_from_boards[k][l].week[0].start_work <=  doctors_from_boards[i][j].week[0].finish_work) &&

              (doctors_from_boards[i][j].week[0].start_work <=  doctors_from_boards[k][l].week[0].start_work &&
              doctors_from_boards[k][l].week[0].finish_work <= doctors_from_boards[i][j].week[0].finish_work) ||
              (doctors_from_boards[k][l].week[0].start_work <=  doctors_from_boards[i][j].week[0].start_work &&
              doctors_from_boards[i][j].week[0].finish_work <= doctors_from_boards[k][l].week[0].finish_work)
) ||
// 2 день недели
(
              (doctors_from_boards[i][j].week[1].is_work_day && doctors_from_boards[k][l].week[1].is_work_day) ||

              (doctors_from_boards[i][j].week[1].start_work <=  doctors_from_boards[k][l].week[1].start_work &&
              doctors_from_boards[i][j].week[1].finish_work >= doctors_from_boards[k][l].week[1].start_work) ||
              (doctors_from_boards[k][l].week[1].start_work <=  doctors_from_boards[i][j].week[1].start_work &&
              doctors_from_boards[k][l].week[1].finish_work >= doctors_from_boards[i][j].week[1].start_work) &&

              (doctors_from_boards[i][j].week[1].finish_work >= doctors_from_boards[k][l].week[1].finish_work &&
              doctors_from_boards[i][j].week[1].start_work <=  doctors_from_boards[k][l].week[1].finish_work) ||
              (doctors_from_boards[k][l].week[1].finish_work >= doctors_from_boards[i][j].week[1].finish_work &&
              doctors_from_boards[k][l].week[1].start_work <=  doctors_from_boards[i][j].week[1].finish_work) &&

              (doctors_from_boards[i][j].week[1].start_work <=  doctors_from_boards[k][l].week[1].start_work &&
              doctors_from_boards[k][l].week[1].finish_work <= doctors_from_boards[i][j].week[1].finish_work) ||
              (doctors_from_boards[k][l].week[1].start_work <=  doctors_from_boards[i][j].week[1].start_work &&
              doctors_from_boards[i][j].week[1].finish_work <= doctors_from_boards[k][l].week[1].finish_work)
) ||
// 3 день недели
(
              (doctors_from_boards[i][j].week[2].is_work_day && doctors_from_boards[k][l].week[2].is_work_day)||

              (doctors_from_boards[i][j].week[2].start_work <=  doctors_from_boards[k][l].week[2].start_work &&
              doctors_from_boards[i][j].week[2].finish_work >= doctors_from_boards[k][l].week[2].start_work) ||
              (doctors_from_boards[k][l].week[2].start_work <=  doctors_from_boards[i][j].week[2].start_work &&
              doctors_from_boards[k][l].week[2].finish_work >= doctors_from_boards[i][j].week[2].start_work) &&

              (doctors_from_boards[i][j].week[2].finish_work >= doctors_from_boards[k][l].week[2].finish_work &&
              doctors_from_boards[i][j].week[2].start_work <=  doctors_from_boards[k][l].week[2].finish_work) ||
              (doctors_from_boards[k][l].week[2].finish_work >= doctors_from_boards[i][j].week[2].finish_work &&
              doctors_from_boards[k][l].week[2].start_work <=  doctors_from_boards[i][j].week[2].finish_work) &&

              (doctors_from_boards[i][j].week[2].start_work <=  doctors_from_boards[k][l].week[2].start_work &&
              doctors_from_boards[k][l].week[2].finish_work <= doctors_from_boards[i][j].week[2].finish_work) ||
              (doctors_from_boards[k][l].week[2].start_work <=  doctors_from_boards[i][j].week[2].start_work &&
              doctors_from_boards[i][j].week[2].finish_work <= doctors_from_boards[k][l].week[2].finish_work)
) ||
// 4 день недели
(
              (doctors_from_boards[i][j].week[3].is_work_day && doctors_from_boards[k][l].week[3].is_work_day)||

              (doctors_from_boards[i][j].week[3].start_work <=  doctors_from_boards[k][l].week[3].start_work &&
              doctors_from_boards[i][j].week[3].finish_work >= doctors_from_boards[k][l].week[3].start_work) ||
              (doctors_from_boards[k][l].week[3].start_work <=  doctors_from_boards[i][j].week[3].start_work &&
              doctors_from_boards[k][l].week[3].finish_work >= doctors_from_boards[i][j].week[3].start_work) &&

              (doctors_from_boards[i][j].week[3].finish_work >= doctors_from_boards[k][l].week[3].finish_work &&
              doctors_from_boards[i][j].week[3].start_work <=  doctors_from_boards[k][l].week[3].finish_work) ||
              (doctors_from_boards[k][l].week[4].finish_work >= doctors_from_boards[i][j].week[3].finish_work &&
              doctors_from_boards[k][l].week[3].start_work <=  doctors_from_boards[i][j].week[3].finish_work) &&

              (doctors_from_boards[i][j].week[3].start_work <=  doctors_from_boards[k][l].week[3].start_work &&
              doctors_from_boards[k][l].week[3].finish_work <= doctors_from_boards[i][j].week[3].finish_work) ||
              (doctors_from_boards[k][l].week[3].start_work <=  doctors_from_boards[i][j].week[3].start_work &&
              doctors_from_boards[i][j].week[3].finish_work <= doctors_from_boards[k][l].week[3].finish_work)
)    ||           
// 5 день недели
(
              (doctors_from_boards[i][j].week[4].is_work_day && doctors_from_boards[k][l].week[4].is_work_day)||

              (doctors_from_boards[i][j].week[4].start_work <=  doctors_from_boards[k][l].week[4].start_work &&
              doctors_from_boards[i][j].week[4].finish_work >= doctors_from_boards[k][l].week[4].start_work) ||
              (doctors_from_boards[k][l].week[4].start_work <=  doctors_from_boards[i][j].week[4].start_work &&
              doctors_from_boards[k][l].week[4].finish_work >= doctors_from_boards[i][j].week[4].start_work) &&

              (doctors_from_boards[i][j].week[4].finish_work >= doctors_from_boards[k][l].week[4].finish_work &&
              doctors_from_boards[i][j].week[4].start_work <=  doctors_from_boards[k][l].week[4].finish_work) ||
              (doctors_from_boards[k][l].week[4].finish_work >= doctors_from_boards[i][j].week[4].finish_work &&
              doctors_from_boards[k][l].week[4].start_work <=  doctors_from_boards[i][j].week[4].finish_work) &&

              (doctors_from_boards[i][j].week[4].start_work <=  doctors_from_boards[k][l].week[4].start_work &&
              doctors_from_boards[k][l].week[4].finish_work <= doctors_from_boards[i][j].week[4].finish_work) ||
              (doctors_from_boards[k][l].week[4].start_work <=  doctors_from_boards[i][j].week[4].start_work &&
              doctors_from_boards[i][j].week[4].finish_work <= doctors_from_boards[k][l].week[4].finish_work)       
))


              ){
                // console.log('Наложение расписания в '+i+1+' и '+k+1+' табло. Пересечения расписания у врача '+j+' и '+l+'('+doctors_from_boards[i][j].surname+' и '+doctors_from_boards[k][l].surname+')');
                error_overscale[i].push(j);
                error_overscale[k].push(l);
                // console.log(error_overscale);
              }
            }
          }
        }
      }

      this.setState({
        error_overlay: error_overscale
      })

    }

// --- смена порядка врачей при drag'n'drop
    change_order_doctor(geted_doctor,under_doctor){

      let all_doctors = this.state.doctors_from_boards;
      let chousen_board = this.state.chousen_board;
 
      let doctors_on_chosen_board = all_doctors[chousen_board];

      if (geted_doctor != under_doctor){
        if (under_doctor.order < geted_doctor.order)
        {
          doctors_on_chosen_board = doctors_on_chosen_board.map(doctor => {
            if (doctor.order === geted_doctor.order){
              return {...doctor, order: under_doctor.order};
            }
            if (under_doctor.order <= doctor.order && geted_doctor.order > doctor.order){
              return {...doctor, order: doctor.order+1};
            }
            return doctor;
          });
        } else{
          doctors_on_chosen_board = doctors_on_chosen_board.map(doctor => {
            if (doctor.order === geted_doctor.order){
              return {...doctor, order: under_doctor.order};
            }
            if (under_doctor.order >= doctor.order && geted_doctor.order < doctor.order){
              return {...doctor, order: doctor.order-1};
            }
            return doctor;
          });
        }
      }

      all_doctors[chousen_board] = doctors_on_chosen_board;

      this.setState({
        doctors_from_boards: null
      })

      this.setState({
        doctors_from_boards: all_doctors
      })

      this.update_data_on_server('doctors',this.state.doctors_from_boards);
    }


    render(){
      let app = <div> Ошибка </div>; 

      let name_board = String(window.location);
      name_board = name_board.substring(name_board.lastIndexOf('/')+1,name_board.length);

      if (!this.state.login){ // Если не Залогинился:
        if (name_board == ''){  // Если нет маршрута, То Авторизация
          app = <Autorization log_in={this.log_in} users={this.state.users} change_user_list_boards_after_autorization={this.change_user_list_boards_after_autorization}/> ;          
        } else{ // Если есть маршрут, То показ расписания
          app = <ShowBoard link_board={name_board} boards={this.state.boards} doctors={this.state.doctors_from_boards} client_update_data_from_server={this.client_update_data_from_server}  create_new_doctor_on_board={/* НАДО УДАЛИТЬ БУДЕТ => */this.create_new_doctor_on_board}/>;
        }
      } else // После авторизации:
        if(this.state.arm_admin_sys) { // Если админ системы, То показать АРМ админа системы
          if(this.state.edit_user != false || String(this.state.edit_user) == '0'){ // Если редактиуем пользователя
            app = <EditUser username={this.state.login} log_out={this.log_out} finish_edit_user={this.start_edit_user} users={this.state.users} id_user={this.state.edit_user} boards={this.state.boards} save_edit_user={this.save_edit_user}/>
          } else
          if(this.state.edit_board_info || String(this.state.edit_board_info) == '0'){ // Если редактиуем табло
            app = <EditBoardInfo username={this.state.login} log_out={this.log_out} boards={this.state.boards} id_board={this.state.edit_board_info} finish_edit_board={this.start_edit_board} save_edit_board={this.save_edit_board}/>
          } else
          app = <ArmAdminSystem username={this.state.login} log_out={this.log_out} users={this.state.users} start_edit_user={this.start_edit_user} boards={this.state.boards} start_edit_board={this.start_edit_board} what_list_admin_system={this.state.what_list_admin_system} change_what_list_admin_system={this.change_what_list_admin_system} delete_user={this.delete_user} delete_board={this.delete_board}/> ;
        } else { // Если админ табло, То:
          if (this.state.edit_doctor){ // Если правим доктора, То Правим дотора
            app = <EditDoctor create_new_doctor_on_board={this.create_new_doctor_on_board} edit_doctors_on_board={this.edit_doctors_on_board} username={this.state.login} edit_doctor={this.state.edit_doctor} close_edit_doctor={this.close_edit_doctor} log_out={this.log_out}/>
          } else { // Если не правим доктора, то показать АРМ админа расписания
            app = <ArmBoarsdAdmin  error_overlay={this.state.error_overlay} delete_doctor_on_board={this.delete_doctor_on_board} username={this.state.login} user_list_boards={this.state.user_list_boards} doctors_from_boards={this.state.chousen_board_doctors} log_out={this.log_out} start_edit_doctor={this.start_edit_doctor} chousen_board={this.state.chousen_board} change_board={this.change_board} change_order_doctor={this.change_order_doctor}/> ;
          }
        }

      // app = <EditUser/>
      // app = <EditBoardInfo/>
        
      return(
          app
          // <ModalMessage/>
      ) 
    }
  }