import React from 'react'
import PropTypes from 'prop-types'
import Messager from '../components/Messager'
import Autorization from '../components/Autorization'
import ActionTypes from '../constants/actionTypes'
import { connect } from 'react-redux'

const URL = 'ws://st-chat.shas.tel'
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
      var objDiv = document.getElementsByClassName('list_container')[0]
      if (objDiv.scrollHeight) {
        objDiv.scrollTop = objDiv.scrollHeight
      }
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
    }.bind(this)

    socket.onclose = () => {
      console.log('disconnected')
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

  render() {
    // showMessage(incomingMessage)
    if (this.state.user === 'incognito' || this.state.user === '') {
      return <Autorization setName={this.setName} />
    } else {
      return (
        <Messager
          name={this.state.user}
          messages={this.state.messages}
          setmessage={this.setmessage}
          changeName={this.changeName}
        />
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
