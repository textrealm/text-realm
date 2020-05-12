import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField, NumField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Ratings } from '../../api/rating/Rating';

const formSchema = new SimpleSchema({
  userEmail: { type: String, label: 'Name:' },
  userImage: { type: String, label: 'Reviewer Image:' },
  toUser: { type: String, label: 'Review For:' },
  comment: String,
  rating: { type: Number, label: 'Rating:', min: 0, max: 5 },
});

/** Renders the Page for adding comment about a user's buying experience with another user. */
class AddComment extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { userEmail, userImage, toUser, comment, rating } = data;
    const owner = Meteor.user().username;
    const postedAt = new Date();
    Ratings.insert({ userEmail, userImage, toUser, comment, rating, postedAt, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const addStyle = { marginBottom: '10px' };
    return (
        <Grid style={addStyle} container centered>
          <Grid.Column>
            <Header as="h2" inverted textAlign="center">Rate Your Buying Experience With A User!</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='userEmail'/>
                <TextField name='userImage'/>
                <TextField name='toUser'/>
                <NumField name='rating' decimal={true}/>
                <TextField name='comment'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddComment;
