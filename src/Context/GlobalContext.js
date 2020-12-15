import { createContext, useReducer } from "react";

export const GlobalContext = createContext();

const initialState = {
  isLogin: false, //sementara
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
        },
        isLogin: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLogin: false,
      };
    case "LOADED":
      return {
        ...state,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
        },
        isLogin: true,
      };
    default:
      throw new Error();
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};
