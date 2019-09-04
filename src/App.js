import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
//import backgroundImg from '../backgroundImage.jpg';
const whiteText = { 'color': 'white' };
const yellowText = { 'color': 'yellow' };


const NavBar = () => (
  <div className="navbar">
    <h3 style={whiteText}>Applica<span style={yellowText}>!</span></h3>
    {/* <Link to="/">Início</Link> */}
    {/* <Link to="/completed">Completed Tasks</Link> */}
  </div>
);

const Template = (props) => (
  <div>
    <NavBar />
    <p className="page-info">
      {props.title}:
    </p>
    <ul className={props.status}>
      <li>Task 1</li>
      <li>Task 2</li>
      <li>Task 3</li>
    </ul>
  </div>
);
const homeContainer = {
  // backgroundImage: 'url(' + backgroundImg + ')',
  backgroundSize: 'cover',
  // height: '90vh'
};
const Inicio = (props) => (
  <div>
    <NavBar />
    <div style={homeContainer}>
    </div>
  </div>
);

const CurrentTasks = () => (
  <Template title="Current Tasks" status="Current" />
);

const CompletedTasks = () => (
  <Template title="Completed Tasks" status="Completed" />
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Inicio} />
          {/* <Route exact path="/" component={CurrentTasks}/> */}
          <Route path="/completed" component={CompletedTasks} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;