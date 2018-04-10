import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar.jsx';
import MainFeature from './MainFeature.jsx';
import About from './About.jsx';
import Links from './Links.jsx';

/**
 * Description:
 * App component renders all views for the application.
 * Its State holds all data and disseminates it to all
 * React sub-components.
 *
 * @prop - none.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      navStates: ['home', 'about', 'next', 'back'],
    };

    this.onNavBarClick = this.onNavBarClick.bind(this);
  }

  onNavBarClick (e) {
    const view = e.target.value.toLowerCase();
    this.setState({ view, });
  }

  viewSelector (section) {
    const views = {
      main: {
        home: <MainFeature />,
        about: <About />,
      },
      footer: {
        home: <Links />,
        about: <Links />,
      }
    };

    return views[section][this.state.view];
  }

  render() {
    return (
      <div className="page">
        <header className="header">
          <NavBar onNavBarClick={this.onNavBarClick} navStates={this.state.navStates}/>
        </header>
        <main className="main">
         {this.viewSelector('main')}
        </main>
        <footer className="footer">
         {this.viewSelector('footer')}
        </footer>
      </div>
    )
  }
}

App.propTypes = {
};

export default App;





