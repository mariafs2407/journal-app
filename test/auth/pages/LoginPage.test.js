import { Provider, useDispatch } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { configureStore } from "@reduxjs/toolkit";
import {
  authSlice,
  starGoogleSignIn,
  starLoginWithEmailPassword,
} from "../../../src/store/auth";
import { fireEvent, render, screen } from "@testing-library/react";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

//mock para los thunks
const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSingIn, // Mockear el thunk startGoogleSignIn
  starLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  //sobreescribir el usedispatch, regresa una funcion y esa llama la funcion
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  //precargar un estado, para q se habilite el boton de google
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Pruebas en LoginPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe mostrar el componente correctamente", () => {
    //renderizamos el componente
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    //screen.debug()
    // screen para buscar login , para ver si se renderizo,tiene q haber por lo menos 1
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("boton de google debe de llamar el startGoogleSignIn", () => {
    //renderizamos el componente
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    //screen.debug()
    const BotonGoogle = screen.getByLabelText("google-btn");
    //console.log(BotonGoogle)
    fireEvent.click(BotonGoogle);
    expect(mockStartGoogleSingIn).toHaveBeenCalledWith();
  });

  test("submit debe de llamar startLoginWithEmailPassword", () => {
    const email = "pepito@google.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    //screen.debug()
    //label
    const emailField = screen.getByRole("textbox", { name: "Correo" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    //'data-testid':'password'
    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    //aria-label='submit-form'
    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });

  
});
