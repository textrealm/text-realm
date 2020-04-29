import { Meteor } from 'meteor/meteor';
import { Book } from '../../api/book/Book.js';
import { UserInfo } from '../../api/userinfo/Userinfo.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addBook(book) {
  console.log(`  Adding: ${book.title} (${book.owner})`);
  Book.insert(book);
}

/** Initialize the collection if empty. */
if (Book.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default books.');
    Meteor.settings.defaultBooks.map(data => addBook(data));
  }

function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  UserInfo.insert(data);
}
