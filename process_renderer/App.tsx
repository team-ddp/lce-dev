import React from "react";
import { Provider } from "react-redux";
import Window from "./pages/Index";
import GlobalStyle from "./global-styles";
import { store } from "./store/store";

const App = () => {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <Provider store={store}>
        <Window />
      </Provider>
      {/* <Window /> */}
    </React.StrictMode>
  );
};

export default App;
