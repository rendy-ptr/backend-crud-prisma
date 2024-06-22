const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => { 
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({
            message: "No token provided!",
        });
    }
    jwt.verify(token, process.env.JWT_SECRET_SAYA, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
}

const isAdmin = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader && bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_SAYA, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized!",
            });
        }
        if (decoded.role !== "ADMIN") {
            return res.status(403).json({
                message: "Require Admin Role!",
            });
        }
        next();
    });
}

module.exports = {
    verifyToken,
    isAdmin,
}