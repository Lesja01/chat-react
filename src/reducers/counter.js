import ActionTypes from '../constants/actionTypes'

const initialState = {}

export default function counter(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      return state
    default:
      return state
  }
}
