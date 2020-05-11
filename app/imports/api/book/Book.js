import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Book = new Mongo.Collection('Book');

/** Define a schema to specify the structure of each document in the collection. */
const BookSchema = new SimpleSchema({
  title: String,
  ISBN: { type: Number, min: 0 },
  image: String,
  author: String,
  owner: String,
  cost: { type: Number, min: 0 },
  description: String,
  yearPublished: String,
  condition: {
    type: String,
    allowedValues: ['excellent', 'good', 'fair', 'poor'],
    defaultValue: 'good',
  },
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Book.attachSchema(BookSchema);

/** Make the collection and schema available to other code. */
export { Book, BookSchema };
