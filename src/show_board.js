import React from 'react';
import './styles/show_board.css'
// =================================================

export default class Board extends React.Component{

  componentDidMount(){
    this.timerID = setInterval(
      async () => {
          await this.props.client_update_data_from_server('doctors');  //client_update_data_from_server('doctors')


          // console.log(this.props.doctors); 
          console.log('___________'); 

          console.log(this.props.doctors);  
          // location.reload();
          // await this.update_doctors();
          // console.log(this.props.doctors)
      }, 
      5000 // раз в 5 секунд обновляться
    );
  }

  componentWillUnmount(){
    clearInterval(this.timesID);
  }

  constructor(props) {
    super(props);

    // this.state = {
    //   doctors: this.props.doctors
    // };

    this.made_time_for_timetable_for_day = this.made_time_for_timetable_for_day.bind(this);
    // this.update_doctors = this.update_doctors.bind(this);    
  }

  made_time_for_timetable_for_day(day_of_week){

    let string_time_day = 'приема нет'

    if(day_of_week.is_work_day){
      string_time_day = day_of_week.start_work + ' - '+ day_of_week.finish_work;
    }

    return string_time_day
  }

  // update_doctors(){
  //   this.setState = {
  //     doctors: this.props.doctors
  //   };
  // }



  render(){
    // let id_board = 'no_baord';

    // for(let i=0; i<this.props.boards.length ; i++){
    //   if (this.props.boards[i].link_board == this.props.link_board){
    //     id_board = this.props.boards[i].id;
    //   }
    // }

    // //this.state.doctors_by_link
    // let show_board = <div className='board-window'><p className='board-window__message'>По данной ссылке нет расписания</p></div>;
    // let doctors = false;
    // if (id_board != 'no_baord'){
    //   doctors = this.state.doctors_by_link  [id_board];
    //   show_board = 
    //   <table className="board">
    //     <tbody className="board__show-board">
    //       <HeadingTable/>
    //       <Department/>
    //       {doctors.sort((a, b) => a.order > b.order ? 1 : -1).map((doc, id) => (<Doctor key={id} doctor={doc} made_time_for_timetable_for_day={this.made_time_for_timetable_for_day}/>))} 
    //     </tbody>
    //   </table>;
    // } 

    return(
      <ShowDoctorsOnBoard boards={this.props.boards} doctors={this.props.doctors} link_board={this.props.link_board} made_time_for_timetable_for_day={this.made_time_for_timetable_for_day} />
    )
  }
}

class ShowDoctorsOnBoard extends React.Component{
  render(){
    let id_board = 'no_baord';
    for(let i=0; i < this.props.boards.length; i++){
      if (this.props.boards[i].link_board == this.props.link_board){
        id_board = this.props.boards[i].id;
      }
    }

    // console.log(this.props.id_board);

    let show_board = <div className='board-window'><p className='board-window__message'>По данной ссылке нет расписания</p></div>;
    let doctors = false;
    if (id_board != 'no_baord'){
      doctors = this.props.doctors[id_board];
      show_board = 
      <table className="board">
        <tbody className="board__show-board">
          <HeadingTable/>
          <Department/>
          {doctors.sort((a, b) => a.order > b.order ? 1 : -1).map((doc, id) => (<Doctor key={id} doctor={doc} made_time_for_timetable_for_day={this.props.made_time_for_timetable_for_day}/>))} 
        </tbody>
      </table>;

    } 
    return(
      show_board
    )
  }
}

// =================================================
class Doctor extends React.Component{
  render(){
    return(
      <tr className="board-doctor">
        <th className="board-doctor__doctor-info"> 
          <div className="board-doctor__doctor-info-name">{this.props.doctor.surname + ' '+ this.props.doctor.name[0]+ '.'+this.props.doctor.lastname[0]+ '.'}</div>
          <div className="board-doctor__doctor-info-speciality">{this.props.doctor.speciality}</div>
        </th>
        <th className="board-doctor__station"> <span className="board-doctor__station-symbol">№ </span>{this.props.doctor.station}</th>        
        <th className="board-doctor__cabinet">{this.props.doctor.cabinet}</th>
        <th className="board-doctor__day-of-week">{this.props.made_time_for_timetable_for_day(this.props.doctor.week[0])}</th>
        <th className="board-doctor__day-of-week">{this.props.made_time_for_timetable_for_day(this.props.doctor.week[1])}</th>
        <th className="board-doctor__day-of-week">{this.props.made_time_for_timetable_for_day(this.props.doctor.week[2])}</th>
        <th className="board-doctor__day-of-week">{this.props.made_time_for_timetable_for_day(this.props.doctor.week[3])}</th>
        <th className="board-doctor__day-of-week">{this.props.made_time_for_timetable_for_day(this.props.doctor.week[4])}</th>
      </tr>
    )
  }
}


class HeadingTable extends React.Component{
  render(){
    return(
      <tr className="board-heading">
        <th className="board-heading__doctor-info">Специалист</th>
        <th className="board-heading__station">Участок</th>          
        <th className="board-heading__cabinet">Кабинет</th>
        <th className="board-heading__monday">Пн</th>
        <th className="board-heading__tuesday">Вт</th>
        <th className="board-heading__wednesday">Ср</th>
        <th className="board-heading__thursday">Чт</th>
        <th className="board-heading__friday">Пт</th>
      </tr>
    )
  }
}

class Department extends React.Component{
  render(){
    return(
      <tr className="board-department">
        <th colSpan="8">Терапевтическое отделение №1</th>
      </tr>
    )
  }
}

