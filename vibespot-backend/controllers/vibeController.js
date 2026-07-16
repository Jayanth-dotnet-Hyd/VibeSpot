import {
    sendVibeService,
    getPendingVibesService
} from "../services/vibeService.js";

export const sendVibe = async (req, res) => {

    try {

        const result = await sendVibeService(req.user, req.body);

        return res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const getPendingVibes = async (req, res) => {

    try {

        const result = await getPendingVibesService(req.user);

        return res.status(200).json({
            success: true,
            ...result
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};