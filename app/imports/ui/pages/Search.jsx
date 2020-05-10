import React from 'react';
import { Loader, Segment, Container, Header, Card, Grid } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Book } from '../../api/book/Book';
import TextbookEntryPublic from '../components/TextbookEntryPublic';
import SearchComp from '../components/SearchComp';

/** Renders the Profile Collection as a set of Cards. */
class Search extends React.Component {
    getBooks;
    constructor(props) {
        super(props);
        this.state = { chosen: 'title' };
        this.getBooks = {};
    }

    bookSearch = (search) => {
        let newState;
        newState = {
            chosen: 'search'
        };
        this.setState(newState);
        this.search = search;
        let lowerSearch = search.toLowerCase();
        this.getBooks = _.filter(this.props.books, function(object) {
            return object["title"].toLowerCase().includes(lowerSearch) });
    };
    /** On successful submit, search for data. */

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    renderPage() {
        return (
            <Container>
                <Header as="h1" inverted textAlign="center">Search For Books</Header>
                <Header as ="h2" inverted textAlign="center">Search for textbooks based on author, ISBN, or title.</Header>
                    <Grid container centered style={{ margin: '50px' }}>
                         <SearchComp send={this.bookSearch.bind(this)}/>
                    </Grid>

                { this.state.chosen === 'title' ? (
                    <Card.Group> {this.props.books.map((book, index) => <TextbookEntryPublic key={index}
                                                                                  book={book}/>)}</Card.Group>
                ) : ( this.getBooks.length === 0 ? (<Header as="h2" textAlign="center">No results.</Header>) :
                    <Card.Group> { this.getBooks.map((book, index) => <TextbookEntryPublic key={index} book={book}/>)}
                    </Card.Group> )
                }
            </Container>
        );
    }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
Search.propTypes = {
    books: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Book');
    return {
        books: Book.find({}).fetch(),
        ready: subscription.ready(),
    };
})(Search);
