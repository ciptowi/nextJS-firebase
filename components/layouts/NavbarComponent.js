import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Badge } from "reactstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { signOut } from "../../redux/actions/authActions";

function NavbarComponent(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [score, setScore] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");
  const { scoreRedux, scoreRedux2 } = props;

  // const user = auth.currentUser;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const test = JSON.parse(localStorage.getItem("user"));
    const _score = localStorage.getItem("score");
    if (token) {
      setDisplayName(test.displayName);
      setPhotoURL(test.photoURL);
      setUid(test.uid);
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
  }, [scoreRedux2]);

  const changeToggle = () => {
    setIsOpen(!isOpen);
  };
  // const logout = () => {
  //   signOut(auth);
  //   router.push("/login");
  //   console.log("Logout berhasil");
  // };
  // console.log(score, scoreRedux2);
  const Ternary = () => {
    if (displayName !== null && displayName !== "") {
      return (
        <>
          {photoURL ? (
            <NavItem>
              <img src={photoURL} className="rounded-circle" alt="Profile" width={40} height={40} />
            </NavItem>
          ) : (
            <NavItem>
              <img src="/user.png" className="rounded-circle" alt="Profile" width={40} height={40} />
            </NavItem>
          )}
          <NavItem>
            <Link href={"/profile/" + [uid]}>
              <a className="nav-link">
                {displayName}
                <span className="score_info">
                  <Badge color="danger" pill>
                    {scoreRedux2 === -1 ? score : score !== scoreRedux2 && scoreRedux2 >= 0 ? scoreRedux2 : scoreRedux2}
                  </Badge>
                </span>
              </a>
            </Link>
          </NavItem>
          <NavItem>
            <a href="#" onClick={props.signOut} className="nav-link">
              Logout
            </a>
          </NavItem>
        </>
      );
    } else {
      return (
        <>
          <NavItem>
            <Link href="/login">
              <a className="nav-link">Login</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/register">
              <a className="nav-link">Register</a>
            </Link>
          </NavItem>
        </>
      );
    }
  };
  return (
    <div className="px-lg-5 shadow bg_navbar navbar-dark rounded fixed-top">
      <Navbar expand="md">
        <Link href="/">
          <a className="navbar-brand">Gaming Platform</a>
        </Link>
        <NavbarToggler onClick={changeToggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link href="/home">
                <a className="nav-link">Home</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/games/list">
                <a className="nav-link">Game List</a>
              </Link>
            </NavItem>
          </Nav>
          <Nav className="ml-auto" navbar>
            <Ternary />
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    token: state.auth.token,
    scoreRedux: state.auth.scoreRedux,
    scoreRedux2: state.game.scoreRedux,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
