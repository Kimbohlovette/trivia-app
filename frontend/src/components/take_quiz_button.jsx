import React from "react";
const TakeQuizButton = (props) => {
	return (
		<button
			{...props}
			className="bg-blue-500 text-white font-medium py-2 px-4 rounded-sm"
		>
			Take A Quiz
		</button>
	);
};

export default TakeQuizButton;
