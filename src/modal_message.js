import React from 'react';

import './styles/modal_message.css';

// id врача, с которым нужно что-то с ним сделать
// id_doctor={this.state.id}

export default class ModalMessage extends React.Component{    
    render(){
        return(
            <div className='modal-window'>
                <div className='modal-balck-background'></div>
                <div className='modal-message'>
                    <div className='modal-message__header'>
                        {/* закрыть модалку */}
                        <button className="modal-message__header-button-close" onClick={this.props.button_x}>
                            <p>x</p>
                        </button>
                    </div>

                    <div className='modal-message__message'>
                        {/* вывод сообщения для модалки - props.message */}
                        <p>{this.props.message}</p>
                    </div>

                    <div className='modal-message-buttons'>
                        {/* сохранить и закрыть окно изменений button_answer1 */}
                        <button className="modal-message-buttons__button" onClick={() => {this.props.button_answer1();} }>{this.props.answer1}</button>
                        {/* не сохранять и закрыть модалку button_answer2*/}
                        <button className="modal-message-buttons__button" onClick={() => {this.props.button_answer2();} }>{this.props.answer2}</button>
                    </div>
                </div>
            </div>
        )
    }
}


