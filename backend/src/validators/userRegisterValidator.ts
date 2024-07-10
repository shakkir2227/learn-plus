import Joi from "joi";
const schema = Joi.object({

    name: Joi.string()
        .pattern(/^[A-Z][A-Za-z\s]*$/) 
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.pattern.base': 'Name should start with an uppercase letter',
            'string.min': 'Name should have at least {#limit} characters.',
            'string.max': ' Name should not exceed {#limit} characters.',
            'any.required': 'Name is required.',
        }),

    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Enter a valid email address',
            'any.required': 'Email is required',
        }),

    password: Joi.string()
        .min(8)
        .max(30)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        .required()
        .messages({
            'string.min': 'Password should have at least {#limit} characters',
            'string.max': 'Password should not exceed {#limit} characters',
            'string.pattern.base': 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one digit.',
            'any.required': 'Password is required',
        }),


})


export default schema