import { userModel } from "../model/user.model.js";

const getMyProfile = async (req, res, next) => {
    try {
        const user = await userModel.findById(req._id)
        if (!user) return next(new ApiError("User not found", 400))
        res.status(200).json({
            success:true,
            message: "User profile retrieved successfully",
            user
        })
    } catch (err) {
        next(err);
    }

}

export {
    getMyProfile
}