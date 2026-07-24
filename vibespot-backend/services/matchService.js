import supabase from "../config/supabase.js";
import AppError from "../utils/AppError.js";
import { mapMatch } from "../mappers/matchMapper.js";

export const getMatchesService = async (user) => {

    // Fetch all matches for the logged-in user
    const { data: matches, error: matchError } = await supabase
        .from("matches")
        .select("*")
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`);

    if (matchError) {
        throw new AppError(matchError.message, 500);
    }

    // Filter expired matches
    const now = new Date();

    const activeMatches = matches.filter(
        match => new Date(match.expires_at) > now
    );

    // If no active matches
    if (activeMatches.length === 0) {
        return {
            message: "No active matches found.",
            data: []
        };
    }

    // Collect all other user IDs
    const otherUserIds = activeMatches.map(match =>
        match.user1_id === user.id
            ? match.user2_id
            : match.user1_id
    );

    // Fetch all matched users in a single query
    const { data: users, error: userError } = await supabase
        .from("users")
        .select("id, username, avatar")
        .in("id", otherUserIds);

    if (userError) {
        throw new AppError(userError.message, 500);
    }

    // Build lookup map for O(1) access
    const userMap = new Map(
        users.map(user => [user.id, user])
    );

    // Create DTO response
    const result = activeMatches.map(match => {

        const otherUserId =
            match.user1_id === user.id
                ? match.user2_id
                : match.user1_id;

        const matchedUser = userMap.get(otherUserId);

        return mapMatch(match, matchedUser);jj

    });

    return {

        message: "Matches fetched successfully.",

        data: result

    };

};