import React from 'react';
import { Icon, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders reviews about buying experiences from all users. See pages/RecentComments.jsx. */
class Reviews extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image src={this.props.reviews.userImage} floated='right' size='mini'/>
            <Card.Header>User {this.props.reviews.userEmail}</Card.Header>
            <Card.Header>
              just bought from: {this.props.reviews.toUser}!
            </Card.Header>
            <Card.Meta>
              <div>{this.props.reviews.postedAt.toLocaleDateString('en-US')}</div>
              <div>
                Rating: {this.props.reviews.rating} <Icon name='star'/> out of 5
              </div>
            </Card.Meta>
            <Card.Description>
              {this.props.reviews.comment}
            </Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.object.isRequired,
};

export default withRouter(Reviews);
