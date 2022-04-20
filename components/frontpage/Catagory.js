import { db } from "../../firebase/config";
import { collection, getDocs, } from "firebase/firestore";
import { Col, Row, Button, CardImg } from "reactstrap";
import Link from "next/link";
import { useEffect, useState, } from "react";
import styles from './Landing.module.css'

export default function Catagory() {
  const [allGames, setAllGames] = useState([]);
  const [games, setGames] = useState([]);

  var all = []

  useEffect(async () => {
    const citiesRef = collection(db, "games");
    const querySnapshot = await getDocs(citiesRef);
    querySnapshot.forEach((doc) => {
      all.push({ ...doc.data(), id: doc.id });
    });
    setAllGames(all)
    setGames(all)
  }, [])

  // const setAll = () => {
  //   setGames(allGames)
  // }
  const setAdventure = () => {
    const game = allGames
    const adventure = game.filter((obj) => {
      return obj.genre === "Adventure";
    });
    setGames(adventure)
  }
  const setAction = () => {
    const game = allGames
    const action = game.filter((obj) => {
      return obj.genre === "Action";
    });
    setGames(action)
  }
  const setClassic = () => {
    const game = allGames
    const classic = game.filter((obj) => {
      return obj.genre === "Classic";
    });
    setGames(classic)
  }
  const setIndie = () => {
    const game = allGames
    const indie = game.filter((obj) => {
      return obj.genre === "Indie";
    });
    setGames(indie)
  }
  const setRPG = () => {
    const game = allGames
    const rpg = game.filter((obj) => {
      return obj.genre === "RPG";
    });
    setGames(rpg)
  }
  const setSport = () => {
    const game = allGames
    const sports = game.filter((obj) => {
      return obj.genre === "Sports";
    });
    setGames(sports)
  }

  return (
    <>
      <hr />
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {/* <button className="nav-link text-light" onClick={setAll}>ALL</button> */}
          <button className="nav-link text-light" onClick={setAdventure}>Adventure</button>
          <button className="nav-link text-light" onClick={setAction}>Action</button>
          <button className="nav-link text-light" onClick={setClassic}>Classic</button>
          <button className="nav-link text-light" onClick={setIndie}>Indie</button>
          <button className="nav-link text-light" onClick={setRPG}>RPG</button>
          <button className="nav-link text-light" onClick={setSport}>Sport</button>
        </div>
      </nav>

      <Row>
        <Col>
          <div className="border border-primary">
            <Row>
              {games.map((game) => (
                <Col lg='4' className="text-center mx-auto">
                  <div key={game.id} >
                    <Link href={"/games/" + game.id}>
                      <Button color="warning" outline className="btn my-2">
                        <CardImg alt={game.name} src={game.thumbnail} className={styles.item} />
                        <h6>{game.name}</h6>
                      </Button>
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
}
