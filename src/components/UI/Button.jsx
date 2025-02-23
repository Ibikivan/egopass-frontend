import Spinner from "./Spinner";

/**
 * A reusable button component with customizable properties.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {'submit'|'button'|'reset'} [props.type='submit'] - The button type attribute
 * @param {string} [props.classList] - Additional CSS classes to apply to the button
 * @param {string} [props.width='w-100'] - The width class of the button
 * @param {string|JSX.Element} props.content - The content to display inside the button
 * 
 * @returns {JSX.Element} A button element with the specified properties
 * 
 * @example
 * <Button
 *   type="submit"
 *   classList="mt-3"
 *   width="w-50"
 *   content="Submit"
 * />
 */
export default function Button({
    type='submit',
    classList,
    width="w-100",
    content,
    onClick=() => null,
    isLoading
}) {

    return <button type={type} className={`btn btn-primary ui_button ${width} ${classList}`} onClick={onClick}>
        {content}
        {isLoading && <Spinner otherClass='text-light small_loader' />}
    </button>
}
