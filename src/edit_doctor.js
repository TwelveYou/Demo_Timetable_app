// import { render } from '@testing-library/react';
import React from 'react';
import HeaderApp from './header_app'; 
import ModalMessage from './modal_message';

import './styles/edit_doctor.css'

    // Редактирование врача = this.props.edit_doctor != 'new' 
    // Создание расписания для нового врача

let cabinets = ['101',	'201',	'301',	'401', '102',	'202',	'302',	'402', '103',	'203',	'303',	'403', '104',	'204',	'304',	'404', '105',	'205',	'305',	'405', '106',	'206',	'306',	'406', '107',	'207',	'307',	'407', '108',	'208',	'308',	'408', '109',	'209',	'309',	'409', '110',	'210',	'310',	'410', '111',	'211',	'311',	'411', '112',	'212',	'312',	'412', '113',	'213',	'313',	'413', '114',	'214',	'314',	'414', '115',	'215',	'315',	'415', '116',	'216',	'316',	'416', '117',	'217',	'317',	'417', '118',	'218',	'318',	'418', '119',	'219',	'319',	'419', '120',	'220',	'320',	'420', '121',	'221',	'321',	'421', '122',	'222',	'322',	'422', '123',	'223',	'323',	'423', '124',	'224',	'324',	'424', '125',	'225',	'325',	'425', '126',	'226',	'326',	'426', '127',	'227',	'327',	'427', '128',	'228',	'328',	'428', '129',	'229',	'329',	'429', '130',	'230',	'330',	'430', '131',	'231',	'331',	'431', '132',	'232',	'332',	'432', '133',	'233',	'333',	'433', '134',	'234',	'334',	'434', '135',	'235',	'335',	'435', '136',	'236',	'336',	'436', '137',	'237',	'337',	'437', '138',	'238',	'338',	'438', '139',	'239',	'339',	'439',  '140',	'240',	'340',	'440', '141',	'241',	'341',	'441', '142',	'242',	'342',	'442', '143',	'243',	'343',	'443', '144',	'244',	'344',	'444', '145',	'245',	'345',	'445', '146',	'246',	'346',	'446', '147',	'247',	'347',	'447', '148',	'248',	'348',	'448', '149',	'249',	'349',	'449', '150',	'250',	'350',	'450'];
let stations = ['1',	'2',	'3',	'4',	'5',	'6',	'7',	'8',	'9',	'10',	'11',	'12',	'13',	'14',	'15',	'16',	'17',	'18',	'19',	'20',	'21',	'22',	'23',	'24',	'25',	'26',	'27',	'28',	'29',	'30',	'31',	'32',	'33',	'34',	'35',	'36',	'37',	'38',	'39',	'40',	'41',	'42',	'43',	'44',	'45',	'46',	'47',	'48',	'49',	'50',	'51',	'52',	'53',	'54',	'55',	'56',	'57',	'58',	'59',	'60',	'61',	'62',	'63',	'64',	'65',	'66',	'67',	'68',	'69',	'70',	'71',	'72',	'73',	'74',	'75',	'76',	'77',	'78',	'79',	'80',	'81',	'82',	'83',	'84',	'85'];
let departments = ['Терапевтическое отделение №1','Терапевтическое отделение №2','Терапевтическое отделение №3','Терапевтическое отделение №4'];
let times = ['8:00',	'9:00',	'10:00',	'11:00',	'12:00',	'13:00',	'14:00',	'15:00',	'16:00',	'17:00',	'18:00',
'8:15',	'9:15',	'10:15',	'11:15',	'12:15',	'13:15',	'14:15',	'15:15',	'16:15',	'17:15',	
'8:30',	'9:30',	'10:30',	'11:30',	'12:30',	'13:30',	'14:30',	'15:30',	'16:30',	'17:30',	
'8:45',	'9:45',	'10:45',	'11:45',	'12:45',	'13:45',	'14:45',	'15:45',	'16:45',	'17:45'];
let names = ["Алла","Валентина","Мария","Ольга","Светлана",'Филипп',	'Евгений',	'Эдуард',	'Анатолий',	'Борис',	'Руслан',	'Кирилл',	'Олег',	'Даниил',	'Владимир',	'Дарья',	'Валерия',	'Екатерина',	'Варвара',	'Татьяна',	'Маргарита',	'Алина'];
let surnames = ["Осташкова","Бойс","Осипова","Щукова","Гуркова",'Легойда',	'Яковенко',	'Гамула',	'Иванив',	'Игнатьев',	'Волков',	'Аксёнов',	'Щукин',	'Ширяев',	'Веселов',	'Масловская',	'Кошелева',	'Кузнецова',	'Шубина',	'Ялова',	'Фролова',	'Третьякова'];
let lastnames = ["Борисовна","Сергеевна","Александровна",'Викторович',	'Сергеевич',	'Станиславович',	'Борисович',	'Петрович',	'Вадимович',	'Виталиевич',	'Данилович',	'Васильевна',	'Станиславовна',	'Вадимовна',	'Алексеевна',	'Андреевна',	'Викторовна'];


