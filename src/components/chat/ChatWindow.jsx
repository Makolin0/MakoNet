import { useEffect, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

import classes from "./ChatWindow.module.css";

export default function ChatWindow({ nick }) {
	const [stompClient, setStompClient] = useState(null);
	const [messages, setMessages] = useState([]);
	const [text, setText] = useState("");

	function sendMessage(event) {
		event.preventDefault();
		const message = {
			nick: nick,
			message: text,
			type: "CHAT",
		};
		stompClient.send("/app/chat", {}, JSON.stringify(message));
		setText("");
	}

	useEffect(() => {
		const socket = new SockJS("http://localhost:8080/ws");
		const client = Stomp.over(socket);

		client.connect({}, () => {
			client.subscribe("/topic/public", (message) => {
				const recievedMessage = JSON.parse(message.body);
				setMessages((prev) => [recievedMessage, ...prev]);
			});
		});

		setStompClient(client);

		return () => {
			if (stompClient) {
				stompClient.disconnect();
			}
		};
	}, []);

	return (
		<div className={classes.container}>
			<h1>Chat</h1>
			<form onSubmit={sendMessage} className={classes.inputContainer}>
				<textarea value={text} onChange={(evt) => setText(evt.target.value)} />
				<button>Wyślij</button>
			</form>
			<ol>
				{messages.map((message, index) => (
					<li key={index}>
						<h5>{message.nick}</h5>
						<p>{message.message}</p>
					</li>
				))}
			</ol>
		</div>
	);
}
