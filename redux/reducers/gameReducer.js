const initState = {
  round: 1,
  score: 0,
  scoreRedux: -1,
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        round: state.round + 1,
      };
    case "ADD_SCORE":
      return {
        ...state,
        score: state.score + 1,
      };
    case "RESET_SCORE":
      return {
        ...state,
        score: 0,
      };
    case "RESET":
      return {
        ...state,
        round: 1,
      };
    case "GAME_FINISHED":
      return {
        ...state,
        scoreRedux: action.score,
      };
    default:
      return state;
  }
};

export default gameReducer;
