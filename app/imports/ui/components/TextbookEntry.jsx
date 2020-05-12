import React from 'react';
import { Image, Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Book } from '../../api/book/Book';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders a card component displaying a textbook preview for the owner of the book. See pages/Profile.jsx. */
class TextbookEntry extends React.Component {
  removeItem(docID) {
    Book.remove(docID);
  }

  render() {
    return (
        <Card>
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
