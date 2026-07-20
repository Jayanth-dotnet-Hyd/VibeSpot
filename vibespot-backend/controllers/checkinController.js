import {
    checkInService,
    checkOutService,
    getMyCheckInService,
    getNearbyUsersService
} from "../services/checkinService.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { mapCheckIn } from "../mappers/checkinMapper.js";

export const checkIn = async (req, res) => {

    try {

        const result = await checkInService(req.user, req.body);

        return res.status(201).json({
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

export const checkOut = async (req, res) => {

    try {

        const result = await checkOutService(req.user);

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

export const getMyCheckIn = asyncHandler(async (req, res) => {

    const result = await getMyCheckInService(req.user);

    return res
        .status(200)
        .json(
            successResponse(
                result.message,
                mapCheckIn(result.checkIn)
            )
        );

});

export const getNearbyUsers = async (req, res) => {

    try {

        const result = await getNearbyUsersService(req.user);

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