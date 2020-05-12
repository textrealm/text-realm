import { Meteor } from 'meteor/meteor';
import { Book } from '../../api/book/Book';
import { UserInfo } from '../../api/userinfo/Userinfo';
import { Ratings } from '../../api/rating/Rating';

Meteor.publish('UserInfo', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return UserInfo.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Book', function publish() {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return Book.find({});
  }
  return this.ready();
});

Meteor.publish('UserBook', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Book.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Ratings', function publish() {
  if (this.userId) {
    return Ratings.find({});
  }
  return this.ready();
});
