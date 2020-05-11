import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Reviews extends React.Component {
    render() {
        return (
            <Comment>
                <Comment.Avatar as='a' src={this.props.review.userImage} />
                <Comment.Author>
                    {this.props.review.userEmail}
                </Comment.Author>
                <Comment.Metadata>
                <div>this.props.review.postedAt.toLocaleDateString('en-US')}</div>
                <div>
                    {this.props.review.rating} <Icon name='star' />
                </div>
            </Comment.Metadata>
                <Comment.Text>
                    {this.props.review.comment}
                </Comment.Text>
            </Comment>
        );
    }
}

Reviews.propTypes = {
    review: PropTypes.object.isRequired,
};

export default withRouter(Reviews);
