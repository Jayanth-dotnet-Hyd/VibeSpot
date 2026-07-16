import supabase from "../config/supabase.js";

export const checkInService = async (user, body) => {

    const { placeName, lat, lng } = body;

    // Validation
    if (!placeName || lat === undefined || lng === undefined) {
        throw new Error("Place name, latitude and longitude are required.");
    }

    // Check for existing active check-in
    const { data: existingCheckIn, error: existingError } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

    if (existingError) {
        throw new Error(existingError.message);
    }

    if (existingCheckIn) {
        throw new Error("You already have an active check-in.");
    }

    // Insert new check-in
    const { data, error } = await supabase
        .from("checkins")
        .insert({
            user_id: user.id,
            place_name: placeName,
            lat,
            lng,
            checkin_at: new Date(),
            is_active: true
        })
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return {
        message: "Checked in successfully.",
        checkIn: data
    };

};
export const checkOutService = async (user) => {

    // Find active check-in
    const { data: activeCheckIn, error: findError } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

    if (findError) {
        throw new Error(findError.message);
    }

    if (!activeCheckIn) {
        throw new Error("No active check-in found.");
    }

    // Update the record
    const { data, error } = await supabase
        .from("checkins")
        .update({
            is_active: false,
            checkout_at: new Date()
        })
        .eq("id", activeCheckIn.id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return {
        message: "Checked out successfully.",
        checkOut: data
    };
};

export const getMyCheckInService = async (user) => {

    const { data, error } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    if (!data) {
        return {
            message: "You are not currently checked in.",
            checkIn: null
        };
    }

    return {
        message: "Current check-in found.",
        checkIn: data
    };

};

export const getNearbyUsersService = async (user) => {

    // Step 1: Find current user's active check-in
    const { data: myCheckIn, error: myError } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .maybeSingle();

    if (myError) {
        throw new Error(myError.message);
    }

    if (!myCheckIn) {
        throw new Error("You are not currently checked in.");
    }

    // Step 2: Find everyone else at the same place
    const { data, error } = await supabase
        .from("checkins")
        .select(`
            id,
            place_name,
            users (
                id,
                username,
                avatar_emoji
            )
        `)
        .eq("place_name", myCheckIn.place_name)
        .eq("is_active", true)
        .neq("user_id", user.id);

    if (error) {
        throw new Error(error.message);
    }

    return {
        message: "Nearby users fetched successfully.",
        users: data
    };

};