// =================================================

export default class EditDoctor extends React.Component{
  constructor(props) {
    
    super(props);
    let doctor = {
        id: 'new',
        order: 'new',
        name:"",
        lastname:"",
        surname:"",
        speciality:"",
        department: '',
        station: '', // Отделение
        cabinet: '', // Кабинет
        date_birthday: '',
        week:[// для недели нужен либо новый запрос, либо пересобрать объект доктора в change_board
          {start_work:"", finish_work:"", is_work_day: true},
          {start_work:"", finish_work:"", is_work_day: true},
          {start_work:"", finish_work:"", is_work_day: true},
          {start_work:"", finish_work:"", is_work_day: true},
          {start_work:"", finish_work:"", is_work_day: true}
        ]
    }
    if (this.props.edit_doctor != 'new'){ // если не новое
      doctor = 
      {
        id: this.props.edit_doctor.id,
        order: this.props.edit_doctor.order,
        name:this.props.edit_doctor.name,
        lastname:this.props.edit_doctor.lastname,
        surname:this.props.edit_doctor.surname,
        week:this.props.edit_doctor.week,        
        date_birthday: this.props.edit_doctor.date_birthday,
        speciality:this.props.edit_doctor.speciality,
        department:this.props.edit_doctor.department, // Отделение (выбор из списка или ввод нового)
        station:this.props.edit_doctor.station, // Участок (выбор из списка или ввод нового)
        cabinet:this.props.edit_doctor.cabinet
      };
    }

    this.state = {
        id: doctor.id, // id в Базе, или 'new' - новый
        order: doctor.order,
        name:doctor.name,
        lastname:doctor.lastname,
        surname:doctor.surname,
        week:doctor.week,        
        date_birthday: doctor.date_birthday,
        speciality:doctor.speciality,
        department:doctor.department, // Отделение (выбор из списка или ввод нового)
        station:doctor.station, // Участок (выбор из списка или ввод нового)
        cabinet:doctor.cabinet, // Кабинет (выбор из списка или ввод нового)???

        flag_changing_doctor: false //

    };  

    this.change_name = this.change_name.bind(this); 
    this.change_lastname = this.change_lastname.bind(this); 
    this.change_surname = this.change_surname.bind(this); 

    this.change_week = this.change_week.bind(this);

    this.change_birthday = this.change_birthday.bind(this);   
    this.change_speciality = this.change_speciality.bind(this); 

    this.change_cabinet = this.change_cabinet.bind(this);     
    this.change_station = this.change_station.bind(this); 
    this.change_department = this.change_department.bind(this); 

    // this.collect_doctor_info = this.collect_doctor_info.bind(this); 

    this.show_modal = this.show_modal.bind(this);  
    this.hide_modal = this.hide_modal.bind(this); 

  }

  change_name(event){
    let target = event.target;
    let value = target.value;    
    this.setState({
      name: value,
      flag_changing_doctor: true
    })
  }

  change_lastname(event){
    let target = event.target;
    let value = target.value;
    this.setState({
      lastname: value,
      flag_changing_doctor: true
    })
  }

