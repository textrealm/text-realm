import React from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Book } from "../../api/book/Book";
import swal from 'sweetalert';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TextbookEntry extends React.Component {
    removeItem(docID) {
        let check = confirm("Do you really want to delete this textbook entry?");
        if (check === true) {
            Book.remove(docID);
            swal('Success', 'Entry deleted successfully', 'success');
        } else {
            swal('Error', error.message, 'error');
        }
    }
    render() {
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Content>
                        <Image src={this.props.book.image} width='350px' height='350px'/>
                    </Card.Content>
                    <br/>
                    <Card.Header>
                        {this.props.book.title}
                    </Card.Header>
                    <br/>
                    <Card.Meta>
                        Author(s): {this.props.book.author}
                    </Card.Meta>
                    <br/>
                    <Card.Meta>
                        Description: {this.props.book.description}
                    </Card.Meta>
                    <br/>
                    <Card.Meta>
                        Cost: {this.props.book.cost}
                    </Card.Meta>
                    <br/>
                    <Card.Meta>
                        Condition: {this.props.book.condition}
                    </Card.Meta>
                    <br/>
                    <Card.Meta>
                        Year Published: {this.props.book.yearPublished}
                    </Card.Meta>
                    <br/>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='green'>
                        <Link to={`/editBook/${this.props.book._id}`}>Edit</Link>
                    </Button>
                    <Button basic color='red'
                            onClick={() => this.removeItem(this.props.book._id)}>
                        Delete
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

TextbookEntry.propTypes = {
   book: PropTypes.object.isRequired,
};

export default withRouter(TextbookEntry);
