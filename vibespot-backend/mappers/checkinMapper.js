export const mapCheckIn = (checkIn) => {

    if (!checkIn) return null;

    return {

        id: checkIn.id,

        placeName: checkIn.place_name,

        latitude: checkIn.lat,

        longitude: checkIn.lng,

        checkedInAt: checkIn.checkin_at,

        checkedOutAt: checkIn.checkout_at,

        isActive: checkIn.is_active

    };

};