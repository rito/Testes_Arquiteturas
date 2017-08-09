/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    first_name: {type: 'string'},

    last_name: {type: 'string'},

    email: {type: 'string'},

    password: {type: 'string'},

    posts: {
      collection: 'post',
      via: '_user'
    },

    //override toJson method
    toJSON: function () {

      //extract obj
      let obj = this.toObject();

      //delete the password field
      delete  obj.password;

      //return the obj
      return obj;

    }

  },

  /**
   *
   * @param password
   * @param encPassword
   * @return {Promise}
   */

   checkPassword(password,encPassword){
    const mPack = require('machinepack-passwords');

    return new Promise( (resolve,reject) => {
      mPack.checkPassword({
        passwordAttempt:password,
        encryptedPassword:encPassword
      })
        .exec({
          error : err => reject(err),
          incorrect: () => resolve(false),
          success: () => resolve(true)
        })
    });

  }
};

