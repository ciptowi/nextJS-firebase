import { Row, Col, Container } from "reactstrap";
import Layout from "../../components/layouts/Layout";
import GameRPS from "../../components/profile/GameRPS";
import Content from "../../components/profile/Content";
import UserDetail from "../../components/profile/UserDetail";
import AllUsers from "../../components/profile/AllUsers";
import Router from 'next/router'
import { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
    }
  }, []);
  return (
    <div>
      <Layout title="Profile">
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs="auto" md="4" lg="4">
              <UserDetail />
            </Col>
            <Col xs="auto" lg="8">
              <Content />
              <GameRPS />
              <AllUsers />
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
