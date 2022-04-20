import React, { useState, useEffect } from "react";
import Router from 'next/router'
import { addDoc, setDoc, collection, where, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { connect, useDispatch } from "react-redux";
import { nextRound, restart, addScore, resetScore, finish } from "../../../redux/actions/gameActions";
import swal from "sweetalert";

var player_pick = "";
var cpu = "";
// var score = 0;
// var round = 1;
var history_score;
var history_id;
var level;

const GameBody = (props) => {
  const { round, score } = props;
  const [cpuS, setCpuS] = useState("");
  const [playerS, setPlayerS] = useState("");
  const [cpuR, setCpuR] = useState("");
  const [playerR, setPlayerR] = useState("");
  const [cpuP, setCpuP] = useState("");
  const [playerP, setPlayerP] = useState("");
  const dispatch = useDispatch();

  const uid = props.data.uid;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
      swal({ text: "Silahkan Login untuk lanjut bermain" })
    } else if (round <= 3) {
      setTimeout(() => {
        swal({
          title: "Round " + round,
          text: "Are you ready?",
          timer: 1500,
          buttons: false,
        });

        refresh();
      }, 1500);
    } else {
      addDoc(collection(db, "game_history"), {
        uid: props.data.uid,
        game: "Rock Paper Scissors",
        username: props.data.username,
        score: score,
        created_at: new Date(),
      });
      getHistory(score);

      swal({
        title: "Game Over",
        text: "Thank you for playing, Your final score is " + score,
        buttons: [true, "Play Again"],
      }).then((isConfirm) => {
        if (isConfirm) {
          reset();
        }
      });
    }
  }, [round]);

  // useEffect(() => {

  // }, []);

  async function getHistory(currScore) {
    const q = query(
      collection(db, "rps_game_points"),
      where("username", "==", props.data.username),
      where("game", "==", "Rock Paper Scissors")
    );
    const querySnapshot = await getDocs(q);

    let valid = true;
    querySnapshot.forEach((doc) => {
      valid = false;
      // doc.data() is never undefined for query doc snapshots
      history_score = doc.data().total;
      history_id = doc.id;

      dispatch(finish(parseInt(history_score) + currScore));
      updateHistory(currScore);
    });
    if (valid) {
      try {
        setDoc(doc(db, "rps_game_points", uid), {
          total: currScore,
          game: "Rock Paper Scissors",
          username: props.data.username,
          updated_at: "2022-04-16 20:00:00",
        });
      } catch (error) {
        //console.log("upadate failed");
        //console.log(error.message);
      }
    }

    if (parseInt(history_score) + currScore >= 25) {
      updateLevel("Middle");
    } else if (parseInt(history_score) + currScore >= 50) {
      updateLevel("Expert");
    }
  }

  async function updateHistory(currScore) {
    const data = doc(db, "rps_game_points", history_id);
    await updateDoc(data, {
      total: parseInt(history_score) + currScore,
    });
  }

  async function updateLevel(level) {
    const data = doc(db, "users", uid);
    await updateDoc(data, {
      level: level,
    });
  }

  const check = () => {
    let arr = ["gunting", "gunting", "gunting"];
    cpu = arr[Math.floor(Math.random() * arr.length)];
    //console.log("CPU memilih " + cpu);

    if (player_pick === "batu" && cpu === "batu") {
      setCpuR(toggle);
      //console.log("SERI");
      document.getElementById("result").classList.add("banner");
      document.getElementById(
        "result"
      ).innerHTML = `<h3 style="color:white;vertical-align: -webkit-baseline-middle;"><b>DRAW</b></h3>`;
    } else if (player_pick === "batu" && cpu === "gunting") {
      setCpuS(toggle);
      //console.log("Player 1 Menang!");
      document.getElementById("result").classList.add("banner");
      document.getElementById(
        "result"
      ).innerHTML = `<h3 style="color:white;vertical-align: -webkit-baseline-middle;"><b>YOU WIN!</b></h3>`;
      dispatch(addScore());
      //document.getElementById("score").innerHTML = score;
    } else if (player_pick === "batu" && cpu === "kertas") {
      setCpuP(toggle);
      //console.log("Player 2 Menang!");
      document.getElementById("result").classList.add("banner");
      document.getElementById(
        "result"
      ).innerHTML = `<h3 style="color:white;vertical-align: -webkit-baseline-middle;"><b>YOU LOSE!</b></h3>`;
    } else if (player_pick === "kertas" && cpu === "batu") {
      setCpuR(toggle);
      //console.log("Player 1 Menang!");
      document.getElementById("result").classList.add("banner");
      document.getElementById(
        "result"
      ).innerHTML = `<h3 style="color:white;vertical-align: -webkit-baseline-middle;"><b>YOU WIN!</b></h3>`;
      dispatch(addScore());
      //document.getElementById("score").innerHTML = score;
    } else if (player_pick === "kertas" && cpu === "kertas") {
      setCpuP(toggle);
      //console.log("SERI");
      document.getElementById("result").classList.add("banner");
      document.getElementById(
        "result"
      ).innerHTML = `<h3 style="color:white;vertical-align: -webkit-baseline-middle;"><b>DRAW</b></h3>`;
    } else if (player_pick === "kertas" && cpu === "gunting") {
      setCpuS(toggle);
      //console.log("Player 2 Menang!");
      document.getElementById("result").classList.add("banner");
      document.getElementById(
        "result"
      ).innerHTML = `<h3 style="color:white;vertical-align: -webkit-baseline-middle;"><b>YOU LOSE!</b></h3>`;
    } else if (player_pick === "gunting" && cpu === "batu") {
      setCpuR(toggle);
      //console.log("Player 2 Menang!");
      document.getElementById("result").classList.add("banner");
      document.getElementById(
        "result"
      ).innerHTML = `<h3 style="color:white;vertical-align: -webkit-baseline-middle;"><b>YOU LOSE!</b></h3>`;
    } else if (player_pick === "gunting" && cpu === "kertas") {
      setCpuP(toggle);
      //console.log("Player 1 Menang!");
      document.getElementById("result").classList.add("banner");
      document.getElementById(
        "result"
      ).innerHTML = `<h3 style="color:white;vertical-align: -webkit-baseline-middle;"><b>YOU WIN!</b></h3>`;
      dispatch(addScore());
      //document.getElementById("score").innerHTML = score;
    } else if (player_pick === "gunting" && cpu === "gunting") {
      setCpuS(toggle);
      //console.log("SERI");
      document.getElementById("result").classList.add("banner");
      document.getElementById(
        "result"
      ).innerHTML = `<h3 style="color:white;vertical-align: -webkit-baseline-middle;"><b>DRAW</b></h3>`;
    } else {
      return 0;
    }
    dispatch(nextRound());
    if (round < 3) {
      setTimeout(() => {
        refresh();
      }, 1500);
    } else {
      document.getElementById("button-refresh").style.display = "";
    }
  };

  const refresh = () => {
    setCpuS("");
    setPlayerS("");
    setCpuR("");
    setPlayerR("");
    setCpuP("");
    setPlayerP("");

    document.getElementById("result").classList.remove("banner");
    document.getElementById("result").innerHTML = '<h1 style="color:red"><b>VS</b></h1>';
    document.getElementById("button-refresh").style.display = "none";
    //document.getElementById("score").innerHTML = score;
    player_pick = "";
    cpu = "";
  };

  const reset = () => {
    refresh();
    dispatch(resetScore());
    dispatch(restart());
  };

  const getValP = (e) => {
    player_pick = e;
    setTimeout(() => {
      check();
    }, 1500);
  };
  const toggle = (e) => {
    return "active";
  };

  return (
    <div className="container-fluid" id="app">
      <div className="row">
        <div className="col-4 p-3 test">
          <h3>
            <b style={{ color: "black" }}>{props.data.username}</b>
          </h3>
        </div>
        <div className="col-4 p-3" style={{ textAlign: "center" }}>
          <h3>
            Point : <span id="score">{score}</span>
          </h3>
        </div>
        <div className="col-4 p-3 test">
          <h3>
            <b style={{ color: "black" }}>COM</b>
          </h3>
        </div>
      </div>
      {/* Batu  */}
      <div className="row" id="batu">
        <div className="col-4 p-3 test">
          <div className={playerR + " test2"} id="batu_player">
            <img
              src="/assets/batu.png"
              alt="Batu"
              style={{ width: "50px", height: "75px" }}
              //onClick={props.nextRound}
              onClick={() => {
                if (playerP !== "active" && playerS !== "active") {
                  setPlayerR(toggle);
                  getValP("batu");
                }
              }}
            />
          </div>
        </div>
        <div className="col-4 p-3 test"></div>
        <div className="col-4 p-3 test">
          <div className={cpuR + " test2"} id="batu_cpu">
            <img
              src="/assets/batu.png"
              alt="Batu"
              style={{ width: "50px", height: "75px" }}
              onClick={() => {
                setCpuR(toggle);
              }}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-4 p-3 test">
          <div className={playerP + " test2"} id="kertas_player">
            <img
              src="/assets/kertas.png"
              alt="Batu"
              style={{ width: "50px", height: "75px" }}
              onClick={() => {
                if (playerR !== "active" && playerS !== "active") {
                  setPlayerP(toggle);
                  getValP("kertas");
                }
              }}
            />
          </div>
        </div>
        <div className="col-4 p-3 test" id="result">
          <h1 style={{ color: "red" }}>
            <b>VS</b>
          </h1>
        </div>
        <div className="col-4 p-3 test">
          <div className={cpuP + " test2"} id="kertas_cpu">
            <img
              src="/assets/kertas.png"
              alt="Batu"
              style={{ width: "50px", height: "75px" }}
              onClick={() => {
                setCpuP(toggle);
              }}
            />
          </div>
        </div>
      </div>
      {/* <!-- Gunting --> */}
      <div className="row">
        <div className="col-4 p-3 test">
          <div className={playerS + " test2"} id="gunting_player">
            <img
              src="/assets/gunting.png"
              alt="Batu"
              style={{ width: "50px", height: "75px" }}
              onClick={() => {
                if (playerP !== "active" && playerR !== "active") {
                  setPlayerS(toggle);
                  getValP("gunting");
                }
              }}
            />
          </div>
        </div>
        <div className="col-4 p-3" style={{ textAlign: "center", margin: "auto" }} id="refresh">
          <img
            src="/assets/refresh.png"
            alt="refresh"
            id="button-refresh"
            style={{ width: "50px", display: "none" }}
            onClick={reset}
          />
        </div>
        <div className="col-4 p-3 test">
          <div className={cpuS + " test2"} id="gunting_cpu">
            <img
              src="/assets/gunting.png"
              alt="Batu"
              style={{ width: "50px", height: "75px" }}
              onClick={() => {
                setCpuS(toggle);
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // authError: state.auth.authError,
    // auth: state.firebase.auth,
    round: state.game.round,
    score: state.game.score,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextRound: () => dispatch(nextRound()),
    addScore: () => dispatch(addScore()),
    resetScore: () => dispatch(resetScore()),
    restart: () => dispatch(restart()),
    finish: (current_score) => dispatch(finish(current_score)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBody);
