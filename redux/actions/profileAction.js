import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { Spinner } from "reactstrap";
import swal from "sweetalert";
import { auth } from "../../firebase/config";

export const UPDATE_PHOTO = "UPDATE_PROFILE"
export const UPDATE_NAME = "UPDATE_PROFILE"
export const UPDATE_EMAIL = "UPDATE_PROFILE"
export const UPDATE_PASSWORD = "UPDATE_PROFILE"


export const forUpdatePhoto = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PHOTO,
      buttonProfile: <Spinner color="light" size="sm">Loading...</Spinner>,
      info: "close"
    })
    const user = auth.currentUser
    updateProfile(user,
      {
        photoURL: credentials.photoURL,
      })
      .then(() => {
        dispatch({
          type: UPDATE_PHOTO,
          buttonProfile: <i className='fas fa-check'></i>,
          info: "done",
        })
        swal({ icon: "succes", text: "Update photo berhasil" })
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PHOTO,
          buttonProfile: <i className="fas fa-ban"></i>,
          info: "done",
        })
        swal({ icon: "error", text: "Update photo gagal" })
      })
  }
}

export const forUpdateName = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_NAME,
      buttonProfile: <Spinner color="light" size="sm">Loading...</Spinner>,
      info: "done",
    })
    const user = auth.currentUser
    updateProfile(user,
      {
        displayName: credentials.displayName,
      })
      .then(() => {
        dispatch({
          type: UPDATE_NAME,
          buttonProfile: <i className='fas fa-check'></i>,
          info: "done",
        })
        swal({ icon: "succes", text: "Update username berhasil" })
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_NAME,
          buttonProfile: <i className="fas fa-ban"></i>,
          info: "done",
        })
        swal({ icon: "error", text: "Update username gagal" })
      })
  }
}

export const forUpdateEmail = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_EMAIL,
      buttonProfile: <Spinner color="light" size="sm">Loading...</Spinner>,
      info: "done",
    })
    const user = auth.currentUser
    updateEmail(user, credentials.email)
      .then(() => {
        dispatch({
          type: UPDATE_EMAIL,
          buttonProfile: <i className='fas fa-check'></i>,
          info: "done",
        })
        swal({ icon: "succes", text: "Update email berhasil" })
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_EMAIL,
          buttonProfile: <i className="fas fa-ban"></i>,
          info: "done",
        })
        swal({ icon: "error", text: "Update email gagal" })
      })
  }
}

export const forUpdatePassword = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PASSWORD,
      buttonProfile: <Spinner color="light" size="sm">Loading...</Spinner>,
      info: "done",
    })
    const user = auth.currentUser
    updatePassword(user, person.password)
      .then(() => {
        dispatch({
          type: UPDATE_PASSWORD,
          buttonProfile: <i className='fas fa-check'></i>,
          info: "done",
        })
        swal({ icon: "succes", text: "Update password berhasil" })
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_PASSWORD,
          buttonProfile: <i className="fas fa-ban"></i>,
          info: "done",
        })
        swal({ icon: "error", text: "Update password gagal" })
      })
  }
}

// export const updateProfileUser = (credentials) => {
//   const changeProfile = () => {
//     updateProfile(auth.currentUser,
//       {
//         photoURL: credentials.newPhotoURL,
//         displayName: credentials.newDisplayName,
//       }).then(() => {
//         console.log("profile updated")
//       }).catch((error) => {
//         console.log(error.message)
//       })
//   }
//   const changeEmail = () => {
//     updateEmail(auth.currentUser, credentials.newEmail).then(() => {
//       console.log("email updated")
//     }).catch((error) => {
//       console.log(error.message)
//     })
//   }

//   const changePassword = () => {
//     updatePassword(auth.currentUser, credentials.newPassword).then(() => {
//       console.log("password updated")
//     }).catch((error) => {
//       console.log(error.message)
//     })
//   }

//   return (dispatch) => {
//     dispatch({
//       type: UPDATE_PROFILE,
//       button: <Spinner color="light" size="sm">Loading...</Spinner>
//     })
//     //update profile
//     const user = signInWithEmailAndPassword(auth, credentials.confirmEmail, credentials.confirmPassword)
//     console.log(user)
//     changeProfile()
//     changeEmail()
//     changePassword()
//       .then(() => {
//         console.log("Data Updated")
//         signOut(auth);
//         localStorage.clear();
//         Router.push("/login");
//         swal({ icon: "success", text: "Update berhasil, silahkan login" });
//         dispatch({
//           type: UPDATE_PROFILE,
//           button: <i className='fas fa-check'></i>
//         })
//       })
//       .catch((err) => {
//         console.log(err.message)
//         swal({ icon: "error", text: "Update Failed" });
//         dispatch({
//           type: UPDATE_PROFILE,
//           button: <i className="fas fa-ban"></i>
//         })
//       })
//   }
// }