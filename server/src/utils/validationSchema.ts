import { isValidObjectId } from 'mongoose';
import * as yup from 'yup';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const password = {
    password: yup.string().required("Password is missing")
}

const tokenAndId = {
    id: yup.string().test({
        name: 'valid-id',
        message: 'Invalid user id',
        test: (value) => {
            return isValidObjectId(value)
        }
    }),
    token: yup.string().required("Token is missing"),
}

yup.addMethod(yup.string, 'email', function validateEmail(message) {
    return this.matches(emailRegex, {
        message,
        name: 'email',
        excludeEmptyString: true
    })
})

export const newUserSchema = yup.object({
    name: yup.string().required("Name is missing"),
    email: yup.string().email("Invalid Email").required("Email must be valid"),
    ...password
})


export const verifyTokenSchema = yup.object({
    ...tokenAndId
})


export const resetPasswordSchema = yup.object({
    ...tokenAndId,
    ...password
})