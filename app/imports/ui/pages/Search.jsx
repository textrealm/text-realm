import React from 'react';
import { Loader, Segment, Container, Header, Card, Checkbox, Form } from 'semantic-ui-react';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Book } from '../../api/book/Book';
import TextbookEntryPublic from '../components/TextbookEntryPublic';
import SearchComp from '../components/SearchComp';


// /** Renders the Page for editing a single document. */
// class Search extends React.Component {
// /** Create a schema to specify the structure of the data to appear in the form. */
// const makeSchema = (allInterests) => new SimpleSchema({
//   interests: { type: Array, label: 'Interests', optional: true },
//   'interests.$': { type: String, allowedValues: allInterests },
// });
//
// function getBookData(book) {
//   const data = Book.findOne({ book });
//   const title = _.pluck(ProfilesInterests.find({ profile: email }).fetch(), 'title');
//   const ISBN = _.pluck(ProfilesProjects.find({ profile: email }).fetch(), 'ISBN');
//   const author = _.pluck(ProfilesProjects.find({ profile: email }).fetch(), 'author');
//   return _.extend({ }, data, { title, ISBN, author });
// }
//
// /** Component for layout out a Profile Card. */
// const MakeCard = (props) => (
//     <Card>
//       <Card.Content>
//         <Image floated='right' size='mini' src={props.profile.picture} />
//         <Card.Header>{props.profile.firstName} {props.profile.lastName}</Card.Header>
//         <Card.Meta>
//           <span className='date'>{props.profile.title}</span>
//         </Card.Meta>
//         <Card.Description>
//           {props.profile.bio}
//         </Card.Description>
//       </Card.Content>
//       <Card.Content extra>
//         {_.map(props.profile.interests,
//             (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
//       </Card.Content>
//       <Card.Content extra>
//         <Header as='h5'>Projects</Header>
//         {_.map(props.profile.projects, (project, index) => <Image key={index} size='mini' src={project}/>)}
//       </Card.Content>
//     </Card>
// );
//
// /** Properties */
// MakeCard.propTypes = {
//   profile: PropTypes.object.isRequired,
// };
//

const makeSchema = () => new SimpleSchema({
    title: { type: String, label: "Book Title", optional: true },
    author: { type: String, label: "Author of the Book", optional: true },
    ISBN: { type: Number, label: "ISBN", optional: true },
});

/** Renders the Profile Collection as a set of Cards. */
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { getBooks: [], chosen: 'title', search: false };
    }
    handleChange = (e, { value }) => this.setState({ chosen: value });

    /** On successful submit, search for data. */

    /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
    renderPage() {
        const formSchema = makeSchema();
        return (
            <Container>
                <Header as="h1" textAlign="center">Search For Books</Header>
                <Header as ="h2" textAlign="center">Search for textbooks based on author, ISBN, or title.</Header>
                <AutoForm schema={formSchema} onSubmit={data => this.submit(data)} >
                    <Segment>

                        <SubmitField value='Submit'/>
                    </Segment>
                </AutoForm>
                <Card.Group style={{ paddingTop: '10px' }}>
                    {this.props.book.map((book, index) => <TextbookEntryPublic key={index} book={book}/>)}
                </Card.Group>
            </Container>
        );
    }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
Search.propTypes = {
    books: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Book');
    return {
        books: Book.find().fetch(),
        ready: subscription.ready(),
    };
})(Search);
