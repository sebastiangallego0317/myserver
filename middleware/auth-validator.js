const { check, validationResult } = require('express-validator');


let validatorParams = [
            check('email').isEmail(),
            check('contrasena').isLength({ min: 10, max: 15})
      ];

      
function validator(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          
          return res.status(422).json({ errors: errors.array() });
        }
        next();
    };


module.exports = {
  validatorParams,
  validator
}
