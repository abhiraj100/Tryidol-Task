import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import {v4 as uuid} from "uuid";

class ApiError extends Error {
    constructor(message, code) {
        super(message);
        this.statusCode = code;
    }
}


const sendToken = (res, code, user, message) => {
    const secret = process.env.JWT_SECRET
    const token = jwt.sign({ _id: user._id }, secret)
    res.cookie("token", token, options)
    return res.status(code).json({
        success: true,
        message,
        user
    })

}

const uploadToCloud=async(file)=>{
    try {
        const result=await cloudinary.uploader.upload(file.path,{public_id:uuid()})
        result.url=result.secure_url;
        return result;

    } catch (err) {
        throw new Error(err)
    }
}

const removeFromCloud=async(id)=>{
    try {
        const result=await cloudinary.uploader.destroy(id)
    } catch (err) {
        throw new Error(err)
    }
}


const options = {
    maxAge: 1000 * 24 * 60 * 60 * 2,
    secure: true,
    httpOnly: true,
}

export { ApiError, sendToken, options, uploadToCloud ,removeFromCloud} 