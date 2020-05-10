import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Book } from '../../api/book/Book';
import TextbookEntryPublic from '../components/TextbookEntryPublic';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListTextbooks extends React.Component {

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the page once subscriptions have been received. */
    renderPage() {
        return (
            <Container centered="true">
                <Header as="h2" inverted textAlign="center">Search Results</Header>
                <Card.Group centered>
                    {this.props.book.map((book, index) => <TextbookEntryPublic key={ index }
                                                                                  book={ book }
                    />)}
                </Card.Group>
            </Container>
        );
    }
}
/** Require an array of Stuff documents in the props. */
ListTextbooks.propTypes = {
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
})(ListTextbooks);
