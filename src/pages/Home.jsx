import toast from "react-hot-toast";
import FeaturedList from "../components/Index/FeaturedList";

export default function HomePage() {
	return (
		<>
			<FeaturedList />
			<button onClick={() => toast("hgello")}>toast</button>
		</>
	);
}