  change_surname(event){
    let target = event.target;
    let value = target.value;
    this.setState({
      surname: value,
      flag_changing_doctor: true
    })
  }

  change_week(week){
    this.setState({
      week: week,
      flag_changing_doctor: true
    })
  }

  change_birthday(event){
    let target = event.target;
    let value = target.value;
    this.setState({
      date_birthday: value,
      flag_changing_doctor: true
    })
  }

  change_speciality(event){
    let target = event.target;
    let value = target.value;
    this.setState({
      speciality: value,
      flag_changing_doctor: true
    })
  }

  change_cabinet(event){ // кабинет change_cabinet
    let target = event.target;
    let value = target.value;
    this.setState({
      cabinet: value,
      flag_changing_doctor: true
    })
  }

  change_station(event){ // кабинет change_station
    let target = event.target;
    let value = target.value;
    this.setState({
      station: value,
      flag_changing_doctor: true
    })
  }  

  change_department(event){ // кабинет change_department
    let target = event.target;
    let value = target.value;
    this.setState({
      department: value,
      flag_changing_doctor: true
    })
  }

  show_modal(){
    if (this.state.flag_changing_doctor){
      let show_modal = document.getElementsByClassName('modal-window');
      show_modal[0].style = "visibility: visible";      
    } else {
      this.props.close_edit_doctor();
    }
  }

  hide_modal(){
    let show_modal = document.getElementsByClassName('modal-window');
    show_modal[0].style = "visibility: hide";
  }


   render(){
    // Редактирование врача = edit_doctor != 'new' 
    // Создание расписания для нового врача
    // Вы внесли изменение в информацию о враче. Хотите сохранить данные изменения?

    let modal_window = <ModalMessage id_doctor={this.state.id} message={'Вы внесли изменение в информацию о враче. Хотите сохранить данные изменения?'} answer1={'Сохранить'} answer2={'Отменить и закрыть'} button_x={this.hide_modal} button_answer1={() => {this.props.edit_doctors_on_board(this.state.id, this.state.name, this.state.lastname, this.state.surname, this.state.week, this.state.date_birthday, this.state.speciality, this.state.department, this.state.station, this.state.cabinet); this.props.close_edit_doctor();}} button_answer2={this.props.close_edit_doctor}/>;
    if (this.state.id == 'new'){
      modal_window = <ModalMessage id_doctor={this.state.id} message={'Вы хотите добавить нового врача в расписание. Сохранить?'} answer1={'Сохранить'} answer2={'Отменить и закрыть'} button_x={this.hide_modal} button_answer1={() => {this.props.create_new_doctor_on_board(this.state.name, this.state.lastname, this.state.surname, this.state.week, this.state.date_birthday, this.state.speciality, this.state.department, this.state.station, this.state.cabinet); this.props.close_edit_doctor();} } button_answer2={this.props.close_edit_doctor}/>;
    }

    return(
    <div>
      {modal_window}
      <HeaderApp username={this.props.username} message_info='Редактирование расписания врача' log_out={this.props.log_out}/>
      <div className="edit-doctor">                
        <EditDoctorHeading is_new_doctor={this.state.id} message={'Создание расписания врача'} name={this.props.edit_doctor.surname+' '+this.props.edit_doctor.name+' '+this.props.edit_doctor.lastname}/>
        <div className='edit-doctor__input-fields'>
          <EditDoctorFullName 
            change_name={this.change_name} change_lastname={this.change_lastname} change_surname={this.change_surname}
            name={this.state.name} lastname={this.state.lastname} surname={this.state.surname}
          />          
          <div className="edit-doctor__work-info">
            <EditDoctorWeek week={this.state.week} change_week={this.change_week}/>
            <EditDoctorPlaceWork
              change_birthday={this.change_birthday} birthday={this.state.date_birthday} 
              change_speciality={this.change_speciality} speciality={this.state.speciality}
              change_cabinet={this.change_cabinet} cabinet={this.state.cabinet}
              change_station={this.change_station} station={this.state.station}
              change_department={this.change_department} department={this.state.department}                
            />
          </div>
        </div>
        <EditDoctorButtonSave close_edit_doctor={this.show_modal} close_no_edit={this.props.close_edit_doctor}/>
        <EditDoctorButtonClose close_edit_doctor={this.show_modal} close_no_edit={this.props.close_edit_doctor}/>
      </div>
    </div>
    )
  }
}

