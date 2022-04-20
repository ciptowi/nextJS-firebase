import Layout from "../components/layouts/Layout"
import About from "../components/frontpage/About";
import Category from "../components/frontpage/Catagory";
import Gameselection from "../components/frontpage/Gameselection";
import Slidevent from "../components/frontpage/Slidevent";
import { Container, Row, Col } from "reactstrap";

export default function LandingPage() {
  return (
    <Layout title="Gaming Platform" >
      <Container>
        <Slidevent></Slidevent>
        <Category></Category>
        <Gameselection></Gameselection>
        {/* <About></About> */}
      </Container>
    </Layout >
  )
}
