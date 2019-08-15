import React from 'react'
import PropTypes from 'prop-types'
import Messager from '../components/Messager'
import Autorization from '../components/Autorization'
import ActionTypes from '../constants/actionTypes'
import { connect } from 'react-redux'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

const URL = 'wss://wssproxy.herokuapp.com/'
var socket = new WebSocket(URL)

class MessagerContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: [
        {
          from: 'Alesia',
          message: 'Hi!',
          id: '565456',
          time: 'Number',
        },
      ],
      user: localStorage.getItem('user') || 'incognito',
    }
    this.setmessage = this.setmessage.bind(this)
    this.setName = this.setName.bind(this)
    this.changeName = this.changeName.bind(this)
  }

  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired,
  // }

  componentDidMount() {
    let mes
    socket.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
      NotificationManager.info('connected')
    }

    // обработчик входящих сообщений
    socket.onmessage = function(event) {
      mes = JSON.parse(event.data)
      let bufer = this.state.messages
      mes.map((mess) => {
        bufer.push(mess)
      })
      this.setState({ messages: bufer })
      //scroll to bottom

      function setBackground(th) {
        let users = document.getElementsByClassName('frombox_user')
        let name = th.state.user
        for (let i = 0; i < users.length; i++) {
          if (users[i].innerHTML == name) {
            users[i].parentNode.parentNode.parentNode.classList.add('mystyle')
          }
        }
      }
      setBackground(this)
      function addStyles() {
        var objDiv = document.getElementsByClassName('list_container')[0]
        if (objDiv) {
          objDiv.scrollTop = objDiv.scrollHeight
        }
      }
      setTimeout(addStyles, 100)
    }.bind(this)

    socket.onclose = () => {
      console.log('disconnected')
      NotificationManager.warning('Warning message', 'disconnected', 3000)
      // automatically try to reconnect on connection loss
      this.setState({
        socket: new WebSocket(URL),
      })
    }
  }

  setmessage(e) {
    e.preventDefault()
    if (socket.readyState === socket.CLOSED) {
      socket = new WebSocket('ws://st-chat.shas.tel')
    }
    // send message publish
    var outgoingMessage = document.getElementById('my_message').value.toString()
    let mesg = {
      from: this.state.user,
      message: outgoingMessage,
    }
    var message = JSON.stringify(mesg)
    // waiting connecting
    var wsSend = function(data) {
      if (!socket.readyState) {
        setTimeout(function() {
          wsSend(data)
        }, 100)
      } else {
        socket.send(data)
      }
    }
    wsSend(message)
    return false
  }

  setName() {
    var userName = document.getElementById('user_name').value.toString()
    this.setState({ user: userName })
    localStorage.setItem('user', userName)
    return
  }
  changeName() {
    localStorage.setItem('user', 'incognito')
    this.setState({ user: 'incognito' })
  }
  createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message')
          break
        case 'success':
          NotificationManager.success('Success message', 'Title here')
          break
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000)
          break
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback')
          })
          break
      }
    }
  }
  render() {
    // showMessage(incomingMessage)
    if (this.state.user === 'incognito' || this.state.user === '') {
      return <Autorization setName={this.setName} />
    } else {
      return (
        <div>
          {' '}
          <Messager
            name={this.state.user}
            messages={this.state.messages}
            setmessage={this.setmessage}
            changeName={this.changeName}
          />
          <NotificationContainer />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  }
}

export default connect(mapStateToProps)(MessagerContainer)
