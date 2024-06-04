import { RequestHandler } from "express";
import { sendErrorRes } from "src/utils/helper";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import UserModel from "src/models/user";
import PasswordResetTokenModel from "src/models/passwordResetToken";

interface UserProfile {
    id: string;
    email: string;
    name: string;
    verified: boolean;
}

declare global {
    namespace Express {
        interface Request {
            user: UserProfile
        }
    }
}

export const isAuth: RequestHandler = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken) return sendErrorRes(res, "Unauthorized Request", 403);

        const token = authToken.split("Bearer ")[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET!!) as { id: string }

        const user = await UserModel.findById(payload.id)
        if (!user) return sendErrorRes(res, "Unauthorized Request", 403);

        req.user = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            verified: user.verified
        }

        next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return sendErrorRes(res, "Session Expired!", 401);
        }
        if (error instanceof JsonWebTokenError) {
            return sendErrorRes(res, "Unauthorized Access!", 401);
        }
        next(error)
    }
}

export const isValidPassResetToken: RequestHandler = async (req, res, next) => {
    const { id, token } = req.body
    const resetPassToken = await PasswordResetTokenModel.findOne({ owner: id })
    if (!resetPassToken) return sendErrorRes(res, "Unauthorized Request, invalid token", 403);
    const matched = await resetPassToken.compareToken(token)
    if (!matched) return sendErrorRes(res, "Unauthorized Request, invalid token", 403);
    next()
}