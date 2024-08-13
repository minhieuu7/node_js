const Joi = require('joi');

const userValidator = Joi.object({
    userName: Joi.string().required().messages({
        "string.empty": "userName không được để trống !"
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "email không để trống !",
        "string.email": "email không hợp lệ !"
    }),
    password: Joi.string().required().min(8).messages({
        "string.empty": "password không để trống !",
        "string.min": "password tối thiểu {#limit} ký tự !"
    }),
    passwordConfirm: Joi.string().required().min(8).valid(Joi.ref("password")).messages({
        "string.empty": "passwordConfirm không để trống !",
        "string.min": "password tối thiểu {#limit} ký tự !",
        "any.only": "password không khớp !"
    })
})

module.exports = userValidator;