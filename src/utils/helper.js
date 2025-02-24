
export function getIdentifier(method, userData) {
    const identifier = {}
    if (method === "email") {
        identifier.email = userData.email;
        identifier.phoneNumber = null;
    }
    if (method === "sms") {
        identifier.email = null;
        identifier.phoneNumber = userData.phoneNumber;
    }
    return identifier;
}
