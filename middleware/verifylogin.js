const jwt = require("jsonwebtoken");

function isLoggedIn(req, res, next) {
    let token = req.headers.authorization;
    
    if (!token) return res.status(401).json({ error: "Please login" });

    try {
        let decode = jwt.verify(token, "yahoo"); // ✅ Correctly store decoded token
        req.user = decode; // ✅ Attach decoded user data to `req.user`
        next(); // ✅ Move to the next middleware
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = isLoggedIn;
