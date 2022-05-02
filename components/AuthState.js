import {useContext, useEffect} from "react";

import app from '../firebase'
import {getAuth} from "firebase/auth";
import {Context} from "../context";
import {axiosAuth} from "../actions/axios";

const AuthState = ({children}) => {
    const {dispatch} = useContext(Context);
    const auth = getAuth();
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                dispatch({
                    type: "LOGOUT",
                });
            } else {
                const {token} = await user.getIdTokenResult();
                console.log("TOKEN", token);
                axiosAuth.post("/auth", {}).then((res) => {
                 //   console.log("RES =====> ", res);
                    dispatch({
                        type: "LOGIN",
                        payload: {...res.data, token},
                    });
                });
            }
        });
    }, []);

    return <>{children}</>
}

export default AuthState;