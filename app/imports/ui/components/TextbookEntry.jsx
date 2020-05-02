import React from 'react';
import { Image, Card, Button, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Book } from "../../api/book/Book";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TextbookEntry extends React.Component {
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
                        <Link to={`/editBook/${this.props.book._id}`}>Edit</Link>
                    </Card.Content>
                </Card.Content>
            </Card>
        );
    }
}

TextbookEntry.propTypes = {
   book: PropTypes.object.isRequired,
};

export default withRouter(TextbookEntry);
