import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Book, BookSchema } from '../../api/book/Book';

/** Renders the Page for editing a single document. */

class EditEntry extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { title, ISBN, image, author, cost, yearPublished, description, condition, _id } = data;
    Book.update(_id, {
      $set: {
        title,
        ISBN,
        image,
        author,
        cost,
        yearPublished,
        description,
        condition,
      },
    }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container inverted centered>
          <Grid.Column>
            <Header as="h2" inverted textAlign="center">Edit Entry</Header>
            <AutoForm schema={BookSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='title'/>
                <NumField name='ISBN' decimal={false}/>
                <NumField name='cost' decimal={true}/>
                <TextField name='author'/>
                <TextField name='image'/>
                <LongTextField name='description'/>
                <TextField name='yearPublished'/>
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

/** Require the presence of a Book document in the props object. Uniforms adds 'model' to the props, which we use. */
EditEntry.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Book documents.
  const subscription = Meteor.subscribe('Book');
  return {
    doc: Book.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditEntry);
