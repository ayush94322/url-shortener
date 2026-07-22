import AppError from "./AppError.js";

export default class ExpiredUrlError extends AppError {
    constructor(message = "Url expired") {
        super(message, 410);
    }
}