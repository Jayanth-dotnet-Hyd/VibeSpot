import { registerUserService } from "../services/authService.js";

export const registerUser = async (req, res) => {

    try {

        const result = await registerUserService(req.body);

        return res.status(201).json({
            success: true,
            ...result
        });

    }
    catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const loginUser = async (req, res) => {
    res.json({ message: "Login coming soon." });
};

export const getCurrentUser = async (req, res) => {
    res.json({ message: "Current user coming soon." });
};

export const logoutUser = async (req, res) => {
    res.json({ message: "Logout coming soon." });
};