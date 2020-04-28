import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Book } from '../../api/book/Book.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the database with a default data document. */
function addBook(book) {
  console.log(`  Adding: ${book.title} (${book.owner})`);
  Book.insert(book);
}

/** Initialize the collection if empty. */
if (Book.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addBook(data));
  }
}
