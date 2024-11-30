import jwt from 'jsonwebtoken'


const protectRoute = (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "user not logged in"
            })
        }
        const key = process.env.JWT_SECRET
        const payload = jwt.verify(token, key)

        if (!payload) {
            return res.status(400).json({
                success: false,
                message: "user not authenticated"
            })
        }
        req._id = payload._id
        next()
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

export { protectRoute } 