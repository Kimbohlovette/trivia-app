import React from "react";
import { FaCircleCheck, IoIosCloseCircle } from "react-icons/fa6";
const QuizResult = (props) => {
	return (
		<div>
			<h1>Result</h1>
			<div>
				{!!props.answer && (
					<div>
						{/* <FaCircleCheck /> */}
						<p>You got it!</p>
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
