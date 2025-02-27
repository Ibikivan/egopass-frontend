
/**
 * Generates an identifier object based on the provided method and user data.
 *
 * @param {string} method - The method used to identify the user, either "email" or "sms".
 * @param {Object} userData - The user data containing the email and phone number.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.phoneNumber - The user's phone number.
 * @returns {Object} An identifier object with either the email or phone number set, and the other set to null.
 */
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

/**
 * Adapts the specified URI by resolving it relative to the base API URL.
 *
 * The function constructs a new URL object using the provided URI and the base URL
 * defined in the VITE_API_URL environment variable.
 *
 * @param {string} uri - The URI to adapt, which can be either relative or absolute.
 * @returns {URL} A URL object representing the absolute URL resolved against the base API URL.
 */
export function hostUriADapter(uri) {
    if (uri) return new URL(uri, import.meta.env.VITE_API_URL);
}

/**
 * Positionne l'élément relatif par rapport à l'élément référence, à la taille de la page et à la marge
 * @param {HTMLElement} reference 
 * @param {HTMLElement} relativeElement 
 * @param {number} margin 
 */
export function handleScroll(reference, relativeElement, margin) {
    const rect = reference.getBoundingClientRect()
    const intersecting = rect.top < window.innerHeight
    const movingY = rect.top - margin
    const fixedY = window.innerHeight - margin

    if (relativeElement) relativeElement.style.top = `${intersecting ? movingY: fixedY}px`
}

/**
 * @param {SyntheticEvent} e 
 */
export const preventClickBehaviour = (e) => {
    e.stopPropagation()
}

/**
 * Passe le display de la modal à none après l'animation
 * @param {boolean} isModalOpen 
 * @param {RefObject} ref 
 */
export const handleAnimCoplete = (isModalOpen, ref) => {
    if (!isModalOpen) ref.current.style.display = ''
}
