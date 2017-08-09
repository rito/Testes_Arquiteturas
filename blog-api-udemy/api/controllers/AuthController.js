/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  /**
   * `AuthController.login()`
   */
  login: function (req, res) {


    let email = req.param('email'),
      password = req.param('password');

    if (!email) {
      return res.badReques({err: 'invalid email'});
    }

    if (!password) {
      return res.badRequest({err: 'invalid password'});
    }


    const loginReq = async () => {

      try {
        const user = await User.findOne({email});
        const isMatched = await User.checkPassword(password, user.password);

        if (!isMatched) {
          throw new Error('Your password is not matched');
        }

        let resp = {
          user
        };

        let token = JwtService.issue({
          user,
          expiresIn: '1d'
        });

        resp.token = token;

        return resp;
      }
      catch (err){
        throw err;
      }


    };


    loginReq()
      .then(user => res.ok(user))
      .catch(err => res.forbidden(err));

  },


  /**
   * `AuthController.signup()`
   */
  signup: function (req, res) {

    let firstName = req.param('first_name'),
      lastName = req.param('last_name'),
      email = req.param('email'),
      password = req.param('password');

    if (!firstName) {
      return res.badRequest({err: 'invalid first_name'});
    }

    if (!lastName) {
      return res.badRequest({err: 'invalid last_name'});
    }

    if (!email) {
      return res.badRequest({err: 'invalid email'});
    }


    if (!password) {
      return res.badRequest({err: 'invalid password'});
    }


    const signupRequest = async () => {

      try {

        const encPassword = await UtilService.encryptPassword(password);
        const user = await  User.create({
          first_name: firstName,
          last_name: lastName,
          email,
          password: encPassword
        });

        return user;
      }
      catch (e) {
        throw e;
      }

    };

    signupRequest()
      .then(user => res.ok(user))
      .catch(err => res.serverError(err));
  }
};