// close_edit_doctor={this.props.close_edit_doctor}
// flag_changing_doctor

// ================================================= Заголовок

class EditDoctorHeading extends React.Component{
  render(){
    let message = this.props.message;
    if (this.props.is_new_doctor != 'new'){
      message = this.props.name;
    }
    return(
      <p className="edit-doctor__heading">{message}</p>
    )
  }
}

//  ================================================ ФИО

class EditDoctorFullName extends React.Component{
  render(){
    return(
      // <div className="edit-doctor__person-info">
      <div className="edit-doctor__fio-edit">
        <EditDoctorPartName part_name="Фамилия" options={surnames} part_name_value={this.props.surname} class_name="surname" change={(event) => this.props.change_surname(event)} />
        <EditDoctorPartName part_name="Имя" options={names} part_name_value={this.props.name} class_name="name" change={(event) => this.props.change_name(event)} />
        <EditDoctorPartName part_name="Отчество" options={lastnames} part_name_value={this.props.lastname} class_name="lastname" change={(event) => this.props.change_lastname(event)} />
      </div>
    )
  }
}

class Options extends React.Component{
  render(){
    return(
      <option> {this.props.option} </option>
    )
  }
}
// мапинг массива
// {this.props.options.map((option, id) => (<Options key={id} option={option} />))} 
{/* <input type="text" list="part-of-name"  */}
{/* <datalist id="part-of-name"> */}

class EditDoctorPartName extends React.Component{
  render(){
    return(
      <div className={"edit-doctor__fio-edit-"+this.props.class_name}>
        <p className={"edit-doctor__fio-edit-"+this.props.class_name+"-label"}>{this.props.part_name}</p>  
        <input type="text" list="part-of-name" className={"edit-doctor__fio-edit-"+this.props.class_name+"-input"} value={this.props.part_name_value} onChange={this.props.change} autoComplete="off"/>
        <datalist id="part-of-name">
        {this.props.options.map((option, id) => (<Options key={id} option={option} />))} 
        </datalist>
      </div>
    )
  }
}

// ========================================= дни недели, дата рождения и о работе
class EditDoctorWeek extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      start_work: [this.props.week[0].start_work, this.props.week[1].start_work, this.props.week[2].start_work, this.props.week[3].start_work, this.props.week[4].start_work],
      finish_work:[this.props.week[0].finish_work, this.props.week[1].finish_work, this.props.week[2].finish_work, this.props.week[3].finish_work, this.props.week[4].finish_work],
      is_work_day:[this.props.week[0].is_work_day, this.props.week[1].is_work_day, this.props.week[2].is_work_day, this.props.week[3].is_work_day, this.props.week[4].is_work_day]
    };
    this.change_start_work = this.change_start_work.bind(this);
    this.change_finish_work = this.change_finish_work.bind(this);
    this.change_is_work_day = this.change_is_work_day.bind(this);
    this.change_week = this.change_week.bind(this);
  }

  change_week(){
    let week = [
      { start_work: this.state.start_work[0] ,finish_work:this.state.finish_work[0] ,is_work_day:this.state.is_work_day[0] },
      { start_work: this.state.start_work[1] ,finish_work:this.state.finish_work[1] ,is_work_day:this.state.is_work_day[1] },
      { start_work: this.state.start_work[2] ,finish_work:this.state.finish_work[2] ,is_work_day:this.state.is_work_day[2] },
      { start_work: this.state.start_work[3] ,finish_work:this.state.finish_work[3] ,is_work_day:this.state.is_work_day[3] },
      { start_work: this.state.start_work[4] ,finish_work:this.state.finish_work[4] ,is_work_day:this.state.is_work_day[4] }
    ]
    this.props.change_week(week) //123123123+++++++++++++++_+_++++++++++++++++++++++++++++++++++++++++++++
  }

  change_start_work(event,id_week){
    let days = this.state.start_work;
    let target = event.target;
    let value = target.value;
    days[id_week] = value;
    this.setState({
      start_work: days
    })
  }

  change_finish_work(event,id_week){
    let days = this.state.finish_work;
    let target = event.target;
    let value = target.value;
    days[id_week] = value;
    this.setState({
      finish_work: days
    })
  }

  change_is_work_day(event,id_week){
    let days = this.state.is_work_day;    
    let target = event.target;
    let value = target.checked;
    days[id_week] = value;
    this.setState({
      is_work_day: days
    })
  }

  render(){
    let week = [
      'Пн', 'Вт', 'Ср', 'Чт', 'Пт'
    ];
    return(
      <div className="edit-doctor__work-info-work-week">
        {week.map((day, id) => (<DayOfWeak key={id} name_day_of_week={day} options={times}
            start_work={this.state.start_work[id]} finish_work={this.state.finish_work[id]} is_work_day={this.state.is_work_day[id]}  
            change_start_work={async (event) => {await this.change_start_work(event,id); this.change_week();} } 
            change_finish_work={async (event) => {await this.change_finish_work(event,id); this.change_week();} }
            change_is_work_day={async (event) => {await this.change_is_work_day(event,id); this.change_week();} } 
        />))} 
      </div>      
    )
  }
}

