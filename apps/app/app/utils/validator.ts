import * as yup from 'yup';

type ValidationResult<T> = { error?: string, values?: T }

export const yupValidate = async <T extends object>(schema: yup.Schema, values: T): Promise<ValidationResult<T>> => {
    try {
        const data = await schema.validate(values)
        return { values: data }
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return { error: error.message }
        } else {
            return { error: (error as any).message }
        }
    }
}

export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const password = {
    password: yup.string().required("Password is missing")
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

export const signInSchema = yup.object({
    email: yup.string().email("Invalid Email").required("Email must be valid"),
    ...password
})

export const newProductSchema = yup.object({
    name: yup.string().required("Name is missing"),
    description: yup.string().required("Description is missing"),
    price: yup.string().transform((value) => {
        if (isNaN(+value)) return ""
        return value
    }).required("Product Price is missing"),
    purchasingDate: yup.date().required("Purchasing Date is missing"),
    category: yup.string().required("Category is missing")
})
