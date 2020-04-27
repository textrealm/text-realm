import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Image
                floated='left'
                size='medium'
                src={this.props.profileinfo.image}
            />
            <Card.Header>{this.props.profileinfo.name} </Card.Header>
            <Card.Meta>{this.props.profileinfo.email}</Card.Meta>
			<Card.Meta>{this.props.profileinfo.id}</Card.Meta>
            <Card.Description>
              {this.props.profileinfo.description}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}
/** Require a document to be passed to this component. */
Profile.propTypes = {
  profileinfo: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);