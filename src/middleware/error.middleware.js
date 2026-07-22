import AppError from "../errors/AppError.js";

export function errorHandler(err, req, res, next) {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    if (err.code === "P2002") {
        return res.status(409).json({
            success: false,
            message: "Resource already exists"
        });
    }

    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
}