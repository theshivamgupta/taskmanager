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
      <GuestRoute path="/accounts/login" component={Signin} />
      <Route path="/accounts/emailsignup" component={SignUp} />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  );
}

export default App;
