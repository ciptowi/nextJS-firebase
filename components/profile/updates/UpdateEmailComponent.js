import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import { updateEmail } from "firebase/auth";

export default function UpdateEmailComponent() {
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

  const changeEmail = (e) => {
    const value = e.target.value
    setPerson({ ...person, email: value })
  }

  const edit = (e) => {
    e.preventDefault()
    setIsEdit("edit")
  }
  const close = (e) => {
    e.preventDefault()
    setIsEdit("close")
  }

  const setEmail = () => {
    if (person.email) {
      setButton(<Spinner color="light" size="sm">Loading...</Spinner>)

      const user = auth.currentUser
      updateEmail(user, person.email)
        .then(() => {
          setButton(<i className='fas fa-check'></i>)
          setIsEdit("done")
          swal({ icon: "succes", text: "Berhasil update email" })
          // console.log("Update email berhasil")
        })
        .catch((err) => {
          setButton(<i className="fas fa-ban"></i>)
          setIsEdit("done")
          swal({ icon: "error", text: "Update email gagal" + err.message })
          // console.log("Update email gagal" + err.message)
        })
    }
  }

  return (
    <div>
      <Form>
        {
          isEdit === "close" ? (
            <FormGroup> {/* close */}
              <Label>Email :</Label>
              <div className="d-flex">
                <Input type="email" name="email" value={person.email} disabled="disabled" />
                <div className="mx-2"><Button color="primary" onClick={edit}>Edit</Button></div>
              </div>
            </FormGroup>
          ) : isEdit === "edit" ? (
            <FormGroup> {/* edit */}
              <Label>Email :</Label>
              <div className="d-flex">
                <Input type="email" name="email" value={person.email} onChange={changeEmail} />
                <div className="ml-2 py-2 align-item-center justify-item-center"><Button close onClick={close} /></div>
                <div className="mx-2"><Button color="primary" onClick={setEmail}>{button}</Button></div>
              </div>
            </FormGroup>
          ) : (
            <FormGroup> {/* done */}
              <Label>Email :</Label>
              <div className="d-flex">
                <Input type="email" name="email" placeholder={person.email} disabled="disabled" />
                <div className="mx-2"><Button color="primary" disabled>{button}</Button></div>
              </div>
            </FormGroup>
          )
        }
      </Form>
    </div>
  );
}
