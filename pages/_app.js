import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../redux/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "../styles/globals.css";
import { getFirebase } from "react-redux-firebase";

const store = createStore(rootReducer, compose(applyMiddleware(thunk.withExtraArgument({ getFirebase }))));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
