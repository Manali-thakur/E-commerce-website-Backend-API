import { validationResult, matchedData } from "express-validator";

export const validate = (req, res, next) =>{
    const result = validationResult(req);

    if(!result.isEmpty()){
        const errors = {};
        for (const e of result.array()){
            errors[e.path] ??= e.msg; //first mess per field
        }
        return res.status(400).json({success: false, msg: "Validation Failed", errors})
    }
    req.body = matchedData(req); //only validated, sanitized fields
    next();
}