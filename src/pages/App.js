import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "../components/Mainpage";
import { DataProvider } from "../DataContext";
import Login from "../components/Login";
import Register from "../components/Register";

const App = () => (
  <DataProvider>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Mainpage} />

          <Route exact path="/login" Component={Login}></Route>

          <Route exact path="/register" Component={Register}></Route>
        </Routes>
      </div>
    </Router>
  </DataProvider>
);

export default App;
