module.exports = class ApiError extends Error {
    status
    errors

    constructor(status,message,errors = []){
        super(message)
        this.status = status
        this.errors = errors
    }
    static UnathorizeError(){
        return new ApiError(400,'користувач не авторизований',)
    }
    static BadRequest(message,error = []){
        return new ApiError(400,message,error)
    }
};
