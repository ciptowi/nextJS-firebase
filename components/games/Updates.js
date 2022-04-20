import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";

const Updates = ({ detail }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(detail);
  }, []);
  return (
    //items.map((item, idx) => {
    <Container>
      <Row>
        <div>
          <style>
            {`.leaderboards {
                max-width: 100%;
                display: flex;
                padding: 10px;
                flex-direction: column;
                justify-content: center;
                // background: #EEEEEE;
                padding-bottom: 200px;
              }
              a {
                text-decoration: none;
                color: inherit;
              }
              a:hover {
                color:inherit; 
                text-decoration:none; 
                cursor:pointer;
              }`}
          </style>
          <h3>{items.game}</h3>
          <div className="container d-flex leaderboards">
            <div className="row">
              <div className="col-md-8">
                <img alt="Thumbnail Game" className="img-fluid" style={{ height: 200 }} src={items.thumbnail}></img>
              </div>
              <div className="col-md-4">
                <h3>Detail</h3>
                <p>Updated on : {items.release_date}</p>
                <p>Version : {items.version}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">{items.description}</div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
    //});
  );
};

export default Updates;
