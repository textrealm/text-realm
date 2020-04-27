import { Meteor } from 'meteor/meteor';
import { UserInfo } from '../../api/userinfo/Userinfo.js';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  UserInfo.insert(data);
}
