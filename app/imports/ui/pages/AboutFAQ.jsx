import React from 'react';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class AboutFAQ extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column>
            <h1>About</h1>
            <p>TextRealm is a web application where UH students can easily buy and sell their textbooks to other UH students.
			This application was developed as a team by Chan Ung Jeong, Sang Nguyen, Sola Takahashi, and Sophia Elize Cruz.
			With this application, students can login to a personal account (by signing up for an account), and fill our their profile as they see fit.
			The user can buy textbooks by searching for textbooks based on a couple of their properties.
			We aim to make this application provide students with an enjoyable experience in dealing with textbooks.</p>
			<h1> FAQ </h1>
			<p> To be completed. </p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default AboutFAQ;
