const getJwtToken = require('../helper/getJwtToken');

const cookieToken = (user,res) => {
const token = getJwtToken(user);
const options = {
    expires: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,

}
user.password = undefined;

res.status(200).cookie('token', token, options).json({
    success: true,
    user,
    token    

});

}

module.exports = cookieToken;