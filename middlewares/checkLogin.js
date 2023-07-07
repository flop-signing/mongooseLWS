const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    const { authoraization } = req.headers;
    try {
        const token = authoraization.split(' ')[1];
        // verify the token using jwt.verify which ensure that the token is either valid or not
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { username, userId } = decoded;
        req.username = username;
        req.userId = userId;
        next();
    } catch {
        next('Authentication Failure.');
    }
};
module.exports = checkLogin;
// How user can send the jwt token to us.There are two option First is the user can send through req.body and the next option is by using request header which is best practicing

// So the Header is 'Authoraization' and the value is 'Bearer Token'
