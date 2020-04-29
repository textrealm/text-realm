import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Book, BookSchema } from '../../api/book/Book';

/** Renders the Page for editing a single document. */
class Search extends React.Component {

  /** On successful submit, search for data. */
  submit(data) {
    const { title, ISBN, image, author, owner, cost, yearPublished, condition, _id } = data;
    Book.find(_id, {
      $set: {
        title,
        ISBN,
        image,
        author,
        owner,
        cost,
        yearPublished,
        condition,
      },
    }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Results found', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Textbook Search</Header>
            <AutoForm schema={BookSchema} onSubmit={data => this.submit(data)} model={this.props.books}>
              <Segment>
                <TextField name='title'/>
                <TextField name='ISBN'/>
                <TextField name='image'/>
                <TextField name='author'/>
                <TextField name='owner'/>
                <NumField name='cost' decimal={false}/>
                <NumField name='yearPublished' decimal={false}/>
                <SelectField name='condition'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
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
