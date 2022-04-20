import { Button } from "reactstrap";
import { useEffect, useState } from "react";
import { Badge, Table } from "reactstrap";
import Link from "next/link";
import { connect } from "react-redux";

function UserDetail(props) {
  const [dataUser, setDataUser] = useState([])
  const [score, setScore] = useState([])
  const { scoreRedux2 } = props;

  const getUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      setDataUser(user);
    }
  }

  useEffect(() => {
    getUser()
    const token = localStorage.getItem("token");
    const _score = localStorage.getItem("score");
    if (token) {
      if (_score === null) {
        setScore(0);
      } else {
        setScore(localStorage.getItem("score"));
      }
    }
    if (score !== scoreRedux2 && scoreRedux2 !== -1) {
      localStorage.setItem("score", scoreRedux2);
      setScore(scoreRedux2);
    }
  }, [scoreRedux2])
  return (
    <div>
      <div className="mt-4 text-center">
        {
          dataUser.photoURL ? (
            <img src={dataUser.photoURL} className="rounded-circle" alt="Profile" width={250} height={250} />
          ) : (
            <img src="/user.png" className="rounded-circle" alt="Profile" width={250} height={250} />
          )
        }
        <div className="justify-item-center">
          <div className="d-flex">
            <h3>{dataUser.displayName}</h3><span><Badge color="info" pill>
              {scoreRedux2 === -1 ? score : score !== scoreRedux2 && scoreRedux2 >= 0 ? scoreRedux2 : scoreRedux2}
            </Badge></span>
          </div>

        </div>
      </div>
      <Table borderless responsive size="sm" className="text-light">
        <tbody>
          <tr>
            <th scope="row">Email</th>
            <td>: {dataUser.email}</td>
          </tr>
        </tbody>
      </Table>
      <div className="mt-2 text-center">
        <Link href={"/profile/update/" + dataUser.uid}>
          <Button color="primary">Update Profile</Button>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    scoreRedux: state.auth.scoreRedux,
    scoreRedux2: state.game.scoreRedux,
  };
};

export default connect(mapStateToProps)(UserDetail);