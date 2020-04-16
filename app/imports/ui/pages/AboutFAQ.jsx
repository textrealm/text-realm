import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class AboutFAQ extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column>
            <h1>About</h1>
            <p>TextRealm is an application which allows UHM students to avoid the hassle of buying and selling textbooks from the bookstore, and allows students to buy 
			and sell their textbooks directly with other UHM students registered on this site. Our site allows registered users to rate other registered users based on their 
			buying/selling experience to guarantee that you can confidently and easily buy and sell your textbooks.</p>
			<h1> Frequently Asked Questions </h1>
			<p> 
			Q: Where do I begin?
			<br></br>
			<br></br>

A: Registered users can sign-in in here. //this will be a link later
<br></br>
If you are not a registered user, you can register here. //this will be also be a link
<br></br>
<br></br>

Q: How do I sell my textbooks?
<br></br>
<br></br>

A: Click on the ‘Sell A Textbook!’ option in the menu bar, which will direct you to a page where you must fill in the 
required information about the textbook that you plan to sell. You must be logged in to be able to sell a textbook. 
</p>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AboutFAQ;
