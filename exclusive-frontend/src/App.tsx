import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes";


const App = () => {
	return (
		<>
			<Toaster position="bottom-center" />
			<AppRoutes />
		</>
	);
};

export default App;
