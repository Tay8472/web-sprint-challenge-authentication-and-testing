/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

function restrict() {
  return async (req, res, next) => {
    let authError = {
      you: "shall not pass!",
    };
    try {
      if (!req.session || !req.session.user) {
        return res.status(401).json(authError);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  restrict,
}