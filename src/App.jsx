import s from "./App.module.scss";
import { Routes, Route } from "react-router-dom";
//pages
import Main from "pages/Main/Main";
import Finance from "pages/Finance/Finance";

const App = () => {
  
  return (
    <div
      className={s.root}
    >
      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/finance"
          element={<Finance />}
        />
      </Routes>
    </div>
  );
};

export default App;
