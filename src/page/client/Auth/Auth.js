import { useSelector } from "react-redux";
import SignIn from "components/client/auth/SignIn";
import SignUp from "components/client/auth/SignUp";

const Auth = ({auth}) => {

    return (
        <>
            {auth.openModal
                && <SignUp auth={auth} />}
            {auth.openModalSignIn
                && <SignIn auth={auth}/>}
        </>
    )
}


export default Auth;
