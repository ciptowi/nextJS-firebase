import { getAuth } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { auth, db } from "../../firebase/config";

function AllUsers() {
  const [users, setUsers] = useState([])

  async function getUsers() {
    try {
      const array = []
      const q = query(collection(db, "users"), orderBy("level", "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setUsers(array);
    } catch (error) {
      // console.log(error.code)
    }
  }
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div>
      <hr />
      <h5 className="text-center">Users Game Rock Paper Scissors Info</h5>
      <Table borderless hover responsive size="sm" className="text-light">
        <thead>
          <tr>
            <th>Username</th>
            <th>Level</th>
            <th>Provider</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <tr index={user.id}>
                <td>{user.username}</td>
                <td>{user.level}</td>
                <td>{user.authProvider}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <br />
      <br />
      <br />
    </div>
  )
}

export default AllUsers