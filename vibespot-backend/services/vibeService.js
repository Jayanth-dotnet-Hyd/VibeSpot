import supabase from "../config/supabase.js";
import { v4 as uuidv4 } from "uuid";

export const sendVibeService = async (sender, body) => {

    const { receiverId, emoji } = body;

    // Step 1 - Validate request
    if (!receiverId || !emoji) {
        throw new Error("Receiver ID and emoji are required.");
    }

    // Step 2 - Prevent self-vibe
    if (sender.id === receiverId) {
        throw new Error("You cannot send a vibe to yourself.");
    }

    // Step 3 - Verify receiver exists
    const { data: receiver, error: receiverError } = await supabase
        .from("users")
        .select("*")
        .eq("id", receiverId)
        .maybeSingle();

    if (receiverError) {
        throw new Error(receiverError.message);
    }

    if (!receiver) {
        throw new Error("Receiver not found.");
    }

    // Step 4 - Sender active check-in
    const { data: senderCheckIn } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", sender.id)
        .eq("is_active", true)
        .maybeSingle();

    if (!senderCheckIn) {
        throw new Error("You are not checked in.");
    }

    // Step 5 - Receiver active check-in
    const { data: receiverCheckIn } = await supabase
        .from("checkins")
        .select("*")
        .eq("user_id", receiverId)
        .eq("is_active", true)
        .maybeSingle();

    if (!receiverCheckIn) {
        throw new Error("Receiver is not checked in.");
    }

    // Step 6 - Same place validation
    if (senderCheckIn.place_name !== receiverCheckIn.place_name) {
        throw new Error("You can only send vibes to users at the same place.");
    }

    // We will continue from here in the next step.
    // Step 7 - Check duplicate pending vibe
    const { data: duplicateVibe } = await supabase
        .from("vibes")
        .select("*")
        .eq("sender_id", sender.id)
        .eq("receiver_id", receiverId)
        .maybeSingle();

    if (duplicateVibe) {
        throw new Error("You have already sent a vibe to this user.");
    }

    // Step 8 - Check reverse vibe
    const { data: reverseVibe } = await supabase
        .from("vibes")
        .select("*")
        .eq("sender_id", receiverId)
        .eq("receiver_id", sender.id) // Use your current column name if it's still "receiver_id"
        .maybeSingle();

    if (reverseVibe) {

        const chatRoomId = uuidv4();

        // Create Match
        const { error: matchError } = await supabase
            .from("matches")
            .insert({
                user1_id: sender.id,
                user2_id: receiverId,
                chat_room_id: chatRoomId,
                expires_at: new Date(Date.now() + 10 * 60 * 1000)
            });

        if (matchError) {
            throw new Error(matchError.message);
        }

        // Delete reverse vibe
        await supabase
            .from("vibes")
            .delete()
            .eq("id", reverseVibe.id);

        return {
            matched: true,
            message: "🎉 It's a Match!",
            chatRoomId
        };
    }

    // Step 9 - Insert pending vibe
    const { error: vibeError } = await supabase
        .from("vibes")
        .insert({
            sender_id: sender.id,
            receiver_id: receiverId, // Change to receiver_id if you've renamed the column
            emoji
        });

    if (vibeError) {
        throw new Error(vibeError.message);
    }

    return {
        matched: false,
        message: "Vibe sent successfully."
    };

    return {
        message: "All validations passed. Ready to send vibe."
    };
};

export const getPendingVibesService = async () => {
    return {
        message: "Pending Vibes service is under development."
    };
};