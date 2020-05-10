import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Header, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, TextField, NumField, SubmitField } from 'uniforms-semantic';
import { Book } from '../../api/book/Book';
import TextbookEntryPublic from '../components/TextbookEntryPublic';

/** Create a schema to specify the structure of the data to appear in the form. */
const searchSchema = new SimpleSchema({
  title: { type: String, optional: true },
  ISBN: { type: Number, optional: true },
  author: { type: String, optional: true },
});

function getBookData(book) {
  const data = Book.findOne({ book });
  const title = _.pluck(Book.find({ title: book.title }).fetch(), 'title');
  const ISBN = _.pluck(Book.find({ ISBN: book.ISBN }).fetch(), 'ISBN');
  const author = _.pluck(Book.find({ author: book.author }).fetch(), 'author');
  return _.extend({}, data, { title, ISBN, author });
}

function filter(data, field, values) {
  _.filter(data, function (item) {
    return _.contains(values, item[field]);
  })
}

/** Renders the Profile Collection as a set of Cards. */
class Search extends React.Component {
  results;
  title;
  ISBN;
  author;
  constructor(props) {
    super(props);
    this.state = { title: 'All Titles', ISBN: 'All ISBN', author: 'All Authors' };
    this.results = {};
    this.title = 'All Titles';
    this.ISBN = 'All ISBN';
    this.author = 'All Authors';
  }

  submit(data) {
    this.setState({ title: data.title, ISBN: data.ISBN, author: data.author });
    if (this.state.title != '') {
      this.results = _.filter(this.props.books, function (object) {
        return object["title"].toLowerCase() === data.title;
      });
    }
    if (this.state.ISBN != '') {
      this.results = _.filter(this.props.books, function (object) {
        return object["ISBN"].toLowerCase() === data.ISBN;
      });
    }
    if (this.state.author != '') {
      this.results = _.filter(this.props.books, function (object) {
        return object["author"].toLowerCase() === data.author;
      });
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container centered="true">
          <AutoForm schema={searchSchema} onSubmit={data => this.submit(data)}>
            <Segment>
              <TextField name='title'/>
              <NumField name='ISBN' decimal={false}/>
              <TextField name='author'/>
              <SubmitField value='Submit'/>
            </Segment>
          </AutoForm>
          <Header as="h2" inverted textAlign="center">Search Results</Header>
          {this.state.title === 'title' ? (
              <Card.Group centered>
                {this.props.book.map((book, index) => <TextbookEntryPublic key={index}
                                                                           book={book}
                />)}
              </Card.Group>) : (this.results.length === 0 ? (<Header as="h2" textAlign="center">No results.</Header>) :
              <Card.Group>
                {this.results.map((book, index) => <TextbookEntryPublic key={index} book={book}/>)} </Card.Group>)}
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Search.propTypes = {
  book: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components.
 https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const subscription = Meteor.subscribe('Book');
  return {
    book: Book.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Search);
