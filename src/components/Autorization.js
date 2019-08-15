import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

function Autorization(props) {
  console.log(props)
  return (
    <div className="autorization">
      <h1 className="autorization_header"> Log in</h1>
      <form name="publish" className="autorization_publish">
        <input id="user_name" type="text" name="message" />
        <input className="autorization_button" type="submit" value="Start" onClick={props.setName} />
      </form>
    </div>
  )
}

Autorization.propTypes = {}

export default Autorization
