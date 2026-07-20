const getTimestamp = () => {

    return new Date().toISOString();

};

export const logger = {

    info(message) {

        console.log(
            `[INFO] ${getTimestamp()} - ${message}`
        );

    },

    warn(message) {

        console.warn(
            `[WARN] ${getTimestamp()} - ${message}`
        );

    },

    error(message) {

        console.error(
            `[ERROR] ${getTimestamp()} - ${message}`
        );

    }

};