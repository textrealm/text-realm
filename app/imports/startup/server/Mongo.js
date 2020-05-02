import { Meteor } from 'meteor/meteor';
import { Book } from '../../api/book/Book.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addBook(book) {
  console.log(`  Adding: ${book.title} (${book.owner})`);
  Book.insert(book);
}

/** Initialize the collection if empty. */
if (Book.find().count() === 0) {
  if (Meteor.settings.defaultBooks) {
    console.log('Creating default books.');
    Meteor.settings.defaultBooks.map(data => addBook(data));
  }
}
