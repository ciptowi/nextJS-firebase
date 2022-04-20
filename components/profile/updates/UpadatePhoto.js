import { Button, Form, FormGroup, Label, Input, Progress, Spinner } from 'reactstrap';
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import swal from 'sweetalert';

export default function UpadatePhoto() {
  const [isEdit, setIsEdit] = useState("close")
  const [person, setPerson] = useState([])
  const [preview, setPreview] = useState("")
  const [file, setFile] = useState("")
  const [button, setButton] = useState("save")
  const [button2, setButton2] = useState("Update Photo")
  const [photoURL, setPhotoURL] = useState("")
  const [progress, setProgress] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      setPerson(user);
    }
  }, [])

  const changePhoto = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0])
    setPreview(url);
  }

  const edit = (e) => {
    e.preventDefault()
    setIsEdit("edit")
  }
  const close = (e) => {
    e.preventDefault()
    setIsEdit("close")
  }

  const uploadPhoto = () => {
    if (file) {
      setButton(<Spinner color="light" size="sm">Loading...</Spinner>)
      const storage = getStorage();
      const metadata = {
        contentType: 'image/jpeg',
      };
      const storageRef = ref(storage, 'images/users/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
          setProgress(progress)
          switch (snapshot.state) {
            case 'paused':
              setStatus('Upload is paused');
              break;
            case 'running':
              setStatus('Upload is running');
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              setStatus('storage/unauthorized')
              break;
            case 'storage/canceled':
              setStatus('storage/canceled')
              break;
            case 'storage/unknown':
              setStatus('storage/unknown')
              break;
          }
        },
        () => {
          getDownloadURL(ref(storage, 'images/users/' + file.name))
            .then((url) => {
              setStatus('Upload Success');
              setPhotoURL(url)
              setButton(<i className='fas fa-check'></i>)
              setIsEdit("done")
            })
            .catch((error) => {
              console.log(error.message)
            });
        }
      );
    } else {
      swal({ icon: "error", text: "Pilih photo dulu" })
    }
  }

  const setPhoto = (e) => {
    e.preventDefault()
    if (file) {
      setButton2(<Spinner color="light" size="sm">Loading...</Spinner>)
      const user = auth.currentUser
      updateProfile(user,
        {
          photoURL: photoURL,
        })
        .then(() => {
          setButton2(<i className='fas fa-check'></i>)
          setIsEdit("done")
          // console.log("Update photo berhasil")
          swal({ icon: "success", text: "Berhasil update photo" })
        })
        .catch((err) => {
          setButton2(<i className="fas fa-ban"></i>)
          setIsEdit("done")
          // console.log("Update photo gagal")
          swal({ icon: "error", text: "Update photo gagal" })
        })
    }
  }

  return (
    <div>
      {
        preview ? (
          <img src={preview} className="rounded-circle" alt="Profile" width={200} height={200} />
        ) : person.photoURL === null ? (
          <img src="/user.png" className="rounded-circle" alt="Profile" width={200} height={200} />
        ) : person.photoURL ? (
          <img src={person.photoURL} className="rounded-circle" alt="Profile" width={200} height={200} />
        ) : ""
      }
      <Form>
        {
          !file && isEdit === "close" ? (
            <FormGroup>
              <div className="d-flex mt-3">
                <Label>Foto Profile :</Label>
                <div className="mx-2"><Button color="primary" onClick={edit}>Edit</Button></div>
              </div>
            </FormGroup>
          ) : ""
        }
        {
          isEdit === "edit" ? (
            <FormGroup>
              {progress ? <Progress value={progress}>{progress}%</Progress> : ""}
              <div className="d-flex mt-3">
                <Input type="file" name="file" onChange={changePhoto} />
                <div className="ml-2 py-2 align-item-center justify-item-center"><Button close onClick={close} /></div>
                <Button color="primary" onClick={uploadPhoto}>{button}</Button>
              </div>
            </FormGroup>
          ) : isEdit === "done" ? (
            <div className="mt-3 text-center">
            </div>
          ) : ""
        }
        {
          status ? <Button color="primary" onClick={setPhoto}>{button2}</Button> : ""
        }

      </Form>
    </div>
  );
}
