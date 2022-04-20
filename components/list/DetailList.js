import React from "react";
import { Container } from "reactstrap";
import styles from "../../styles/Home.module.css";

const DetailList = () => {
  return (
    <Container className={styles.detailList}>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 text-dark">
          <div className="mt-4">
            A game is a structured form of play, usually undertaken for
            entertainment or fun, and sometimes used as an educational tool.
            Games are different from work, which is usually carried out for
            remuneration, and from art, which is more often an expression of
            aesthetic or ideological elements.
          </div>
          <br />
          <br />
          <br />
        </div>
      </div>
    </Container>
  );
};
export default DetailList;
