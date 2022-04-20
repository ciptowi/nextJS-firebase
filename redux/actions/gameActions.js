// import { auth, db } from "../../../firebase/config";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { getDoc, doc } from "firebase/firestore";

export const nextRound = () => {
  return { type: "INCREMENT" };
};

export const addScore = () => {
  return { type: "ADD_SCORE" };
};

export const restart = () => {
  return { type: "RESET" };
};

export const resetScore = () => {
  return { type: "RESET_SCORE" };
};

export const finish = (score) => {
  return { type: "GAME_FINISHED", score };
};

export const draw = () => {
  dispatch({ type: "RESET" });
};

export const lose = () => {
  dispatch({ type: "RESET" });
};
