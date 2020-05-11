import React from 'react';
import { Icon, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Reviews extends React.Component {
    render() {
        return (
           <Card>
               <Card.Content>
                   <Image src={this.props.reviews.userImage} floated='right' size='mini' />
                   <Card.Header>{this.props.reviews.userEmail}</Card.Header>
                   <Card.Meta>
                       <div>{this.props.reviews.postedAt.toLocaleDateString('en-US')}</div>
                       <div>
                           Rating: {this.props.reviews.rating} <Icon name='star'/>
                       </div>
                   </Card.Meta>
                   <Card.Content>
                       Bought From: {this.props.reviews.toUser}
                   </Card.Content>
                   <Card.Description>
                       {this.props.reviews.comment}
                   </Card.Description>
               </Card.Content>
           </Card>
        );
    }
}

Reviews.propTypes = {
    reviews: PropTypes.object,
};

export default withRouter(Reviews);
