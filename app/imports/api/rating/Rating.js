import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const Ratings = new Mongo.Collection('Ratings');

/** Define a schema to specify the structure of each document in the collection. */
const RatingSchema = new SimpleSchema({
    userEmail: String,
    userImage: String,
    toUser: String,
    comment: String,
    rating: Number,
    postedAt: Date,
    owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Ratings.attachSchema(RatingSchema);

/** Make the collection and schema available to other code. */
export { Ratings, RatingSchema };
