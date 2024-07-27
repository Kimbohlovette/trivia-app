import SubmitButton from "@/components/submit_button";
import InputField from "./input_field";
const AnswerQuiz = (props) => {
	return (
		<div className="container">
			<p className="text">{props.question}</p>
			<InputField placeholder="Enter your answer ..." />
			<SubmitButton />
		</div>
	);
};

export default AnswerQuiz;
