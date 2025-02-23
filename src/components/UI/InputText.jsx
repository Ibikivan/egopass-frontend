/**
 * A reusable input text component with customizable styles and properties
 * @param {Object} props - The component props
 * @param {string} props.label - Label text for the input
 * @param {string} [props.type="text"] - Input type (e.g. "text", "password", "email")
 * @param {string} props.id - Input element ID
 * @param {string} props.name - Input element name
 * @param {string} [props.value] - Controlled input value
 * @param {string} [props.defaultValue] - Default value for uncontrolled input
 * @param {function} [props.onChange=() => null] - Change event handler
 * @param {boolean} [props.required=false] - Whether the input is required
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.containerClasses] - Additional CSS classes for container div
 * @param {string} [props.labelClasses] - Additional CSS classes for label
 * @param {string} [props.inputClasses] - Additional CSS classes for input
 * @returns {JSX.Element} Input text component with label
 */
export default function InputText({
    label,
    type="text",
    id,
    name,
    value,
    defaultValue,
    onChange=() => null,
    required=false,
    placeholder,
    containerClasses,
    labelClasses,
    inputClasses
}) {

    return <div className={`${containerClasses}`}>
        <label htmlFor={id} className={`form-label ${labelClasses}`}>{label}</label>
        <input 
            type={type}
            className={`form-control ${inputClasses}`} 
            id={id}
            name={name}
            value={value} 
            defaultValue={defaultValue}
            onChange={onChange} 
            required={required}
            placeholder={placeholder}
        />
    </div>
}
