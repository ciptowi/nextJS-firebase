import { auth, db } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { getDoc, doc, setDoc, getDocs, query, collection, where } from "firebase/firestore";
import Router from "next/router";
import swal from "sweetalert";

export const LOGIN_EMAIL_PASSWORD = "LOGIN_EMAIL_PASSWORD";
export const REGISTRASI_EMAIL_PASSWORD = "REGISTRASI_EMAIL_PASSWORD";
export const LOGIN_GOOGLE = "LOGIN_GOOGLE";
export const LOGIN_FACEBOOK = "LOGIN_FACEBOOK";
export const LOGOUT = "LOGOUT";

export const signIn = (credentials) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({
      type: LOGIN_EMAIL_PASSWORD,
      payload: {
        button: "Process..",
        score: 0,
      },
    });
    try {
      // Sign in with email & password
      const res = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = {
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.user.accessToken);

      const docRef2 = doc(db, "rps_game_points", user.uid);
      const docSnap2 = await getDoc(docRef2);
      var isPlayed = false;
      if (docSnap2.exists()) {
        var score = localStorage.setItem("score", docSnap2.data().total);
        isPlayed = true;
      }
      dispatch({
        type: LOGIN_EMAIL_PASSWORD,
        payload: {
          button: "Welcome",
          score: score,
          isPlayed: isPlayed,
        },
      });
      swal({ icon: "success", text: "Login Berhasil" });
      Router.push("/home");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          swal({ icon: "error", text: "Email tidak terdaftar" });
          dispatch({
            type: LOGIN_EMAIL_PASSWORD,
            payload: {
              button: "Login",
              score: 0,
            },
          });
          break;
        case "auth/wrong-password":
          swal({ icon: "error", text: "Password anda salah" });
          dispatch({
            type: LOGIN_EMAIL_PASSWORD,
            payload: {
              button: "Login",
              score: 0,
            },
          });
          break;
        default:
          swal({ icon: "error", text: error.code });
      }
    }
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    signOut(auth);
    localStorage.clear();
    const token = null;
    Router.push("/");
    dispatch({ type: "LOGOUT_SUCCESS", token });
    // swal({ text: "Anda berhasil Logout" });
  };
};

export const signUp = (credentials) => {
  return async (dispatch, getState, { getFirebase }) => {
    dispatch({
      type: REGISTRASI_EMAIL_PASSWORD,
      payload: {
        button: "Process..",
      },
    });
    try {
      // registrasi email & password
      const res = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = res.user;
      await updateProfile(auth.currentUser, {
        displayName: credentials.username,
        photoURL: "https://i.ibb.co/H4f3Hkv/profile.png",
      })
        .then(() => {
          // console.log("Profile updated")
        })
        .catch((error) => {
          // console.log(error, message)
        });
      // create doc user
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        uid: user.uid,
        username: credentials.username,
        level: "Easy",
        authProvider: "local",
        updatedAt: new Date(),
      });
      dispatch({
        type: REGISTRASI_EMAIL_PASSWORD,
        payload: {
          button: "Welcome",
        },
      });
      swal({ icon: "success", text: "Registrasi berhasil, silahkan Login" });
      Router.push("/login");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          swal({ icon: "error", text: "Email sudah terdaftar" });
          dispatch({
            type: REGISTRASI_EMAIL_PASSWORD,
            payload: {
              button: "Register",
            },
          });
          break;
        default:
          swal({ icon: "error", text: error.message });
          dispatch({
            type: REGISTRASI_EMAIL_PASSWORD,
            payload: {
              button: "Register",
            },
          });
      }
    }
  };
};

export const signInGoogle = (credentials) => {
  const googleProvider = new GoogleAuthProvider();

  return async (dispatch, getState, { getFirebase }) => {
    dispatch({
      type: LOGIN_GOOGLE,
      payload: {
        button: "Process..",
      },
    });
    try {
      // sign in with google
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const dataUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(dataUser));
      localStorage.setItem("token", user.accessToken);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      // console.log(docs.docs)
      if (docs.docs.length === 0) {
        // create doc user
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          username: user.displayName,
          level: "Easy",
          authProvider: "google",
          updatedAt: new Date(),
        });
      }
      const docRef2 = doc(db, "rps_game_points", user.uid);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.exists()) {
        var score = docSnap2.data().total;
        localStorage.setItem("score", score);
      }
      dispatch({
        type: LOGIN_GOOGLE,
        payload: {
          button: "Google",
        },
      });
      swal({ icon: "success", text: "Anda masuk dengan akun Google" });
      Router.push("/home");
    } catch (error) {
      // console.log(error.message)
      dispatch({
        type: LOGIN_GOOGLE,
        payload: {
          button: "Google",
        },
      });
      swal({ icon: "error", text: error.code });
    }
  };
};

export const signInFacebook = (credentials) => {
  const facebookProvider = new FacebookAuthProvider();

  return async (dispatch, getState, { getFirebase }) => {
    dispatch({
      type: LOGIN_FACEBOOK,
      payload: {
        button: "Process..",
      },
    });
    try {
      // sign in with facebook
      const res = await signInWithPopup(auth, facebookProvider);
      const user = res.user;
      const dataUser = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      localStorage.setItem("user", JSON.stringify(dataUser));
      localStorage.setItem("token", user.accessToken);
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        // set doc user
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          username: user.displayName,
          level: "Easy",
          authProvider: "facebook",
          updatedAt: new Date(),
        });
      }
      const docRef2 = doc(db, "rps_game_points", user.uid);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.exists()) {
        var score = docSnap2.data().total;
        localStorage.setItem("score", score);
      }
      dispatch({
        type: LOGIN_FACEBOOK,
        payload: {
          button: "Facebook",
        },
      });
      swal({ icon: "success", text: "Anda masuk dengan akun Facebook" });
      Router.push("/home");
    } catch (error) {
      // console.log(error.message)
      dispatch({
        type: LOGIN_FACEBOOK,
        payload: {
          button: "Facebook",
        },
      });
      switch (error.code) {
        case "auth/account-exists-with-different-credential":
          return swal({ icon: "error", text: "Email sudah terdaftar" });
        default:
          return swal({ icon: "error", text: error.code });
      }
    }
  };
};
