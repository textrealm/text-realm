import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

/** Renders the Landing page. Snazzy. */
class Landing extends React.Component {
    render() {
        return (
            <Grid centered stackable={true} textAlign='center' className='manoa-bg'>
                <Grid.Column textAlign='center' width={8}>
                    <Image size='huge' circular src='/images/textrealmlogo.png'/>
                    <div className='backdrop'>
                        <Header as='h1' inverted>The easy way for UH Manoa students to buy and sell their
                            textbooks.</Header>
                    </div>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Landing;
