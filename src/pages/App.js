import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./Mainpage";
import { DataProvider } from "../DataContext";
import Login from "./Login";
import Register from "./Register";
import Details from "./Details";
import Profile from "./Profile";

const App = () => (
  <DataProvider>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Mainpage} />

          <Route exact path="/login" Component={Login}></Route>

          <Route exact path="/register" Component={Register}></Route>

          <Route exact path="/details/:name" Component={Details}></Route>

          <Route exact path="/profile" Component={Profile}></Route>
        </Routes>
      </div>
    </Router>
  </DataProvider>
);

export default App;
