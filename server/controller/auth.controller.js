import { userModel } from "../model/user.model.js"
import { ApiError, options, sendToken } from "../utils/utility.js"
import bcrypt from "bcrypt"

const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user = await userModel.create({ name, email, password })
        sendToken(res, 201, user, `welcome ${user.name}`)
    } catch (err) {
        next(err)
    }

}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email }).select("+password")
        if (!user) return next(new ApiError("Invalid Email", 404))
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return next(new ApiError("Wrong password", 401))
        sendToken(res, 200, user, `Welcome back ${user.name}`)

    } catch (err) {
        console.error(err.message)
        next(err)
    }
}


const logout = async (req, res, next) => {
    try {
        res.cookie("token", "", { ...options, maxAge: "0" })
        return res.status(200).json({
            success: true,
            message: "user logged out"
        })
    } catch (err) {
        next(err)
    }
}


export {
    login,
    signup,
    logout,
}