// ============ дни недели
class DayOfWeak extends React.Component{
  render(){
    if (this.props.is_work_day){
      return(
        <div className="edit-doctor__work-info-work-week-day">
          <input type="checkbox" checked="checked" className="edit-doctor__work-info-work-week-day-is-work" onChange={ this.props.change_is_work_day }/>          
          <p className="edit-doctor__work-info-work-week-day-name">{this.props.name_day_of_week}</p>
          <input type="text" list="part-of-time" maxLength="5" className="edit-doctor__work-info-work-week-day-start" value={this.props.start_work} onChange={this.props.change_start_work}/>
          <datalist id="part-of-time">
          {this.props.options.map((option, id) => (<Options key={id} option={option} />))} 
          </datalist>
          <p className="edit-doctor__work-info-work-week-day-dash"> - </p>
          <input type="text" list="part-of-time" maxLength="5" className="edit-doctor__work-info-work-week-day-finish" value={this.props.finish_work} onChange={this.props.change_finish_work}/>
          <datalist id="part-of-time">
          {this.props.options.map((option, id) => (<Options key={id} option={option} />))} 
          </datalist>
        </div>      
      )
    }
      else{
        return(
          <div className="edit-doctor__work-info-work-week-day">
            <input type="checkbox" checked="" className="edit-doctor__work-info-work-week-day-is-work" onChange={ this.props.change_is_work_day }/>            
            <p className="edit-doctor__work-info-work-week-day-name">{this.props.name_day_of_week}</p>
            {/* <input type="text" className="edit-doctor__work-info-work-week-day-not-work" value="приема нет" readonly/> */}
            <p className="edit-doctor__work-info-work-week-day-not-work"> приема нет </p>
          </div>  
        )
      }
  }
}

// ============ дата рождения, о работе / где приём 
class EditDoctorPlaceWork extends React.Component{
  render(){
    return(
      <div className="edit-doctor__work-info-about-doctor">
        <EditDoctorBirthday birthday={this.props.birthday} change_birthday={(event) => this.props.change_birthday(event)}/>
        <EditDoctorSpeciality options={['терапевт','хирург','каридолог','невролог','травматолог']} speciality={this.props.speciality} change_speciality={(event) => this.props.change_speciality(event)} />
        <EditDoctorStationAndCabinet 
          change_cabinet={this.props.change_cabinet} cabinet={this.props.cabinet}
          change_station={this.props.change_station} station={this.props.station}
        />
        <EditDoctorDepartment options={departments} change_department={this.props.change_department} department={this.props.department}/>
      </div>
    )
  }
}

