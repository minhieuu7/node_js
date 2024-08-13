const User = require("../model/User");
const userValidator = require("../validation/user");
const bcryptjs = require("bcryptjs");

const signUp = async (req, res) => {
    try {
        const {error} = userValidator.validate(req.body, {abortEarly: false});
        if(error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors
            });
        }
        
        const exitingUser = await User.findOne({email: req.body.email});
        if(exitingUser) return res.status(400).json({message: "email đã được đăng ký !"})

        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        })

        User.password = undefined;
        return res.status(200).json({
            message: "đăng ký thành công !",
            user: newUser
        })

    } catch (error) {
        return error.message;
    }
}

const signIn = async(req, res) => {
    try {
      const {error} = loginValidator.validate(req.body, {abortEarly:false});
      if(error) {
          const errors = error.details.map(item => item.message);
          return res.status(400).json({
              message: errors
          })
      }
      
      // kiểm tra người dùng đã tồn tại hay chưa
      const exitsUser = await userModel.findOne({email: req.body.email});
      if(!exitsUser) {
          return res.status(400).json({
              message: "email chưa được đăng ký !"
          })
      }
      
 
      // so sánh mật khẩu nhập với mật khẩu trong db
      const isMath = await bcrypt.compare(req.body.password, exitsUser.password)
      if(!isMath) {
          return res.status(400).json({
              message: "Mật khẩu không đúng !"
              
          })
      }  
      
      // tạo token 
      const accessToken = jwt.sign({id: exitsUser._id}, "hieuzombie");
 
     // đăng nhập thành công , trả về thông tin user và token 
      exitsUser.password = undefined;
      return res.status(200).json({
         message: 'Đăng nhập thành công',
         user: exitsUser,
         accessToken
      })
 
    } catch (error) {
         return res.status(500).json({
             message: error.message
         })
    }
 
 }

module.exports = {signUp, signIn};