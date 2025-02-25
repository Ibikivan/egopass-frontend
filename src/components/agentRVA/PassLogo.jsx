
/**
 * A UI component for displaying a logo image with customizable dimensions and positioning
 * @component
 * @param {Object} props - The component props
 * @param {string} props.name - The name of the logo to be used in the alt text
 * @param {string} props.source - The source URL of the logo image
 * @param {string|number} props.width - The width of the logo container
 * @param {string|number} props.height - The height of the logo container
 * @param {number} props.translate - The vertical translation value in pixels to adjust logo position
 * @param {string} props.classList - Additional CSS classes to apply to the logo container
 * @returns {JSX.Element} A div containing the logo image with specified styling
 */
export default function PassLoGo({name, source, width, height, translate, classList}) {

    return <div style={{width, height, overflow: 'hidden'}} className={classList}>
        <img src={source} alt={`logo-${name}`} style={{width, height: 'auto', objectFit: 'cover', transform: `translateY(-${translate}px)`}} />
    </div>
}
