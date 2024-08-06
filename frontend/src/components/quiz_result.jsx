import React from "react";
const QuizResult = (props) => {
	return (
		<div className="flex flex-col gap-2">
			<h1 className="font-semibold text-gray-900">Result</h1>
			<div className="">
				{!!props.answer && (
					<div>
						{/* <FaCircleCheck /> */}
						<p>Great! You got it right!</p>
					</div>
				)}
				{!props.answer && (
					<div>
						{/* <IoIosCloseCircle /> */}
						<p>Opps it&apos;s not correct!</p>
					</div>
				)}
			</div>
		</div>
	);
};
export default QuizResult;
