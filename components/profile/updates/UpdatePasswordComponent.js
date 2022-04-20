import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import { updatePassword } from "firebase/auth";
import swal from 'sweetalert';


export default function UpdatePasswordComponent() {
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

  const changePassword = (e) => {
    const value = e.target.value
    setPerson({ ...person, password: value })
  }

  const edit = (e) => {
    e.preventDefault()
    setIsEdit("edit")
  }
  const close = (e) => {
    e.preventDefault()
    setIsEdit("close")
  }

  const setPassword = () => {
    if (person.password) {
      setButton(<Spinner color="light" size="sm">Loading...</Spinner>)

      const user = auth.currentUser
      updatePassword(user, person.password)
        .then(() => {
          setButton(<i className='fas fa-check'></i>)
          setIsEdit("done")
          swal({ icon: "succes", text: "Berhasil update password" })
          // console.log("Update password berhasil")
        })
        .catch((err) => {
          setButton(<i className="fas fa-ban"></i>)
          swal({ icon: "error", text: "Update password gagal" + err.message })
          // console.log("Update password gagal" + err.message)
        })
    }
  }

  return (
    <div>
      <Form>
        {
          isEdit === "close" ? (
            <FormGroup> {/* close */}
              <Label>Password :</Label>
              <div className="d-flex">
                <Input type="password" name="password" Value={person.password} disabled="disabled" />
                <div className="mx-2"><Button color="primary" onClick={edit}>Edit</Button></div>
              </div>
            </FormGroup>
          ) : isEdit === "edit" ? (
            <FormGroup> {/* edit */}
              <Label>Password :</Label>
              <div className="d-flex">
                <Input type="password" name="password" value={person.password} onChange={changePassword} />
                <div className="ml-2 py-2 align-item-center justify-item-center"><Button close onClick={close} /></div>
                <div className="mx-2"><Button color="primary" onClick={setPassword}>{button}</Button></div>
              </div>
            </FormGroup>
          ) : (
            <FormGroup> {/* done */}
              <Label>Password :</Label>
              <div className="d-flex">
                <Input type="password" name="password" placeholder={person.password} disabled="disabled" />
                <div className="mx-2"><Button color="primary" disabled>{button}</Button></div>
              </div>
            </FormGroup>
          )
        }
      </Form>
    </div>
  );
}
