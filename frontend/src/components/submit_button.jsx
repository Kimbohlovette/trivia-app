const SubmitButton = (props) => {
	return (
		<button
			{...props}
			className="bg-blue-500 text-white font-medium py-2 px-4 rounded-sm"
		>
			Submit Quiz
		</button>
	);
};

export default SubmitButton;
