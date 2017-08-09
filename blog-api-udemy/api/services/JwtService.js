const jwt = require('jsonwebtoken');
const secret = 'secret12323hgda';

module.exports = {

  issue: (payload, expiresIn) => {


    return jwt.sign({
        payload
      }, secret,
      {expiresIn});
  },
  verify: token => {

    return jwt.verify(token, secret);

  }


};
