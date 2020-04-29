import { Meteor } from 'meteor/meteor';
import { Book } from '../../api/book/Book.js';
/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addBook(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Book.insert(data);
}

/** Initialize the collection if empty. */
if (Book.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default books.');
    Meteor.settings.defaultBooks.map(data => addBook(data));
  }
}
