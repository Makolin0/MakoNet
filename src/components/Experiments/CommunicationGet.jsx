import "./Experiments.css";

export default function CommunicationGet({ data }) {
	return (
		<div className="visible">
			<h1>Text:</h1>
			<h3>{data}</h3>
		</div>
	);
}
