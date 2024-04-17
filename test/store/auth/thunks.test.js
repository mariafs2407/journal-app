import { Password } from '@mui/icons-material';
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth';
import { checkingAuthentication, starLoginWithEmailPassword, startCreatingUserWithEmailPassword, startGoogleSignIn, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

//para exportar todo lo que este en firebase
jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
    
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );


    test('debe de invocar el checkingCredentials', async() => {
        
        //llamo al thunks
        await checkingAuthentication()( dispatch );
        //console.log(checkingCredentials())
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        
    });


    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => {
        //si todo salio bien true y el login creado para prueba
        const loginData = { ok: true, ...demoUser };
        
        await singInWithGoogle.mockResolvedValue(loginData);

        // thunk 
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async() => {
        //todo salio mal:false y el mensaje de error
        const errorMessage = 'Un error en Google';
        const loginData = { ok: false, errorMessage };
        await singInWithGoogle.mockResolvedValue( loginData );

        // thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: loginData.errorMessage }));

    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() =>{
        const loginData ={ok:true, ...demoUser};
        const formData = {email:demoUser.email, password:'123456',displayName: demoUser .displayName};
        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        //thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout - Error', async() =>{
        const errorMessage = 'Error al crear login';
        const loginData ={ok:false, errorMessage,...demoUser};
        const formData = {email:demoUser.email, password:'123456',displayName: demoUser .displayName};
        await registerUserWithEmailPassword.mockResolvedValue(loginData);

        //thunk
        await startCreatingUserWithEmailPassword(formData)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}));
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y login - Exito', async() => {
        
        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        //thunk
        await starLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y logout - Error', async() => {
        
        const errorMessage = 'Credenciales incorrectas';
        const loginData = { ok: false, errorMessage, ...demoUser  };
        const formData= {email:demoUser.email , password:'123456'}
        await loginWithEmailPassword.mockResolvedValue(loginData );

        //thunk
        await  starLoginWithEmailPassword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}))

    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
        
    });

    
});