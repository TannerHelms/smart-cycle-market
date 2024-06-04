import { RequestHandler } from 'express'
import { Codes } from 'src/utils/codes'
import { sendErrorRes } from 'src/utils/helper'
import * as yup from 'yup'

export const validate = (schema: yup.Schema): RequestHandler => {
    return async (req, res, next) => {
        try {
            await schema.validate(
                { ...req.body },
                { strict: true, abortEarly: true })
            next()
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                sendErrorRes(res, error.message, Codes.INVALID_DATA)
            } else {
                next(error)
            }
        }
    }
}