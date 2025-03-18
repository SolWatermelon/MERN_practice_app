import jwt from "jsonwebtoken"
// import errorHandler from "../utils/error.js"
import {errorHandler} from "./error.js"




// 驗證使用者的JWT是否有效，並確保請求是由已驗證的使用者發的
// 意即這是一個Expressjs中的middleware，用來攔截請求，檢查是否攜帶有效的JWT
// 注意!postman的cookie要設定好
export const verifyUserToken = (req, res, next) => {
    // Check token from cookie
    const token = req.cookies.access_token;
    // console.log("req",req.cookies)
    // verify token
    if(!token) return next(errorHandler(401, "Unauthorized"))
    // token is correct or not
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // console.log("user~~~~~", user)
        if(err) return next(errorHandler(403, "Forbideen"))
        req.user = user
        next()
    })
}