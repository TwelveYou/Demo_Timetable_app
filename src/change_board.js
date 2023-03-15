import React from 'react';
import './styles/change_board.css'

// Список врачей

export default class ChangeBoard extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      taken_doctor: 'хуй'
    };

    this.work_day_time = this.work_day_time.bind(this); 

    this.dragStartHandler = this.dragStartHandler.bind(this); // При зажатии кнопки на объекте
    this.dragEndHandler = this.dragEndHandler.bind(this); // При покидании с другого объекта
    this.dragOverHandler = this.dragOverHandler.bind(this); // При нахождении над другим объектом
    this.dropHandler = this.dropHandler.bind(this); // При отпускании кнопки

    this.take_doctor = this.take_doctor.bind(this);
    // this.change_order_doctor = this.change_order_doctor.bind(this);
  }

  take_doctor(doctor){
    this.setState({
      taken_doctor: doctor
    })
  }

  work_day_time(is_work,start,finish){
    if (is_work){
      return String(start+' - '+finish);
    } else {
      return 'приема нет';
    }
  }

  // Функции для DnD_______________________________________________________________
  async dragStartHandler(doctor){
    await this.take_doctor(doctor);    

    document.getElementById('doctor'+doctor.id).style.backgroundColor = 'orange';
    document.getElementById('doctor'+doctor.id).style.color = 'black';   
  }

  dragEndHandler(event){
    
    // event.target.className = 'change-board-doctor';
    if (document.getElementById('doctor'+event.target.id) != null && event.target.id != this.state.taken_doctor.id){
      // document.getElementById('doctor'+event.target.id).className = 'change-board-doctor';
      document.getElementById('doctor'+event.target.id).style.backgroundColor = null;
      document.getElementById('doctor'+event.target.id).style.color = null;   
    }
    
  }

  dragOverHandler(event){
    event.preventDefault();

    // document.getElementById('doctor'+event.target.id).className = 'change-board-doctor__when_dnd_under';
    if (event.target.id != this.state.taken_doctor.id){
      document.getElementById('doctor'+event.target.id).style.backgroundColor = 'white';
      document.getElementById('doctor'+event.target.id).style.color = 'black'; 
    }
   


  }

  async dropHandler(event, under_doctor){
    event.preventDefault();

    // document.getElementById('doctor'+event.target.id).className = 'change-board-doctor';
    document.getElementById('doctor'+event.target.id).style.backgroundColor = null;
    document.getElementById('doctor'+event.target.id).style.color = null;      
    document.getElementById('doctor'+this.state.taken_doctor.id).style.backgroundColor = null;
    document.getElementById('doctor'+this.state.taken_doctor.id).style.color = null;  


    this.props.change_order_doctor(this.state.taken_doctor, under_doctor)

    await this.take_doctor(null);

// Попробовать убрать текущую доску и вернуть её обратно
    let buffer_chousen_board = this.props.chousen_board;
    this.props.change_board(buffer_chousen_board);
  }
