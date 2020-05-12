import { Meteor } from 'meteor/meteor';
import { Book } from '../../api/book/Book.js';
import { Ratings } from '../../api/rating/Rating';

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

/** Initialize the database with a default data document. */
function addRating(rating) {
  console.log(`  Adding: ${rating.toUser}`);
  Ratings.insert(rating);
}

/** Initialize the collection if empty. */
if (Ratings.find().count() === 0) {
  if (Meteor.settings.defaultRatings) {
    console.log('Creating default ratings.');
    Meteor.settings.defaultRatings.map(data => addRating(data));
  }
}
