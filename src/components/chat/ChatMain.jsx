import { useState } from "react";
import ChatSetName from "./ChatSetName";
import ChatWindow from "./ChatWindow";

export default function ChatMain() {
	const [nick, setNick] = useState(null);

	return (
		<main>
			<h1 style={{ color: "white" }}>NOT FINAL</h1>
			{!nick && <ChatSetName setNick={setNick} />}
			{nick && <ChatWindow nick={nick} />}
		</main>
	);
}
