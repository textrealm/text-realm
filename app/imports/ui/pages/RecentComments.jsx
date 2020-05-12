import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Ratings } from '../../api/rating/Rating';
import Reviews from '../components/Reviews';


/** Renders a page to display all comments from users about a buying experience. */
export class RecentComments extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        return (
            <Container>
                <Header as="h2" textAlign="center" inverted>Recent Comments</Header>
                <Card.Group>
                    {this.props.reviews.map((reviews, index) => <Reviews key={index}
                                                                         reviews={reviews}
                    />)}
                </Card.Group>
            </Container>
        );
    }
}

/** Require an array of Ratings documents in the props. */
RecentComments.propTypes = {
    reviews: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to user comments' documents.
    const subscription = Meteor.subscribe('Ratings');
    return {
        reviews: Ratings.find({}).fetch(),
        ready: subscription.ready(),
    };
})(RecentComments);
