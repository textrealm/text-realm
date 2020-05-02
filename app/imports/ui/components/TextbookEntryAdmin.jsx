import React from 'react';
import {Image, Card, Button, Popup} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Book } from "../../api/book/Book";
import { UserInfo } from "../../api/userinfo/Userinfo";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TextbookEntryAdmin extends React.Component {
    deleteEntry(id) {
        Book.delete(id);
        this.setState({click: false});
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
                    <Card.Description>
                        <Popup>
                            content: {this.props.book.description}
                            on='click'
                            trigger={<Button content='View More' />}
                        </Popup>
                    </Card.Description>
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
                        <Link to={`/editBook/${this.props.userinfo._id}`}>Edit</Link>
                    </Card.Content>
                </Card.Content>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
TextbookEntryAdmin.propTypes = {
    book: PropTypes.array.isRequired,
    userinfo: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(() => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const subscription = Meteor.subscribe('BookAdmin');
    const usersub = Meteor.subscribe('UserInfo');
    return {
        book: Book.find({}).fetch(),
        userinfo: UserInfo.find({}).fetch(),
        ready: subscription.ready() && usersub.ready(),
    };
})(TextbookEntryAdmin);
