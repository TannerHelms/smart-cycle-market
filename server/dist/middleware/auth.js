"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.isAuth = void 0;
const helper_1 = require("../utils/helper");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authToken = req.headers.authorization;
        if (!authToken)
            return (0, helper_1.sendErrorRes)(res, "Unauthorized Request", 403);
        const token = authToken.split("Bearer ")[1];
        const payload = jsonwebtoken_1.default.verify(token, "secret");
        const user = yield user_1.default.findById(payload.id);
        if (!user)
            return (0, helper_1.sendErrorRes)(res, "Unauthorized Request", 403);
        req.user = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            verified: user.verified
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            return (0, helper_1.sendErrorRes)(res, "Session Expired!", 401);
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return (0, helper_1.sendErrorRes)(res, "Unauthorized Access!", 401);
        }
        next(error);
    }
});
exports.isAuth = isAuth;
