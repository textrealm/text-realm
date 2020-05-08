import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class AboutFAQ extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' className='manoa-green'>

          <Grid.Column centered width={9}>
            <h1>About</h1>
            <p>TextRealm is an application which allows UHM students to avoid the hassle of buying and selling textbooks
            from the bookstore, and allows students to buy and sell their textbooks directly with other UHM students
            registered on this site. Our site allows registered users to rate other registered users based on their
            buying/selling experience to guarantee that you can confidently and easily buy and sell your textbooks.</p>
            <h1> Frequently Asked Questions </h1>
                <h2>Q: Where do I begin?</h2>
                <p>A: Registered users can sign-in in here. If you are not a registered user, you can register here.
                </p>
                <h2>Q: How do I sell my textbooks?</h2>

<p>A: Click on the ‘Sell A Textbook!’ option in the menu bar, which will direct you to a page where you must fill in the
required information about the textbook that you plan to sell. You must be logged in to be able to sell a textbook.</p>

          </Grid.Column>
        </Grid>
    );
  }
}

export default AboutFAQ;
