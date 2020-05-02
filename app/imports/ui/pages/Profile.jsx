import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { UserInfo } from "../../api/userinfo/Userinfo";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {

  render() {
    return (
        <Card centered>
            <Image
                floated='left'
                size='medium'
                src={this.props.userinfo.image}
            />
          <Card.Content>
            <Card.Header>Name: {this.props.userinfo.name} </Card.Header>
            <Card.Meta>Email: {this.props.userinfo.email}</Card.Meta>
			<Card.Meta>UH ID Number: {this.props.userinfo.id}</Card.Meta>
            <Card.Description>
              Description: {this.props.userinfo.description}
            </Card.Description>
          </Card.Content>
		  <Card.Content extra>
            <Link to={`/edit/${this.props.userinfo._id}`}>Edit</Link>
          </Card.Content>
        </Card>
    );
  }
}
/** Require a document to be passed to this component. */
Profile.propTypes = {
    userinfo: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
    // Get access to Book documents.
    const subscription = Meteor.subscribe('UserInfo');

    return {
        userinfo: UserInfo.find({}).fetch(),
        ready: subscription.ready(),
    };
})(Profile);
