"use strict";
module.exports = {

  encryptPassword : password =>{

    return new Promise( (resolve,reject) => {

      const mPack = require('machinepack-passwords');

      mPack.encryptPassword({
        password
      })
        .exec({
          error: err => reject(err),
          success: result => resolve(result)
        });
    });


  }

};
