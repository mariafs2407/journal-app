//son funciones que retornan una funcion asincronas, todas
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, logout ,login} from "./authSlice";

export const checkingAuthentication = () =>{
    return async(dispatch) =>{
        dispatch(checkingCredentials());

    }
}
// es recomendable q inicien con start*

export const startGoogleSignIn = () =>{
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();
        //si sale error
        if ( !result.ok ) return dispatch( logout( {errorMessage: result.errorMessage}) );

        //logeamos al usuario
        dispatch( login( result ))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );//cambie el estado a checking

        const result = await registerUserWithEmailPassword({ email, password, displayName });
        //console.log(result)
        //si sale error
        if ( !result.ok ) return dispatch( logout( {errorMessage: result.errorMessage}) );

        //logeamos al usuario
        dispatch( login( result ))

    }

}

export const starLoginWithEmailPassword = ({email,password}) =>{
    return async( dispatch ) => {

        dispatch( checkingCredentials() );//cambie el estado a checking

        const result = await loginWithEmailPassword({ email, password });
        //console.log(result)
        //si sale error
        if ( !result.ok ) return dispatch( logout( {errorMessage: result.errorMessage}) );

        //logeamos al usuario
        dispatch( login( result ))

    }
}

export const startLogout = () =>{
    return async(dispatch) =>{
        await logoutFirebase();
        dispatch(clearNotesLogout())
        dispatch( logout( ))
    }
}
