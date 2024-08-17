import "./styles/main.scss";
import { Provider } from 'react-redux';
import AppRouter from "./routers/AppRouter";
import store from "./redux/store/store";
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from "./components/context/userContext";
import { useState } from "react";

function App() {
  const [user, setUser] = useState("John")
  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <Provider store={ store }>
          <AppRouter />
        </Provider>
      </UserContext.Provider>
    </div>
  )
}

export default App
