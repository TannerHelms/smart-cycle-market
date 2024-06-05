import { RequestHandler } from "express";
import UserModel from "src/models/user";
import crypto from 'crypto'
import AuthVerificationToken from "src/models/authVerificationToken";
import nodemailer from 'nodemailer'
import { sendErrorRes } from "src/utils/helper";
import { Codes } from "src/utils/codes";
import { isValidObjectId } from "mongoose";
import jwt from 'jsonwebtoken'
import { ref } from "yup";
import mail from "src/utils/mail";
import { profile } from "console";
import PasswordResetTokenModel from "src/models/passwordResetToken";
import { v2 as cloudinary } from 'cloudinary'
import cloudUploader from "src/cloud";



export const createNewUser: RequestHandler = async (req, res) => {
    const { email, password, name } = req.body;

    if (!email) return sendErrorRes(res, 'Email is required', Codes.INVALID_DATA)
    if (!password) return sendErrorRes(res, 'Password is required', Codes.INVALID_DATA)
    if (!name) return sendErrorRes(res, 'Name is required', Codes.INVALID_DATA)
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) return sendErrorRes(res, 'User already exists', Codes.UNAUTHORIZED)

    // Create user    
    const user = await UserModel.create({ email, password, name })

    // Create token
    const token = crypto.randomBytes(36).toString('hex')
    await AuthVerificationToken.create({ owner: user._id, token })

    // Send verification email
    const link = `${process.env.VERIFICATION_LINK}?id=${user._id}&token=${token}`
    await mail.sendVerification(email, link)

    res.json({ message: "Please check your inbox " })
}

export const verifyEmail: RequestHandler = async (req, res) => {
    const { id, token } = req.body;
    const authToken = await AuthVerificationToken.findOne({ owner: id });
    if (!authToken) return sendErrorRes(res, 'unauthorized request!', Codes.UNAUTHORIZED)

    const isMatched = await authToken.compareToken(token)
    if (!isMatched) return sendErrorRes(res, 'unauthorized request, invalid token!', Codes.UNAUTHORIZED)

    await UserModel.findByIdAndUpdate(id, { verified: true })

    await AuthVerificationToken.findByIdAndDelete(authToken._id)

    res.json({ message: 'Thanks for joining us, your email is verified.' })
}

export const signIn: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if (!user) return sendErrorRes(res, 'User not found', Codes.UNAUTHORIZED)
    const isMatched = await user.comparePassword(password)
    if (!isMatched) return sendErrorRes(res, 'Invalid password', Codes.UNAUTHORIZED)

    const payload = { id: user._id }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET!!, {
        expiresIn: '15m'
    })

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET!!)

    if (!user.tokens) user.tokens = [refreshToken]
    else user.tokens.push(refreshToken)
    await user.save()
    res.json({
        profile: {
            id: user._id,
            email: user.email,
            name: user.name,
            verified: user.verified,
            avatar: user.avatar?.url
        },
        tokens: { refresh: refreshToken, access: accessToken },
    })
}

export const sendProfile: RequestHandler = async (req, res) => {
    res.json({ profile: req.user })
}

export const generateVerificationLink: RequestHandler = async (req, res) => {
    const { id } = req.user;
    await AuthVerificationToken.findOneAndDelete({ owner: id })
    const token = crypto.randomBytes(36).toString('hex')
    await AuthVerificationToken.create({ owner: id, token })

    // Send verification email
    const link = `${process.env.VERIFICATION_LINK}?id=${id}&token=${token}`
    await mail.sendVerification(req.user.email, link)
    res.json({ message: "Please check your inbox" })
}

