import { useState } from "react";
import FeaturedList from "../components/Index/FeaturedList";
import Popup from "../components/popup/Popup";

export default function HomePage() {
	const [show, setShow] = useState(false);

	return (
		<>
			<FeaturedList />
			<button onClick={() => setShow((prev) => !prev)}>zmien popup</button>
			{show && (
				<Popup isHidden={true}>
					<div>test</div>
					<button onClick={() => setShow((prev) => !prev)}>zmien popup</button>
				</Popup>
			)}
		</>
	);
}
