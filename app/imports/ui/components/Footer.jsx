import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', backgroundColor: '#3B7A57',
        color: 'white', width: '100%', position: 'fixed' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              TextRealm <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a href='https://textrealm.github.io/'>Project Home Page</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
