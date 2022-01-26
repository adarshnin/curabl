
import { Switch, Route, Redirect } from "react-router-dom";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Payment from "./pages/Payment";
import Appointment from "./pages/Appointment";
import Scheduling from "./pages/Scheduling";
import myAppointments from "./pages/myAppointments"
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import RocketChat from "./pages/RocketChat";
// import VideoCall from "./pages/VideoCall
import Main from "./components/layout/Main";
import TabToolbar from "./pages/Tabs";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/tables" component={Tables} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/payment" component={Payment} />
          <Route exact path="/appointment" component={Appointment} />
          <Route exact path="/scheduling" component={Scheduling} />
          <Route exact path="/myappointments" component={myAppointments} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/editprofile" component={EditProfile} />
          <Route exact path="/chat" component={RocketChat} />
          {/* <Toolbar> */}
          <Route exact path="/call" component={TabToolbar} />
          {/* </Toolbar> */}
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
