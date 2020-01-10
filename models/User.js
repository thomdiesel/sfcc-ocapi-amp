const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const BaseModel = require('./BaseModel');

//const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   password: String,
//   passwordResetToken: String,
//   passwordResetExpires: Date,

//   facebook: String,
//   twitter: String,
//   google: String,
//   github: String,
//   instagram: String,
//   linkedin: String,
//   steam: String,
//   tokens: Array,

//   profile: {
//     name: String,
//     gender: String,
//     location: String,
//     website: String,
//     picture: String
//   }
// }, { timestamps: true });

/**
 * Password hash middleware.
 */
function saltifyPassword(user) {
  return new Promise((resolve, reject) => {
    if (!false /* user.isModified('password') */ ) { return resolve(); }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) { return next(err); }
        user.password = hash;
        resolve();
      });
    });
  });
}

/**
 * Helper method for validating user's password.
 */
function comparePassword(user, candidatePassword, cb) {
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    cb(err, isMatch);
  });
}

/**
 * Helper method for getting user's gravatar.
 */
function gravatar(user, size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
}

class UserModel extends BaseModel {
  static findOne(config) {
    const user = new UserModel(config);
    return user.fetch();
  }

  fetch() {
    const authUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/auth?client_id=${process.env.OCAPI_CLIENT_ID}`;
    const profileUrl = `${process.env.OCAPI_HOST}${process.env.OCAPI_PATH}/customers/${this.__config.id}?client_id=${process.env.OCAPI_CLIENT_ID}&expand=`;

    return new Promise((resolve, reject) => {
      Promise.all([
        rp.get({
          uri: catUrl,
          json: true
        }),
        rp.get({
          uri: searchUrl,
          json: true
        })
      ])
      .then(([category, search]) => {
        resolve({ category, search });
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = UserModel;
