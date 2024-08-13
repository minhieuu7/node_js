const User = require("../model/User");
const userValidator = require("../validation/user");
const bcryptjs = require("bcryptjs");
const signUp = async (req, res) => {
    try {
        //validate user 
        const {error} = userValidator.validate(req.body, {abortEarly: false});
        if(error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            });
        }
        
        // kiểm tra user tồn tại
        const userExits = await User.findOne({email: req.body.email});
        if(userExits) return res.status(400).json({message: "email này đã được đăng ký !"})

        // mã hóa password
        const hasedPassword = await bcryptjs.hash(req.body.password, 10)

        // khởi tạo user 
        const newUser = await User.create({
            ...req.body, 
            password: hasedPassword
        })

        // xóa mật khẩu, đăng ký thành công !
        User.password = undefined
        return res.status(200).json({
            message: "Đăng ký thành công ",
            user: newUser
        })

    } catch (error) {
        return error.message;
    }
}

const signIn = (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {signUp};