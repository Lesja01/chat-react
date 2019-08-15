import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

function Messager(props) {
  console.log(props)
  return (
    <div className="main">
      <div id="subscribe">
        <div className="list_container">
          <ul className="list">
            {props.messages.map((message) => {
              return (
                <li key={message.id} className="one_message">
                  <div className="timebox">{new Date(message.time).toUTCString()}</div>
                  <div className="messagebox">
                    <div className="frombox">
                      {' '}
                      <img src="user-male.png" width="30px" height="30px" className="user_pic"></img>
                      <h5 className="frombox_user">{message.from}</h5>
                    </div>
                    <div className="message">{message.message}</div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="changeName">
            <h3 className="user_name">Hello, {props.name}!</h3>
            <button className="button_incognito" onClick={props.changeName}>
              <img src="user-male.png" width="50px" height="50px" alt="user picture"></img>
              <h5>Log out</h5>
            </button>
          </div>
        </div>
      </div>
      <form className="form_send" name="publish">
        <input id="my_message" type="text" name="message" />
        <input className="form_send-sumit" type="submit" value="Отправить" onClick={props.setmessage} />
      </form>
    </div>
  )
}

Messager.propTypes = {}

export default Messager
