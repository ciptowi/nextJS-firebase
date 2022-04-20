import { Button } from 'reactstrap';
import styles from './Auth.module.css'
import { signInFacebook } from '../../redux/actions/authActions';
import { connect } from 'react-redux';

function SignFacebook(props) {
  const { buttonFacebook } = props

  const handleClick = async (e) => {
    e.preventDefault();
    await props.signInFacebook();
  }

  return (
    <div>
      <Button onClick={handleClick} outline color="secondary" className="btn mx-2 px-2">
        <img
          src="https://www.freepnglogos.com/uploads/facebook-logo-icon/facebook-logo-clipart-flat-facebook-logo-png-icon-circle-22.png"
          alt=""
          className={styles.btn_img}
        />
        <span>{buttonFacebook}</span>
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    buttonFacebook: state.auth.buttonFacebook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInFacebook: (creds) => dispatch(signInFacebook(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignFacebook);