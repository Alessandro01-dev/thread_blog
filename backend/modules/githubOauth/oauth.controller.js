const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const { user } = req
        const redirectUrl = `${process.env.FE_URL}/success?user=${encodeURIComponent(JSON.stringify(user))}`
        res.redirect(redirectUrl)
    } catch (error) {
        next(error)
    }
}

const manageOauthCallback = async (req, res, next) => {
    try {
        const { user } = req;

        const token = jwt.sign({
            id: user._id.toString(),
            name: user.name,
            surname: user.surname,
            avatar: user.avatar
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        const redirectUrl = `${process.env.FE_URL}/success?token=${encodeURIComponent(token)}`;
        res.redirect(redirectUrl);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    auth,
    manageOauthCallback,
}