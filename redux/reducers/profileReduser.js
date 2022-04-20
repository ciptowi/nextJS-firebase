import { UPDATE_PHOTO, UPDATE_NAME, UPDATE_EMAIL, UPDATE_PASSWORD } from "../actions/profileAction"

const initialState = {
  buttonProfile: "save",
  info: "close"
}

const games = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PHOTO:
      return {
        buttonProfile: action.buttonProfile,
        info: action.info
      }
    case UPDATE_NAME:
      return {
        buttonProfile: action.buttonProfile,
        info: action.info
      }
    case UPDATE_EMAIL:
      return {
        buttonProfile: action.buttonProfile,
        info: action.info
      }
    case UPDATE_PASSWORD:
      return {
        buttonProfile: action.buttonProfile,
        info: action.info
      }
    default:
      return state
  }
}

export default games