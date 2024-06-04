"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationLink = exports.sendProfile = exports.signIn = exports.verifyEmail = exports.createNewUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const crypto_1 = __importDefault(require("crypto"));
const authVerificationToken_1 = __importDefault(require("../models/authVerificationToken"));
const helper_1 = require("../utils/helper");
const codes_1 = require("../utils/codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mail_1 = __importDefault(require("../utils/mail"));
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    if (!email)
        return (0, helper_1.sendErrorRes)(res, 'Email is required', codes_1.Codes.INVALID_DATA);
    if (!password)
        return (0, helper_1.sendErrorRes)(res, 'Password is required', codes_1.Codes.INVALID_DATA);
    if (!name)
        return (0, helper_1.sendErrorRes)(res, 'Name is required', codes_1.Codes.INVALID_DATA);
    const existingUser = yield user_1.default.findOne({ email });
    if (existingUser)
        return (0, helper_1.sendErrorRes)(res, 'User already exists', codes_1.Codes.UNAUTHORIZED);
    const user = yield user_1.default.create({ email, password, name });
    const token = crypto_1.default.randomBytes(36).toString('hex');
    yield authVerificationToken_1.default.create({ owner: user._id, token });
    const link = `http://localhost:3000/verify.html?id=${user._id}&token=${token}`;
    yield mail_1.default.sendVerification(email, link);
    res.json({ message: "Please check your inbox " });
});
exports.createNewUser = createNewUser;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, token } = req.body;
    const authToken = yield authVerificationToken_1.default.findOne({ owner: id });
    if (!authToken)
        return (0, helper_1.sendErrorRes)(res, 'unauthorized request!', codes_1.Codes.UNAUTHORIZED);
    const isMatched = yield authToken.compareToken(token);
    if (!isMatched)
        return (0, helper_1.sendErrorRes)(res, 'unauthorized request, invalid token!', codes_1.Codes.UNAUTHORIZED);
    yield user_1.default.findByIdAndUpdate(id, { verified: true });
    yield authVerificationToken_1.default.findByIdAndDelete(authToken._id);
    res.json({ message: 'Thanks for joining us, your email is verified.' });
});
exports.verifyEmail = verifyEmail;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user)
        return (0, helper_1.sendErrorRes)(res, 'User not found', codes_1.Codes.UNAUTHORIZED);
    const isMatched = yield user.comparePassword(password);
    if (!isMatched)
        return (0, helper_1.sendErrorRes)(res, 'Invalid password', codes_1.Codes.UNAUTHORIZED);
    const payload = { id: user._id };
    const accessToken = jsonwebtoken_1.default.sign(payload, "secret", {
        expiresIn: '15m'
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, "secret");
    if (!user.tokens)
        user.tokens = [refreshToken];
    else
        user.tokens.push(refreshToken);
    yield user.save();
    res.json({
        profile: {
            id: user._id,
            email: user.email,
            name: user.name,
            verified: user.verified
        },
        tokens: { refresh: refreshToken, access: accessToken },
    });
});
exports.signIn = signIn;
const sendProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ profile: req.user });
});
exports.sendProfile = sendProfile;
const generateVerificationLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    yield authVerificationToken_1.default.findOneAndDelete({ owner: id });
    const token = crypto_1.default.randomBytes(36).toString('hex');
    yield authVerificationToken_1.default.create({ owner: id, token });
    const link = `http://localhost:3000/verify.html?id=${id}&token=${token}`;
    yield mail_1.default.sendVerification(req.user.email, link);
    res.json({ message: "Please check your inbox" });
});
exports.generateVerificationLink = generateVerificationLink;
