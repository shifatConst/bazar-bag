import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                // console.log('result', result);
                // console.log('user', result.user.displayName, result.user.email);
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                // console.log(signedInUser);
                // console.log('user', result.user);
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <div className="text-center mt-5">
            <button className="btn btn-success" onClick={handleGoogleSignIn}> Login with google </button>
        </div>
    );
};

export default Login;