import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Link from "next/link";

const Leaderboards = ({ leaderboards, leaderboards_id }) => {
  const [items, setItems] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setItems(leaderboards);
    setIds(leaderboards_id);
  }, [leaderboards]);
  const slides = items.map((item, idx) => {
    return (
      <tr key={idx + 1}>
        <th scope="row">{idx + 1}</th>
        <td>
          <Link href={"/profile/" + ids[idx]}>{item.username}</Link>
        </td>
        <td>{item.total}</td>
      </tr>
    );
  });

  return (
    <div>
      <style>
        {`.leaderboards {
            max-width: 100%;
            height: 205px;
            display: flex;
            flex-direction: column;
            font-size:14px;
          }

          #lead td {
            padding: 2px 2px 2px 2px;
            margin:0px;
            height: 40px;
            vertical-align:middle;
          }

          #lead th {
            padding: 2px 2px 2px 15px;
            margin:0px;
            height: 40px;
            vertical-align:middle;
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
      <h3>LEADERBOARDS</h3>
      <div className="container d-flex leaderboards">
        <div className="row">
          <Table id="lead" striped>
            <tbody>{slides}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
