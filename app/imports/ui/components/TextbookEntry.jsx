import React from 'react';
import {Image, Card, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';
import {Book} from "../../api/book/Book";
import {UserInfo} from "../../api/userinfo/Userinfo";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TextbookEntry extends React.Component {
    render() {
        return (
            <Card fluid>
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
                        Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                        unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged. It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                        publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Card.Description>
                    <br/>
                    <Card.Meta>
                        Cost:
                    </Card.Meta>
                    <br/>
                    <Card.Meta>
                        Condition: {this.props.book.condition}
                    </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={this.open}>
                        <Link to={this.props.userinfo.email}>Contact Seller</Link>
                    </Button>
                    <Button onClick={this.open}>
                        <Link to={`/edit/${this.props.book._id}`}>Edit Entry</Link>
                    </Button>
                </Card.Content>
                {/*<Card.Content extra>*/}
                {/*    <Book owner={this.props.book.owner} contactId={this.props.book._id}/>*/}
                {/*</Card.Content>*/}
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
TextbookEntry.propTypes = {
    book: PropTypes.array.isRequired,
    userinfo: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired
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
