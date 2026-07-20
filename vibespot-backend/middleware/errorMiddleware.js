import { errorResponse } from "../utils/apiResponse.js";
import { logger } from "../utils/logger.js";

const errorMiddleware = (err, req, res, next) => {

    logger.error(err.message);

    const statusCode = err.statusCode || 500;

    return res
        .status(statusCode)
        .json(
            errorResponse(
                err.message || "Internal Server Error"
            )
        );

};

export default errorMiddleware;