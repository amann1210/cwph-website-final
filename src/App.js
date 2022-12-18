import "./App.css";
import { BrowserRouter as Router, Switch ,Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Activities from "./components/Activities/Activities";
import Team from "./components/Team/Team";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ContactUs from "./components/ContactUs/ContactUs";
import About from "./components/About/About";
import Developers from "./components/Developers/Developers";
import ActivityDetails from './components/Activity-Details/ActivityDetails'
import Login from './components/Login/Login'
import Discussion from "./components/Discussion/Discussion";
import CreatePost from "./components/AdminPanel/CreatePost"
import { auth } from "./firebase-config";
import { useState } from "react";
import { useEffect } from "react";
import Instagram from "./Instagram/Instagram";

function App() {

  let [IsAuth,setIsAuth] = useState(false) 
  return (
    <div>
      <Header IsAuth = {IsAuth} SetIsAuth = {setIsAuth}/>
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/activities">
              <Activities />
            </Route>
            <Route exact path="/team">
              <Team />
            </Route>
            <Route exact path="/contact">
              <ContactUs />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/developers">
              <Developers/>
            </Route>
            <Route exact path="/activities/:id">
              <ActivityDetails />
            </Route>
            <Route exact path="/login" >
              <Login setIsAuth = {setIsAuth} />
            </Route>
            <Route exact path="/discussion" >
              <Discussion  />
            </Route>
            <Route exact path="/createpost" >
              <CreatePost  />
            </Route>
            <Route exact path="/instagram" >
              <Instagram  />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
