import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import { updateProfile } from "firebase/auth";
import swal from 'sweetalert';

export default function UpdateName() {
  const [isEdit, setIsEdit] = useState("close")
  const [person, setPerson] = useState([])
  const [button, setButton] = useState("Save")

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      setPerson(user);
    }
  }, [])

  const changeUsername = (e) => {
    const value = e.target.value
    setPerson({ ...person, displayName: value })
    setButton("Save")
  }

  const edit = (e) => {
    e.preventDefault()
    setIsEdit("edit")
  }
  const close = (e) => {
    e.preventDefault()
    setIsEdit("close")
  }

  // const data = doc(db, "users", person.uid);
  // await updateDoc(data, {
  //   username: level,
  // });

  const setUsername = () => {
    if (person.displayName) {
      setButton(<Spinner color="light" size="sm">Loading...</Spinner>)
      const user = auth.currentUser
      updateProfile(user,
        {
          displayName: person.displayName,
        })
        .then(() => {
          setButton(<i className='fas fa-check'></i>)
          setIsEdit("done")
          swal({ icon: "succes", text: "Berhasil update username" })
          // console.log("Update username berhasil")
        })
        .catch((err) => {
          setButton(<i className="fas fa-ban"></i>)
          setIsEdit("done")
          swal({ icon: "error", text: "Update username gagal" })
          // console.log("Update username gagal")
        })
    }
  }

  return (
    <div>
      <Form >
        {
          isEdit === "close" ? (
            <FormGroup> {/* close */}
              <Label>Username :</Label>
              <div className="d-flex">
                <Input type="text" name="text" value={person.displayName} disabled="disabled" />
                <div className="mx-2"><Button color="primary" onClick={edit}>Edit</Button></div>
              </div>
            </FormGroup>
          ) : isEdit === "edit" ? (
            <FormGroup> {/* edit */}
              <Label>Username :</Label>
              <div className="d-flex">
                <Input type="text" name="text" value={person.displayName} onChange={changeUsername} />
                <div className="ml-2 py-2 align-item-center justify-item-center"><Button close onClick={close} /></div>
                <div className="mx-2"><Button color="primary" onClick={setUsername}>{button}</Button></div>
              </div>
            </FormGroup>
          ) : (
            <FormGroup> {/* done */}
              <Label>Username :</Label>
              <div className="d-flex">
                <Input type="text" name="text" placeholder={person.displayName} disabled="disabled" />
                <div className="mx-2"><Button color="primary" disabled>{button}</Button></div>
              </div>
            </FormGroup>
          )
        }
      </Form>
    </div>
  );
}
