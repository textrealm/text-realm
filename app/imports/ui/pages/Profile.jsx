import React from 'react';
import { Card, Image, Grid, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { UserInfo } from '../../api/userinfo/Userinfo';
import { Book } from '../../api/book/Book';
import TextbookEntry from '../components/TextbookEntry';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
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
                            src={this.props.userinfo.image}
                        />
                        <Card.Header>{this.props.userinfo.name} </Card.Header>
                        <Card.Meta>Email: {this.props.userinfo.email}</Card.Meta>
                        <Card.Meta>UH ID Number: {this.props.userinfo.id}</Card.Meta>
                        <Card.Meta>
                            {this.props.userinfo.description}
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Link to={`/edit/${this.props.userinfo._id}`}>Edit</Link>
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
    userinfo: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(({ match }) => {
    // Get access to Book documents.
    let userId = match.params._id;
    const subscription = Meteor.subscribe('UserInfo');
    const booksub = Meteor.subscribe('Book');
    return {
        userinfo: UserInfo.findOne({ user: userId }),
        books: Book.find({}).fetch(),
        ready: subscription.ready() && booksub.ready(),
    };
})(Profile);
