import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { UserInfo } from '../../api/userinfo/Userinfo'

Meteor.publish('UserInfo', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return UserInfo.find({ owner: username });
  }
  return this.ready();
});
