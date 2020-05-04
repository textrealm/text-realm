import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker, Link } from 'meteor/react-meteor-data';
import { Book } from '../../api/book/Book';
import { UserInfo } from '../../api/userinfo/Userinfo';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TextbookEntry extends React.Component {
    deleteEntry(id) {
        Book.delete(id);
        this.setState({ click: false });
    }

    state = { click: false };

    hasClicked = () => this.setState({ click: true });

    closed = () => this.setState({ click: false });

    render() {
        return (
            <Card>
                <Image src='https://en.wikipedia.org/wiki/Introduction_to_Algorithms#/media/File:Clrs3.jpeg'
                       floated='left' size='large'/>
                <Card.Content>
                    <Card.Header>
                        {this.props.book.title}
                    </Card.Header>
                    <br/>
                    <Card.Meta>
                        Author(s): {this.props.book.author}
                    </Card.Meta>
                    <br/>
                    <Card.Meta>
                        Cost: {this.props.book.cost}
                    </Card.Meta>
                    <br/>
                    <Card.Meta>
                        Condition: {this.props.book.condition}
                    </Card.Meta>
                    <Card.Meta>
                        Year Published: {this.props.book.yearPublished}
                    </Card.Meta>
                    <Card.Content extra>
                        <Link to={`/editBook/${this.props.book._id}`}>Edit</Link>
                    </Card.Content>
                </Card.Content>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
TextbookEntry.propTypes = {
    book: PropTypes.object.isRequired,
    userinfo: PropTypes.object.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const subscription = Meteor.subscribe('Book');
    const usersub = Meteor.subscribe('UserInfo');
    return {
        book: Book.find({}).fetch(),
        userinfo: UserInfo.find({}).fetch(),
        ready: subscription.ready() && usersub.ready(),
    };
})(TextbookEntry);