class EditDoctorBirthday extends React.Component{
  render(){
    return(
      <div className="edit-doctor__work-info-about-doctor-birthday">
        <p className="edit-doctor__work-info-about-doctor-birthday-label">Дата рождения</p>  
        <input type="date" value={this.props.birthday} className="edit-doctor__work-info-about-doctor-birthday-date" onChange={this.props.change_birthday} />  
      </div>
      
    )
  }
}

class EditDoctorSpeciality extends React.Component{
  render(){
    return(
      <div className="edit-doctor__work-info-about-doctor-speciality">
        <p className="edit-doctor__work-info-about-doctor-speciality-label">Специальность</p>  
        <input type="text" list="speciality-list" value={this.props.speciality} className="edit-doctor__work-info-about-doctor-speciality-name" onChange={this.props.change_speciality} />
        <datalist id="speciality-list">
          {this.props.options.map((option, id) => (<Options key={id} option={option} />))} 
        </datalist>
      </div>     
    )
  }  
}

class EditDoctorStationAndCabinet extends React.Component{
  render(){
    return(
      <div className="edit-doctor__work-info-about-doctor-station-and-cabinet">
        <EditDoctorCabinet options={cabinets} change_cabinet={this.props.change_cabinet} cabinet={this.props.cabinet}/>        
        <EditDoctorStation options={stations} change_station={this.props.change_station} station={this.props.station}/>   
      </div>
    )
  }
}

class EditDoctorCabinet extends React.Component{
  render(){
    return(
      <div className="edit-doctor__work-info-about-doctor-station-and-cabinet-cabinet">
        <p className="edit-doctor__work-info-about-doctor-station-and-cabinet-cabinet-label">Кабинет</p>  
        <input type="text" list="cabinet-list" value={this.props.cabinet} className="edit-doctor__work-info-about-doctor-station-and-cabinet-cabinet-number" onChange={this.props.change_cabinet}/>
        <datalist id="cabinet-list">
        {this.props.options.map((option, id) => (<Options key={id} option={option} />))} 
        </datalist>
      </div>
      
    )
  }
}

class EditDoctorStation extends React.Component{
  render(){
    return(
      <div className="edit-doctor__work-info-about-doctor-station-and-cabinet-station">
        <p className="edit-doctor__work-info-about-doctor-station-and-cabinet-station-label">Участок</p>  
        <input type="text" list="staton-list" value={this.props.station} className="edit-doctor__work-info-about-doctor-station-and-cabinet-station-name" onChange={this.props.change_station} />
        <datalist id="staton-list">
        {this.props.options.map((option, id) => (<Options key={id} option={option} />))} 
        </datalist>
      </div>      
    )
  }
}

class EditDoctorDepartment extends React.Component{
  render(){
    return(
      <div className="edit-doctor__work-info-about-doctor-department">
        <p className="edit-doctor__work-info-about-doctor-department-label">Отделение</p>  
        {/* <SelectList list={["терапевтичесое отделение №1","терапевтичесое отделение №2"]} class_tag="edit-doctor__work-info-about-doctor-department-select"/>   */}
        <input type="text" list="department-list" value={this.props.department} className="edit-doctor__work-info-about-doctor-department-name" onChange={this.props.change_department} />
        <datalist id="department-list">
        {this.props.options.map((option, id) => (<Options key={id} option={option} />))} 
        </datalist>
      </div>
      
    )
  }
}




// ========================================= кнопка сохранить

class EditDoctorButtonSave extends React.Component{
  render(){
    return(
      <button className="edit-doctor__button-save" onClick={this.props.close_edit_doctor}>Сохранить и закрыть</button>      
    )
  }
}

// ========================================= кнопка закрыть

class EditDoctorButtonClose extends React.Component{
  render(){
    return(
      <button className="edit-doctor__button-close" onClick={this.props.close_edit_doctor}>X</button>      
    )
  }
}

// constructor(props) {    
//   super(props);
//   let doctor = ['','',''];
//   } 
// }