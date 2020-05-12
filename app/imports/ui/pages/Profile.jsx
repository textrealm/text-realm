import React from 'react';
import { Card, Image, Grid, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserInfo } from '../../api/userinfo/Userinfo';
import { Book } from '../../api/book/Book';
import TextbookEntry from '../components/TextbookEntry';

/** Renders the Page containing the logged in user's information and books they are selling. */
class Profile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid className="profile-back">
          <Grid container>
            <Card centered fluid>
              <Card.Content>
                <Image
                    floated='right'
                    size='medium'
                    src={this.props.userInfo.image}
                />
                <Card.Header>{this.props.userInfo.name} </Card.Header>
                <Card.Meta>Email: {this.props.userInfo.email}</Card.Meta>
                <Card.Meta>UH ID Number: {this.props.userInfo.id}</Card.Meta>
                <Card.Meta>
                  {this.props.userInfo.description}
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Link to={`/edit/${this.props.userInfo._id}`}>Edit</Link>
              </Card.Content>
            </Card>
            <Card.Group centered>
              {this.props.books.map((book, index) => <TextbookEntry
                  key={index}
                  book={book}
              />)}
            </Card.Group>
          </Grid>
        </Grid>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  userInfo: PropTypes.object,
  books: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(({ match }) => {
  // Get access to Book documents and UserInfo documents.
  const userId = match.params._id;
  const getUser = Meteor.users.findOne(userId);
  const subscription = Meteor.subscribe('UserInfo');
  const bookSub = Meteor.subscribe('UserBook');
  return {
    userInfo: UserInfo.findOne({ username: getUser }),
    books: Book.find({ username: getUser }).fetch(),
    ready: subscription.ready() && bookSub.ready(),
  };
})(Profile);
