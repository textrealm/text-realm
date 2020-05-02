import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Book } from "../../api/book/Book";
import { UserInfo } from '../../api/userinfo/Userinfo';

Meteor.publish('UserInfo', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return UserInfo.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('Book', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Book.find({owner: username});
  }
  return this.ready();
});

Meteor.publish('BookAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Book.find();
  }
  return this.ready();
});
