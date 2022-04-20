import { useState, useEffect } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db } from "../../firebase/config";
import { connect } from "react-redux";
import { CardBody, CardGroup, CardSubtitle, Button, Card, CardImg, CardTitle, CardText, Container } from "reactstrap";
import styles from "../../styles/Home.module.css";

const Content = (props) => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(true); //false

  // const checkUser = () => {
  //   const token = localStorage.getItem("token");
  //   token ? setUser(true) : setUser(false);
  // };
  useEffect(() => {
    async function fetchData() {
      try {
        let array = [];
        const q = query(collection(db, "games"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          array.push({ ...doc.data(), id: doc.id });
        });
        setOrders(array);
      } catch (e) {
        //console.log(e);
      }
    }
    // checkUser();
    fetchData();
  }, []);

  return (
    <Container className={styles.listCon}>
      <CardGroup className={styles.listBgColor}>
        <div className={styles.listRow}>
          <div xs="12" sm="6" md="6" className={styles.listCol}>
            {orders.map((order) => (
              <Card className={styles.listBorder} key={order.id}>
                <CardImg className={styles.listImgContent} alt="Card image cap" src={order.thumbnail} top width="50%" />
                {props.isPlayed && order.id === "l9Ay2BQwtsJc7kfgfOp7" ? (
                  <p className="played-flag">Pernah Dimainkan</p>
                ) : (
                  ""
                )}
                <CardBody className={styles.listCenter}>
                  <CardTitle className={styles.listMyFont} tag="h5">
                    {order.name}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    <i className="bi bi-star-fill text-danger"></i>
                    <i className="bi bi-star-fill text-danger"></i>
                    <i className="bi bi-star-fill text-danger"></i>
                    <i className="bi bi-star-fill text-danger"></i>
                    <i className="bi bi-star-half text-danger"></i>
                  </CardSubtitle>
                  <CardText className={styles.listDate}>{order.release_date}</CardText>
                  {user ? (
                    <Link href={"/games/" + order.id}>
                      <Button color="warning" className={styles.listDate}>
                        Game Detail
                      </Button>
                    </Link>
                  ) : (
                    <Link href={"/login"}>
                      <Button color="warning" className={styles.listDate}>
                        Game Detail
                      </Button>
                    </Link>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </CardGroup>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isPlayed: state.auth.isPlayed,
  };
};

export default connect(mapStateToProps, null)(Content);
