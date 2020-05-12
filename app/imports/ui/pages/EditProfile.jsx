import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, LongTextField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { UserInfo } from '../../api/userinfo/Userinfo';

const formSchema = new SimpleSchema({
  name: String,
  email: String,
  id: Number,
  image: String,
  description: String,
});

/** Renders the Page for the user to edit their profile. */
class EditProfile extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, email, id, image, description, _id } = data;
    UserInfo.update(_id, { $set: { name, email, id, image, description } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Profile updated successfully', 'success')));
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
            <Header as="h2" inverted textAlign="center">Edit Profile</Header>
            <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='name'/>
                <TextField name='email'/>
                <NumField name='id' decimal={false}/>
                <TextField name='image'/>
                <LongTextField name='description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a UserInfo document in the props object.
 * Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to UserInfo documents.
  const subscription = Meteor.subscribe('UserInfo');
  return {
    doc: UserInfo.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditProfile);
