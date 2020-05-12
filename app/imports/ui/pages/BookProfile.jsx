import React from 'react';
import { Image, Card, Grid, Header, Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Book } from '../../api/book/Book';

/** Renders the Page for displaying a textbook entry. */
class BookProfile extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Container>
          <Header as="h2" inverted textAlign="center">{this.props.book.title}</Header>
          <Grid container>
            <Grid.Column width={8}>
              <Card fluid>
                <Image src={this.props.book.image}
                       floated='left' size='huge'/>
              </Card>
            </Grid.Column>
            <Grid.Column width={8}>
              <Card fluid>
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
                    About This Book: {this.props.book.description}
                  </Card.Description>
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
                  Interested? Contact the seller at: <b>{this.props.book.owner}</b>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require a document to be passed to this component. */
BookProfile.propTypes = {
  book: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('Book');
  const useSub = Meteor.subscribe('UserInfo');
  return {
    book: Book.findOne(documentId),
    ready: subscription.ready() && useSub.ready(),
  };
})(BookProfile);
