import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class TextbookEntry extends React.Component {
    render() {
        return (
            <Grid centered container>
                <Grid.Column width={7}>
                    <Image src={this.props.book.image} floated='right' size='large' />
                    {/*<Card.Header>{this.props.contact.firstName} {this.props.contact.lastName}</Card.Header>*/}
                    {/*<Card.Meta>*/}
                    {/*    <span>{this.props.contact.address}</span>*/}
                    {/*</Card.Meta>*/}
                    {/*<Card.Description>*/}
                    {/*    {this.props.contact.description}*/}
                    {/*</Card.Description>*/}
                </Grid.Column>
                <Grid.Column stackable={true} width={7}>
                    Description: {this.props.book.description} <br />
                    Condition: {this.props.book.condition} <br />
                    Contact Seller: {this.props.userinfo.email} <br />
                    Cost: <br />
                    <Link to={`/edit/${this.props.book._id}`}>Edit</Link>
                </Grid.Column>
                {/*<Card.Content extra>*/}
                {/*    <AddNote owner={this.props.contact.owner} contactId={this.props.contact._id}/>*/}
                {/*</Card.Content>*/}
            </Grid>
        );
    }
}

/** Require a document to be passed to this component. */
TextbookEntry.propTypes = {
    book: PropTypes.object.isRequired,
    userinfo: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(TextbookEntry);
