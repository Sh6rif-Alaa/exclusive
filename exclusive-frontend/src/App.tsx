import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Layout from "./components/Layout";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "",
			element: <Layout />,
			children: [
				{ index: true, element: <Home /> },

				{ path: "*", element: <NotFound /> },
			],
		},
	]);

	return (
		<>
			<Toaster position="bottom-center" />
			<RouterProvider router={router} />
		</>
	);
};

export default App;
