import SubmitButton from "@/components/submit_button";
import InputField from "./input_field";
import { useEffect, useState } from "react";
const AnswerQuiz = (props) => {
	const [answer, setAnswer] = useState("");
	useEffect(() => {
		console.log(props.quiz);
	}, [props.quiz]);
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:8080/api/v1/answer_quiz", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				answer: answer.toLowerCase(),
				id: props.quiz.id,
			}),
		})
			.then((response) => {
				setAnswer("");
				response.json().then((data) => {
					props.onSettled(data.correct);
				});
			})
			.catch((error) => {
				console.error("Error answering quiz:", error);
			});
	};
	return (
		<form onSubmit={handleSubmit} className="container">
			<p className="text">{props.quiz.question}</p>
			<InputField
				onChange={(e) => {
					setAnswer(e.target.value);
				}}
				value={answer}
				placeholder="Enter your answer..."
			/>
			<SubmitButton />
		</form>
	);
};

export default AnswerQuiz;
