import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import Profile from '/imports/ui/components/Profile';
import PropTypes from 'prop-types';
import { UserInfo } from '../../api/userinfo/Userinfo';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List Profile</Header>
          <Card.Group>
            {this.props.profileinfos.map((profileinfo, index) => <Profile key={index}
         profileinfo={profileinfo} UserInfo={UserInfo}
         />)}
          </Card.Group>
        </Container>
    );
  }
}
/** Require an array of Stuff documents in the props. */
ListProfile.propTypes = {
  profileinfos: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('UserInfo');
  return {
    profileinfos: UserInfo.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListProfile);
