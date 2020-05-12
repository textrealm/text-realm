import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Book } from '../../api/book/Book';
import TextbookEntry from '../components/TextbookEntry';

/** Renders all of the entries for the Admin. */
class ListTextbooksAdmin extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        return (
            <Container>
                <Header as="h2" textAlign="center" inverted>All Textbooks</Header>
                <Card.Group>
                    {this.props.book.map((book, index) => <TextbookEntry key={index}
                                                                         book={book}
                    />)}
                </Card.Group>
            </Container>
        );
    }
}

/** Require an array of Book documents in the props. */
ListTextbooksAdmin.propTypes = {
    book: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Book documents.
    const subscription = Meteor.subscribe('Book');
    return {
        book: Book.find({}).fetch(),
        ready: subscription.ready(),
    };
})(ListTextbooksAdmin);
