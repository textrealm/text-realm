import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Book, BookSchema } from "../../api/book/Book";

/** Renders the Page for adding a document. */
class SellATextbook extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, isbn, image, author, condition } = data;
    const owner = Meteor.user().username;
    Book.insert({ title, isbn, image, author, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Sell A Textbook</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={BookSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='title'/>
                <NumField name='isbn number' decimal={true}/>
                <TextField name='author'/>
                <TextField name='image'/>
                <SelectField name='condition'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default SellATextbook;
