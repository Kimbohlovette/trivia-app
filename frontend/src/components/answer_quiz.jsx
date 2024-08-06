import SubmitButton from "@/components/submit_button";
import InputField from "./input_field";
import { useEffect, useState } from "react";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AnswerQuiz = (props) => {
	const [answer, setAnswer] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch(`${BASE_URL}/api/v1/answer_quiz`, {
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
			})
			.finally(() => {
				setIsLoading(false);
			});
	};
	return (
		<>
			{isLoading ? (
				<p>Processing answer ...</p>
			) : (
				<form onSubmit={handleSubmit} className="">
					<p className="text-gray-600">{props.quiz.question}</p>
					<div className="flex items-center py-5 gap-4">
						<InputField
							onChange={(e) => {
								setAnswer(e.target.value);
							}}
							value={answer}
							placeholder="Enter your answer..."
							disabled={isLoading}
						/>
						<SubmitButton disabled={!answer || isLoading} />
					</div>
				</form>
			)}
		</>
	);
};

export default AnswerQuiz;
