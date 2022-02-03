import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';

import { auth, provider } from "../firebase/firebase";

import { useStateValue } from "../state/StateProvider";
import { actionTypes } from "../state/reducer";

import "../css/login.css";

function Login() {
    const dispatch = useStateValue()[1];
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((err) => alert(err.message));

        return true;
    };
    return (
        <div className="login">
            <div className="login__container">

                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Logo" />

                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button
                    onClick={signIn}
                    variant="contained"
                    color="primary"
                    startIcon={<Google />}
                    type="submit">Sign In With Google</Button>
            </div>
        </div>
    );
}

export default Login;