export const grantAccessToken: RequestHandler = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return sendErrorRes(res, 'Invalid token', Codes.UNAUTHORIZED)
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET!!) as { id: string }
    if (!payload.id) {
        return sendErrorRes(res, 'Unauthorized Request!', Codes.UNAUTHORIZED)
    }
    const user = await UserModel.findOne({
        _id: payload.id,
        tokens: refreshToken
    })
    if (!user) {
        await UserModel.findByIdAndUpdate(payload.id, { tokens: [] })
        return sendErrorRes(res, 'Unauthorized Request!', Codes.UNAUTHORIZED)
    }

    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!!, {
        expiresIn: '15m'
    })
    const newRefreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!!)
    user.tokens = user.tokens.filter(t => t !== refreshToken)
    await user.save()
    res.json({ tokens: { access: newAccessToken, refresh: newRefreshToken } })
}

export const signOut: RequestHandler = async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user.id, tokens: req.body.refreshToken })
    if (!user) return sendErrorRes(res, 'Unauthorized Request, user not found!', Codes.UNAUTHORIZED)
    user.tokens = user.tokens.filter(t => t !== req.body.refreshToken)
    await user.save()
    res.send()
}

export const generateForgotPasswordLink: RequestHandler = async (req, res) => {
    const { email } = req.body;
    const user = await UserModel.findOne({ email })
    if (!user) return sendErrorRes(res, 'Account not found', Codes.NOT_FOUND)

    await PasswordResetTokenModel.findOneAndDelete({ owner: user.id })

    const token = crypto.randomBytes(36).toString('hex')
    await PasswordResetTokenModel.create({ owner: user._id, token })

    const passwordResetLink = `${process.env.PASSWORD_RESET_LINK}?id=${user._id}&token=${token}`
    mail.sendPasswordResetLink(email, passwordResetLink)
    res.json({ message: 'Please check your inbox' })
}

export const grantValid: RequestHandler = async (req, res) => {
    res.json({ valid: true })
}

export const updatePassword: RequestHandler = async (req, res) => {
    const { id, password } = req.body
    const user = await UserModel.findById({ _id: id })
    if (!user) return sendErrorRes(res, 'Unauthorized Access!', Codes.UNAUTHORIZED)
    const matched = await user.comparePassword(password)
    if (matched) return sendErrorRes(res, 'The new password must be different', Codes.UNAUTHORIZED)

    user.password = password
    await user.save();

    await PasswordResetTokenModel.findOneAndDelete({ owner: user._id })
    await mail.sendPasswordUpdateMessage(user.email)
    res.json({ message: "Password reset succesfully!" })
}

export const updateProfile: RequestHandler = async (req, res) => {
    const { name } = req.body
    if (typeof name !== "string" || name.trim().length < 3) return sendErrorRes(res, 'Invalid Name', Codes.INVALID_DATA)
    await UserModel.findByIdAndUpdate(req.user.id, { name })
    res.json({ profile: { ...req.user, name } })
}

export const updateAvatar: RequestHandler = async (req, res) => {
    const { avatar } = req.files
    if (Array.isArray(avatar)) {
        return sendErrorRes(res, 'Multiple files are not allowed!', 422)
    }
    if (!avatar.mimetype?.startsWith("image")) return sendErrorRes(res, 'Invalid image file', 422)

    const user = await UserModel.findByIdAndUpdate(req.user.id)
    if (!user) return sendErrorRes(res, 'User not found!', Codes.NOT_FOUND)
    if (user.avatar?.id) {
        await cloudUploader.destroy(user.avatar.id)
    }

    const { secure_url: url, public_id: id } = await cloudUploader.upload(avatar.filepath, {
        width: 300,
        height: 300,
        crop: "thumb",
        gravity: "face"
    })
    user.avatar = { url, id }
    await user.save()
    res.json({ profile: { ...req.user, avatar: user.avatar.url } })
}

export const sendPublicProfile: RequestHandler = async (req, res) => {
    const { id } = req.params
    if (!isValidObjectId(id)) return sendErrorRes(res, 'Invalid user id', Codes.INVALID_DATA)
    const user = await UserModel.findById(id)
    if (!user) return sendErrorRes(res, 'User not found!', Codes.NOT_FOUND)
    res.json({ profile: { id: user._id, name: user.name, avatar: user.avatar?.url } })
}