import { Col, Container, Row, Table } from 'reactstrap'
import styles from '../../components/frontpage/Landing.module.css'

export default function About() {
  return (
    <div className={styles.about}>
      <Row>
        <Col sm="3" md="3" lg="3" className='text-center'>
          <strong>About</strong>
          <p>Company</p>
          <p>Details</p>
          <p>Planning</p>
          <p>About Us</p>
        </Col>
        <Col sm="3" md="3" lg="3" className='text-center'>
          <strong>Company</strong>
          <p>Company</p>
          <p>Details</p>
          <p>Planning</p>
          <p>About Us</p>
        </Col>
        <Col sm="3" md="3" lg="3" className='text-center'>
          <strong>Legal</strong>
          <p>Company</p>
          <p>Details</p>
          <p>Planning</p>
          <p>About Us</p>
        </Col>
        <Col sm="3" md="3" lg="3" className='text-center'>
          <strong>Information</strong>
          <p>Company</p>
          <p>Details</p>
          <p>Planning</p>
          <p>About Us</p>
        </Col>
      </Row>
    </div>
  )
}