// _____________________________________________________________________________

    render(){
      let doctors_list = <p className="changing-board-table big_size">У вас нет подконтрольных табло</p>;

      if (this.props.user_list_boards.length > 0){
        if (this.props.doctors_from_boards.length > 0) {
          doctors_list = 
          <table className="changing-board-table">
            <tbody>      
              <HeadingTable/>   
              <Department id_board={this.props.id_board}/>
              {this.props.doctors_from_boards.sort((a, b) => a.order > b.order ? 1 : -1).map((doc, id) => 
                  (

                    <tr className={"change-board-doctor change-board-doctor"+doc.id}

                        key={doc.id} 
                        id={'doctor'+doc.id}

                        draggable = {true}
          
                        onDragStart={() =>  this.dragStartHandler(doc) } // Взяли объект
                        onDragLeave={(event) =>  this.dragEndHandler(event)}  // Вышли за пределы любой карточки
                        onDragEnd={(event) =>  this.dragEndHandler(event)}  // Отпустили перемещение
                        onDragOver={(event) =>  this.dragOverHandler(event)}  // Находимся над другим объектом
                        onDrop={(event) =>  this.dropHandler(event, doc)}   // Отпустили карточку   
                    >
                      <th id={doc.id}> 
                        <div id={doc.id} className="change-board-doctor__doctor">
                          <div id={doc.id} className="change-board-doctor__doctor-buttons">
                            
                            {/* Кнопка для Drag'n'Drop */}
                            {/* <img draggable={true} className="change-board-doctor__doctor-buttons-dragndrop" src="./res/drag_icon.svg" alt="drag'n'drop" height="30px"/> */}
          
                            <img id={doc.id} className="change-board-doctor__doctor-buttons-edit" src="./res/edit_icon.svg" alt="drag'n'drop" height="30px" onClick={() => this.props.start_edit_doctor(doc)}/>  
                            <img id={doc.id} className="change-board-doctor__doctor-buttons-edit" src="./res/delete_icon.svg" alt="drag'n'drop" height="30px" onClick={() => {this.props.delete_doctor(doc.id);} }/>
                          </div>
                          <div id={doc.id} className="change-board-doctor__doctor-info">
                          <div id={doc.id} className="change-board-doctor__doctor-info-name">{doc.surname+' '+doc.name[0]+'. '+doc.lastname[0]+'.'}</div>
                            <div id={doc.id} className="change-board-doctor__doctor-info-speciality">{doc.speciality}</div>
                          </div>
                        </div >
                      </th >
                        <th id={doc.id} className="change-board-doctor__station"> <span id={doc.id} className="board-doctor__station-symbol">№ </span>{doc.station}</th>        
                        <th id={doc.id} className="change-board-doctor__cabinet">{doc.cabinet}</th>
                        <th id={doc.id} className="change-board-doctor__day-of-week"> {this.work_day_time(doc.week[0].is_work_day,doc.week[0].start_work,doc.week[0].finish_work)} </th>
                        <th id={doc.id} className="change-board-doctor__day-of-week"> {this.work_day_time(doc.week[1].is_work_day,doc.week[1].start_work,doc.week[1].finish_work)} </th>
                        <th id={doc.id} className="change-board-doctor__day-of-week"> {this.work_day_time(doc.week[2].is_work_day,doc.week[2].start_work,doc.week[2].finish_work)} </th>
                        <th id={doc.id} className="change-board-doctor__day-of-week"> {this.work_day_time(doc.week[3].is_work_day,doc.week[3].start_work,doc.week[3].finish_work)} </th>
                        <th id={doc.id} className="change-board-doctor__day-of-week"> {this.work_day_time(doc.week[4].is_work_day,doc.week[4].start_work,doc.week[4].finish_work)} </th>
                    </tr>                 
                  
                  
                    )
              )} 
              <AddRecord start_edit_doctor={this.props.start_edit_doctor}/>
            </tbody>              
          </table>;   
        } else {
          doctors_list = 
            <table className="changing-board-table">
              <tbody>     
                <tr className="change-board__no-doctors">
                  <th colSpan="8" className='change-board__no-doctors-table'>
                  <p className="changing-board-table big_size">На данном табло нет врачей</p>
                  </th>
                </tr>
                <AddRecord start_edit_doctor={this.props.start_edit_doctor}/>
              </tbody>              
            </table>; 
        }  
      }

      return(
        <div className="changing-board">
          {doctors_list}
        </div>
      )
    }
  }
  
  // =================================================
  
  class HeadingTable extends React.Component{
    render(){
      return(
        <tr className="change-board-heading">
          <th className="change-board-heading__doctor-info">Специалист</th>
          <th className="change-board-heading__station">Участок</th>          
          <th className="change-board-heading__cabinet">Кабинет</th>
          <th className="change-board-heading__workday">Пн</th>
          <th className="change-board-heading__workday">Вт</th>
          <th className="change-board-heading__workday">Ср</th>
          <th className="change-board-heading__workday">Чт</th>
          <th className="change-board-heading__workday">Пт</th>
        </tr>      
      )
    }
  }
  
  
  class Department extends React.Component{
    render(){
      return(
        <tr className="change-board-department">
          <th colSpan="8">Терапевтическое отделение №{this.props.id_board+1}</th>
        </tr>
      )
    }
  }
  
  class Doctor extends React.Component{
    constructor(props) {
      super(props);
      this.work_day_time = this.work_day_time.bind(this); 
    }

  work_day_time(is_work,start,finish){
    if (is_work){
      return String(start+' - '+finish);
    } else {
      return 'приема нет';
    }
  }

    render(){
      // id_ar_doc
      // error_overlay

      let class_name = "change-board-doctor";
      // if (this.props.error_overlay.includes(this.props.id_ar_doc)){
      //   class_name += " change-board-doctor_error_overscale";
      // }

      return(
          <tr className={class_name}

              draggable = {true}

              onDragStart={() =>  {this.props.dragStartHandler(this.props.doctor);} } // Взяли объект
              onDragLeave={(event) =>  this.props.dragEndHandler(event)}  // Вышли за пределы любой карточки
              onDragEnd={(event) =>  this.props.dragEndHandler(event)}  // Отпустили перемещение
              onDragOver={(event) =>  this.props.dragOverHandler(event)}  // Находимся над другим объектом
              onDrop={(event) =>  this.props.dropHandler(event, this.props.doctor)}   // Отпустили карточку   
          >
            <th> 
              <div className="change-board-doctor__doctor">
                <div className="change-board-doctor__doctor-buttons">
                  
                  {/* Кнопка для Drag'n'Drop */}
                  {/* <img draggable={true} className="change-board-doctor__doctor-buttons-dragndrop" src="./res/drag_icon.svg" alt="drag'n'drop" height="30px"/> */}

                  <img className="change-board-doctor__doctor-buttons-edit" src="./res/edit_icon.svg" alt="drag'n'drop" height="30px" onClick={() => this.props.start_edit_doctor(this.props.doctor)}/>  
                  <img className="change-board-doctor__doctor-buttons-edit" src="./res/delete_icon.svg" alt="drag'n'drop" height="30px" onClick={() => {this.props.delete_doctor(this.props.doctor.id);} }/>
                </div>
                <div className="change-board-doctor__doctor-info">
                <div className="change-board-doctor__doctor-info-name">{this.props.doctor.surname+' '+this.props.doctor.name[0]+'. '+this.props.doctor.lastname[0]+'.'}</div>
                  {/* <div className="change-board-doctor__doctor-info-name">{this.props.doctor.name}</div> */}
                  <div className="change-board-doctor__doctor-info-speciality">{this.props.doctor.speciality}</div>
                </div>
              </div>
            </th>
              <th className="change-board-doctor__station"> <span className="board-doctor__station-symbol">№ </span>{this.props.doctor.station}</th>        
              <th className="change-board-doctor__cabinet">{this.props.doctor.cabinet}</th>
              <th className="change-board-doctor__day-of-week"> {this.work_day_time(this.props.doctor.week[0].is_work_day,this.props.doctor.week[0].start_work,this.props.doctor.week[0].finish_work)} </th>
              <th className="change-board-doctor__day-of-week"> {this.work_day_time(this.props.doctor.week[1].is_work_day,this.props.doctor.week[1].start_work,this.props.doctor.week[1].finish_work)} </th>
              <th className="change-board-doctor__day-of-week"> {this.work_day_time(this.props.doctor.week[2].is_work_day,this.props.doctor.week[2].start_work,this.props.doctor.week[2].finish_work)} </th>
              <th className="change-board-doctor__day-of-week"> {this.work_day_time(this.props.doctor.week[3].is_work_day,this.props.doctor.week[3].start_work,this.props.doctor.week[3].finish_work)} </th>
              <th className="change-board-doctor__day-of-week"> {this.work_day_time(this.props.doctor.week[4].is_work_day,this.props.doctor.week[4].start_work,this.props.doctor.week[4].finish_work)} </th>
          </tr>
      )
    }
  }

  class AddRecord extends React.Component{

    render(){
      return(
        <tr className="change-board__add-record" onClick={() => this.props.start_edit_doctor(['new'])}>
          <th colSpan="8" className='change-board__add-record-table'>
            <p className="change-board__add-record-button">
              +
            </p>
          </th>
        </tr>
      )
    }   
  }

