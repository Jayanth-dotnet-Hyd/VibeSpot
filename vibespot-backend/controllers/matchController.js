import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { getMatchesService } from "../services/matchService.js";

export const getMatches = asyncHandler(async (req, res) => {

    const result = await getMatchesService(req.user);

    return res.status(200).json(
        successResponse(
            result.message,
            result.data
        )
    );

});