import { useState } from "react";
import ChatSetName from "./ChatSetName";
import ChatWindow from "./ChatWindow";

export default function ChatMain() {
	const [nick, setNick] = useState(null);

	return (
		<>
			{!nick && <ChatSetName setNick={setNick} />}
			{nick && <ChatWindow nick={nick} />}
		</>
	);
}
