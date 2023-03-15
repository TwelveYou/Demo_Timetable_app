import React from 'react';
import './styles/header_app.css'

// props:
    //  username - приветствие
    //  message_info - Информация о доступных действиях
    //  logout - Переданная функция выхода пользователя из системы

export default class Header extends React.Component{
        render(){
            return(
                <div className="App-Header">
                    <div className='App-Header-menu'>
                        <div className="App-Header-menu-LogoApp">
                            <p className="App-Header-menu-LogoApp__AppName">
                            «Расписание приема врачей АМКБ»
                            </p>
                            <p className="App-Header-menu-LogoApp__AppInfo">
                            Информационная система управления группой электронного табло
                            </p>
                        </div>
                        <div className="App-Header-menu-UserField">
                            <p className="App-Header-menu-UserField__HiMessage">
                                Здравствуйте, {this.props.username} {/*this.props.username*/}
                            </p>
                            <button className="App-Header-menu-UserField__LogoutButton" onClick={this.props.log_out}> {/* this.props.logout*/}
                            Выйти
                            </button>
                        </div>
                    </div>
                    <InfoAboutActions message_info={this.props.message_info}/>
                </div>
            )
        }
    }

  class InfoAboutActions extends React.Component{
    render(){
      return(
        <p className="App-Header__message-info">
            {this.props.message_info} {/* this.props.message_info*/}
        </p>
      )
    }
  }