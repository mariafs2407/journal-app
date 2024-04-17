//como se espera el estado inicial
export const initialState = {
    status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

//cuando esta autenticado:login
export const authenticatedState = {
    status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: '100ABC',
    email: 'Demo_pepito@google.com',
    displayName: 'Demo Pepito',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

//logout
export const notAuthenticatedState = {
    status: 'not-authenticated', // 'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

//para probar usuario
export const demoUser = {
    uid: 'ABC100',
    email: 'demo2@google.com',
    displayName: 'Demo User2',
    photoURL: 'https://foto.jpg'
}