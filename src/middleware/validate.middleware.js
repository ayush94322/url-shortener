import BadRequestError from "../errors/BadRequestError.js"
export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);
        if(!result.success) {
            return next(
                new BadRequestError(
                    result.error.issues[0].message
                )
            );
        }
        req.validatedData = result.data;
        next();
    }
}