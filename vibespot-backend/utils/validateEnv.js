import { logger } from "./logger.js";

const requiredVariables = [
    "SUPABASE_URL",
    "SUPABASE_KEY",
    "PORT"
];

const validateEnv = () => {

    const missing = requiredVariables.filter(
        variable => !process.env[variable]
    );

    if (missing.length > 0) {

        logger.error(
            `Missing environment variables: ${missing.join(", ")}`
        );

        process.exit(1);
    }

    logger.info("Environment variables validated successfully.");

};

export default validateEnv;