import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { AutoForm, SubmitField, ErrorsField, TextField, LongTextField } from 'uniforms-semantic';
import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';
import { UserInfo } from '../../api/userinfo/Userinfo';

const formSchema = new SimpleSchema({
  name: String,
  email: String,
  password: String,
  id: Number,
  image: String,
  description: String,
});

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      redirectToReferer: false,
    };
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = (data, formRef) => {
    const { name, email, password, id, image, description } = data;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        UserInfo.insert({ name, email, id, image, description, owner: email });
        this.setState({ error: '', redirectToReferer: true });
        formRef.reset();
      }
    });
  };

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    let fRef = null;
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Container>
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>
                Register Your Account
              </Header>
              <AutoForm ref={ref => {
                fRef = ref;
              }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}> <Segment stacked>
                <TextField
                    label="Name"
                    name="name"
                    placeholder="Name"
                />
                <TextField
                    label="Email"
                    icon="user"
                    iconPosition="left"
                    name="email"
                    placeholder="E-mail Address"
                />
                <TextField
                    label="School ID"
                    icon="id card"
                    iconPosition="left"
                    name="id"
                    placeholder="ID Number"
                />
                <TextField
                    label="Password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                />
                <TextField
                    label="Image"
                    icon="image"
                    iconPosition="left"
                    name="image"
                    placeholder="Image URL"
                />
                <LongTextField
                    label="Description"
                    icon={''}
                    iconPosition={''}
                    name="description"
                    placeholder="Enter your bio..."
                />
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
              </AutoForm>
              <div className={'signup-margin-message'}>
                <Message>
                  Already have an account? Login <Link to="/signin">here</Link>
                </Message>
              </div>
              {this.state.error === '' ? (
                  ''
              ) : (
                  <Message
                      error
                      header="Registration was not successful"
                      content={this.state.error}
                  />
              )}
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
