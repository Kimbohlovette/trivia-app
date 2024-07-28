const InputField = (props) => {
	return (
		<input
			value={props.value}
			type={props.type}
			name={props.name}
			onChange={props.onChange}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
			style={props.style}
			placeholder={props.placeholder}
			required={props.required}
			disabled={props.disabled}
			className="input_field"
		/>
	);
};

export default InputField;
