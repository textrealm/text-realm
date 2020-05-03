import React from 'react';
import {Card, Image, Container, Loader} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { UserInfo } from "../../api/userinfo/Userinfo";
import { Book } from "../../api/book/Book";
import TextbookEntry from "../components/TextbookEntry";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

  renderPage() {
    return (
        <Container>
            <Card centered fluid>
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
                    <Link to={`/edit/_.id${this.props.userinfo._id}`}>Edit</Link>
                </Card.Content>
            </Card>
            <Card.Group centered>
                {this.props.books.map((book, index) => <TextbookEntry
                    className="profile-book"
                    key={index}
                    book={book}
                />)}
            </Card.Group>
        </Container>
    );
  }
}
/** Require a document to be passed to this component. */
Profile.propTypes = {
    userinfo: PropTypes.array.isRequired,
    books: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
    // Get access to Book documents.
    const subscription = Meteor.subscribe('UserInfo');
    const booksub = Meteor.subscribe('Book');
    return {
        userinfo: UserInfo.find({}).fetch(),
        books: Book.find({}).fetch(),
        ready: subscription.ready() && booksub.ready(),
    };
})(Profile);
