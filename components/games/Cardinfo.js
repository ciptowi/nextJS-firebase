import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText, Button, Table } from "reactstrap";
import swal from "sweetalert";
import { useRouter } from "next/router";
const CardInfo = ({ detailGame2, gameId }) => {
  const [data, setData] = useState([]);
  const [gid, setGid] = useState("");
  let cardInfo;
  const router = useRouter();
  useEffect(() => {
    setData(detailGame2);
    setGid(gameId);
  }, [data]);

  if (data.length) {
    cardInfo = data.map((d) => {
      return (
        <Card className="bg-transparent border-light">
          <CardBody>
            <CardTitle tag="h5">
              <b>{d.name}</b>
              <br></br>
            </CardTitle>
            <div className="scrollspy-example" data-bs-spy="scroll">
              <Table borderless responsive size="sm" className="text-light">
                <tbody>
                  <tr>
                    <th>Developer</th>
                    <th>: {d.developer}</th>
                  </tr>
                  <tr>
                    <th>Genre</th>
                    <th>: {d.genre}</th>
                  </tr>
                  <tr>
                    <th>Release Date</th>
                    <th>: {d.release_date}</th>
                  </tr>
                </tbody>
              </Table>
              <Button
                color="primary"
                onClick={() => {
                  if (gid === "l9Ay2BQwtsJc7kfgfOp7") {
                    router.push("/games/rps");
                  } else {
                    swal("Error", "Mohon maaf saat ini game sedang maintenance", "error");
                  }
                }}
              >
                Play Now
              </Button>
            </div>
          </CardBody>
        </Card>
      );
    });
  }

  return (
    <div className="mt-2">
      <h3>Detail Game</h3>
      <div
        style={{
          display: "block",
        }}
      >
        {cardInfo}
      </div>
    </div>
  );
};

export default CardInfo;
