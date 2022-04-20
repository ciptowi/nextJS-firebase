import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../redux/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "../styles/globals.css";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
// import app from "../firebase/config";

const store = createStore(rootReducer, compose(applyMiddleware(thunk.withExtraArgument({ getFirebase }))));

// const rrfConfig = {
//   apiKey: "AIzaSyCgeXImMnFbA5qdDGmylKVduxZZSg8imlU",
//   authDomain: "auth-ix.firebaseapp.com",
//   projectId: "auth-ix",
//   storageBucket: "auth-ix.appspot.com",
//   messagingSenderId: "984262885855",
//   appId: "1:984262885855:web:2444844f011e227e05446a",
// }; // react-redux-firebase config

// const rrfProps = {
//   app,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance,
// };

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/* <ReactReduxFirebaseProvider {...rrfProps}> */}
      <Component {...pageProps} />
      {/* </ReactReduxFirebaseProvider> */}
    </Provider>
  );
}

export default MyApp;
