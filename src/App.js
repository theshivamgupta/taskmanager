import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import Dashboard from "./pages/Dashboard";
// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";
import Signin from "./pages/Signin";
import TaskPage from "./pages/TaskPage";
function App() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return (
      <Switch>
        <Route path="/accounts/login" component={Signin} />
        <Route path="/accounts/emailsignup" component={SignUp} />
        <Redirect to="/accounts/login" />
      </Switch>
    );
  }

  return (
    <Switch>
      <GuestRoute exact path="/accounts/login" component={Signin} />
      <GuestRoute exact path="/accounts/emailsignup" component={SignUp} />
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/t/:taskId" component={TaskPage} />
    </Switch>
  );
}

export default App;
