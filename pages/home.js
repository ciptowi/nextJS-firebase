import Layout from "../components/layouts/Layout";
import LastPlayedGame from "../components/home/LastPlayedGame";
import Leaderboards from "../components/home/Leaderboards";
import Statistics from "../components/home/Statistics";
import Updates from "../components/home/Updates";
import { Container, Row, Col } from "reactstrap";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { connect } from "react-redux";
import Router from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  var temp = [];
  var tempid = [];
  var leaderboards = [];
  var leaderboards_id = [];
  var updates = [];
  var updates_id = [];

  const q = query(collection(db, "games"), limit(4));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    temp.push(doc.data());
    tempid.push(doc.id);
  });

  const q2 = query(collection(db, "rps_game_points"), orderBy("total", "desc"), limit(5));
  const querySnapshot2 = await getDocs(q2);
  querySnapshot2.forEach((doc) => {
    leaderboards.push(doc.data());
    leaderboards_id.push(doc.id);
  });

  const q3 = query(collection(db, "updates"));
  const querySnapshot3 = await getDocs(q3);
  querySnapshot3.forEach((doc) => {
    updates.push(doc.data());
    updates_id.push(doc.id);
  });

  return {
    props: {
      itemss: temp,
      idss: tempid,
      leaderboards,
      leaderboards_id,
      updates,
      updates_id,
    },
  };
}

function Home({ idss, itemss, leaderboards, leaderboards_id, updates, updates_id }) {
  // const { token, auth } = props;
  if (typeof window !== "undefined") {
    // Perform localStorage action
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    //console.log(token);
    if (!token) {
      //console.log("tes");
      Router.push("/auth/login");
    }
  }, []);
  return (
    <Layout title="Home">
      <Container>
        <Row>
          <Col sm={8}>
            <LastPlayedGame itemss={itemss} idss={idss}></LastPlayedGame>
          </Col>
          <Col sm={4}>
            <Leaderboards leaderboards={leaderboards} leaderboards_id={leaderboards_id}></Leaderboards>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <Updates updates={updates} updates_id={updates_id}></Updates>
          </Col>
          <Col sm={4}>
            <Statistics></Statistics>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <br />
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, null)(Home);
