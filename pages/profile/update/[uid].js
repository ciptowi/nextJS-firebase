import Layout from "../../../components/layouts/Layout";
import { Button, Col, Container, Row } from 'reactstrap';
import UpdatePhoto from '../../../components/profile/updates/UpadatePhoto'
import UpdateName from "../../../components/profile/updates/UpdateName";
import UpdateEmailComponent from "../../../components/profile/updates/UpdateEmailComponent";
import UpdatePasswordComponent from "../../../components/profile/updates/UpdatePasswordComponent";
import { signOut } from "../../../redux/actions/authActions";
import { connect } from "react-redux";
import { auth } from "../../../firebase/config";
import Router from "next/router";
import { useEffect } from "react";

function ProfileUpdate(props) {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
    }
  }, [])

  const refresh = () => {
    signOut(auth);
    localStorage.clear();
    Router.push("/login");
    swal({ text: "Silahkan Login kembali" });
  }

  return (
    <div>
      <Layout title="Update Profile">
        <Container>
          <Row className="mt-3 justify-content-center">
            <Col lg="4">
              <div className="mt-5 text-center mb-3">
                <h3>Update Your Profile</h3>
                <UpdatePhoto />
              </div>
              <UpdateName />
              <UpdateEmailComponent />
              <UpdatePasswordComponent />
              <div className="text-center"><h6>Silakhakn "Refresh" dan login kembali untuk memulihkan data</h6></div>
              <div className="pt-3 text-center">
                <Button color="success" onClick={refresh} className="">
                  Refresh
                </Button>
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <br />
        </Container>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapDispatchToProps)(ProfileUpdate)