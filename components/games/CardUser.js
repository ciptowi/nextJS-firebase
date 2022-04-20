import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Table } from "reactstrap";
import { db } from "../../firebase/config";

const CardUser = ({ detailGame, gameId }) => {
  const [game, setGame] = useState("");
  const [score, setScore] = useState("");
  const [level, setLevel] = useState("");
  const [user, setUser] = useState("");

  const getDetail = async () => {
    const person = JSON.parse(localStorage.getItem("user"))
    const isScore = JSON.parse(localStorage.getItem("score"))
    const game = detailGame[0]
    setUser(person);
    setGame(game.name)

    if (gameId == "l9Ay2BQwtsJc7kfgfOp7" && isScore > 0) {
      const docRef = doc(db, "rps_game_points", person.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setScore(docSnap.data().total)
      }
      const docRef2 = doc(db, "users", person.uid);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.exists()) {
        setLevel(docSnap2.data().level)
      }
    } else {
      setScore(0)
      setLevel(`"Belum pernah dimainkan"`)
    }
  }
  useEffect(() => {
    getDetail()
  }, []);

  return (
    <div className="mt-2">
      <h3>Score</h3>
      <div
        style={{
          display: "block",
        }}
      >
        <Card className="bg-transparent border-light">
          <CardBody>
            <CardTitle tag="h5">
              {
                user ? (<b>{user.displayName}</b>) : "Login dulu untuk bermain"
              }
            </CardTitle>
            <CardText>
              <Table borderless responsive size="sm" className="text-light">
                <tbody>
                  <tr>
                    <th>Level</th>
                    <th>: {level}</th>
                  </tr>
                  <tr>
                    <th>Score</th>
                    <th>: {score}</th>
                  </tr>
                </tbody>
              </Table>
            </CardText>
          </CardBody>
        </Card>
      </div>
    </div>
  )
};

export default CardUser;
