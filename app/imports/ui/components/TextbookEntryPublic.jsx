import React from 'react';
import { Image, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a public preview of a textbook entry card. See pages/SearchComp.jsx. */
class TextbookEntryPublic extends React.Component {
  render() {
    return (
        <Card>
          <Image src={this.props.book.image}
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
            <br/>
            <Card.Meta>
              Year Published: {this.props.book.yearPublished}
            </Card.Meta>
            <br/>
            <Card.Content extra>
              <Link to={`/bookProfile/${this.props.book._id}`}>View More</Link>
            </Card.Content>
          </Card.Content>
        </Card>
    );
  }
}

TextbookEntryPublic.propTypes = {
  book: PropTypes.object.isRequired,
};

export default withRouter(TextbookEntryPublic);
