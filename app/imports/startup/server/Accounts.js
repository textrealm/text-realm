import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { UserInfo } from '../../api/userinfo/Userinfo';

/* eslint-disable no-console */

function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

function createProfile(name, email, id, image, description, owner) {
  console.log(`Creating profile for ${name}`);
  UserInfo.insert({ name, email, id, image, description, owner });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role }) => createUser(email, password, role));
    Meteor.settings.defaultProfile.map(({ name, email, id, image, description, owner }) => createProfile(name, email,
        id, image, description, owner));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
