import {
  LOGIN_EMAIL_PASSWORD,
  REGISTRASI_EMAIL_PASSWORD,
  LOGIN_GOOGLE,
  LOGIN_FACEBOOK,
  LOGOUT,
} from "../actions/authActions";

if (typeof window !== "undefined") {
  var scoreRedux = JSON.parse(localStorage.getItem("score"));
} else {
  var scoreRedux = -1;
}
const initState = {
  buttonRegister: "Register",
  buttonLogin: "Login",
  buttonGoogle: "Google",
  buttonFacebook: "Facebook",
  scoreRedux: scoreRedux || "0",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_EMAIL_PASSWORD:
      return {
        ...state,
        buttonLogin: action.payload.button,
        scoreRedux: action.payload.score,
        isPlayed: action.payload.isPlayed,
      };
    case REGISTRASI_EMAIL_PASSWORD:
      return {
        ...state,
        buttonRegister: action.payload.button,
      };
    case LOGIN_GOOGLE:
      return {
        ...state,
        buttonGoogle: action.payload.button,
      };
    case LOGIN_FACEBOOK:
      return {
        ...state,
        buttonFacebook: action.payload.button,
      };
    default:
      return state;
  }
};

export default authReducer;
