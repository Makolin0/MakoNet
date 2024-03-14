import { Outlet } from "react-router";
import ExperimentsNavigation from "../../components/Experiments/ExperimentsNavigation";

export default function RootLayoutExperiments() {
	return (
		<>
			<ExperimentsNavigation />
			<Outlet />
		</>
	);
}
