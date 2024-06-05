import { Router } from 'express';
import { createNewUser, generateForgotPasswordLink, generateVerificationLink, grantAccessToken, grantValid, sendProfile, sendPublicProfile, signIn, signOut, updateAvatar, updatePassword, updateProfile, verifyEmail } from 'controllers/auth';
import { newUserSchema, resetPasswordSchema, verifyTokenSchema } from 'src/utils/validationSchema';
import { validate } from 'src/middleware/validator';
import { isAuth, isValidPassResetToken } from 'src/middleware/auth';
import { fileParser } from 'src/middleware/fileParser';

const authRouter = Router();

authRouter.post('/sign-up', validate(newUserSchema), createNewUser);
authRouter.post('/verify', validate(verifyTokenSchema), verifyEmail)
authRouter.post('/sign-in', signIn)
authRouter.get('/profile', isAuth, sendProfile);
authRouter.get('/verify-token', isAuth, generateVerificationLink)
authRouter.post('/refresh-token', grantAccessToken)
authRouter.post('/sign-out', isAuth, signOut)
authRouter.post('/forgot-password', generateForgotPasswordLink)
authRouter.post('/verify-password-reset-token', validate(verifyTokenSchema), isValidPassResetToken, grantValid)
authRouter.post('/reset-password', validate(resetPasswordSchema), isValidPassResetToken, updatePassword)
authRouter.patch('/update-profile', isAuth, updateProfile)
authRouter.patch('/update-avatar', isAuth, fileParser, updateAvatar)
authRouter.get('/profile/:id', isAuth, sendPublicProfile);

export default authRouter;