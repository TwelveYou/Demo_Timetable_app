import React from 'react';
import './styles/autorization.css';

// let users= [
//     {
//         name:'Администратор',
//         username: 'admin',
//         password: 'admin',
//         admin: true
//     },
//     {
//         name:'Илья',    
//         username: 'user1',
//         password: 'qwe123',
//         admin: false
//     }
// ]

// =================================================

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            result_login_message: 'Введите логин и пароль',
            users:this.props.users
        };

        this.change_input = this.change_input.bind(this);       
        this.click_enter_on_input = this.click_enter_on_input.bind(this);   
        this.change_result_login_message = this.change_result_login_message.bind(this);  
        this.try_login = this.try_login.bind(this);   
    }

  change_input(event){
    let target = event.target;
    let value = target.value;
    return value;    //   (event) => this.setState({ #переменная#: this.change_input(event) })    
  }

  click_enter_on_input(event){ // При нажатии ентер нажимать кнопку Войти (функция this.try_login)
    if (event.which === 13) {
      this.try_login();
    }
  }

  // Смена цвета и текста сообщения
  change_result_login_message(color,message){
    let color_code
    if (color === 'red') 
        {color_code = '#ff3d3d'} 
    else 
        if (color === 'green') 
            {color_code = '#66FF00'}
    document.getElementsByClassName('login__result-login-message')[0].style.color = color_code;            
    this.setState({
        result_login_message: message
    })

  }

  try_login(){
    if ('' === this.state.username){
        this.change_result_login_message('red','Вы не ввели логин.');
    } else
        if ('' === this.state.password){
            this.change_result_login_message('red','Вы не ввели пароль.');
        } else{

            for(let i = 0; i < this.state.users.length; i++){
                if (this.state.users[i].username === this.state.username){
                    if (this.state.users[i].password === this.state.password){
                        this.change_result_login_message('green','Добро пожаловать, '+this.state.users[i].name+'. Вы успешно вошли в систему');

                        //Асинхронная смена досок.
                        this.props.change_user_list_boards_after_autorization(this.state.users[i].id);
                        
                        // подождать немного времени
                        this.props.log_in(this.state.users[i].username, this.state.users[i].admin);

                        // console.log(users[i].username, users[i].admin);
                        return null;
                    }
                    else{
                        this.change_result_login_message('red','Неверный пароль!');       
                        return null;          
                    }
                }
            }
            this.change_result_login_message('red','Логин, под которым вы хотите авторизоваться, отсутствует в системе.'); 
        };
  }



  render(){
    // users=this.props.users; 
    return(
      <div className="app-login">
        <div className="login-window">
            <Heading/>
            <UserName username={this.state.username} change={(event) => this.setState({username: this.change_input(event)})} click_enter={this.click_enter_on_input} />
            <Password password={this.state.password} change={(event) => this.setState({password: this.change_input(event)})} click_enter={this.click_enter_on_input} />
            <ButtonEnter click={this.try_login} />
            <LoginMessage result_login_message={this.state.result_login_message} />        
        </div>  
        <div className="logo">
            <p className="logo__name">«Расписание приема врачей АМКБ»</p>    
            <p className="logo__about">Информационная система для управления</p>    
            <p className="logo__about">группой электронного табло</p>    
        </div>


        {/*Лого*/}
      </div>
    )
  }
}

class Heading extends React.Component{
  render(){
    return(
      <h1 className="login__heading">Вход в систему</h1>
    )    
  }
}

class UserName extends React.Component{
  render(){
    return(
      <div className="login-username">
        <p className="login-username__label">Логин</p>
        <input type='text' className="login-username__input" value={this.props.username} onChange={this.props.change} onKeyPress={this.props.click_enter}/>
      </div>
    )    
  }
}

class Password extends React.Component{
  render(){
    return(
      <div className="login-password">
        <p className="login-password__label">Пароль</p>
        <input type='password' className="login-password__input" value={this.props.password} onChange={this.props.change}  onKeyPress={this.props.click_enter}/>
      </div>
    )    
  }
}

class ButtonEnter extends React.Component{  
  render(){
    return(
      <button className="login__button-enter" onClick={this.props.click}>Войти</button>
    )    
  }
}

class LoginMessage extends React.Component{
  render(){
    return(
      <p className="login__result-login-message">{this.props.result_login_message}</p>
    )
  }
}