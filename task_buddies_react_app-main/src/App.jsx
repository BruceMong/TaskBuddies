import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./routes/Router"; // Importez votre fichier Routers

<<<<<<< Updated upstream
const App = () => {
	return (
	<Router>
		<Routers />
	</Router>
=======
import store from "./store/store";
import { Provider } from "react-redux";
import Layout from "./components/Layout";

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Layout>
					<Routers />
				</Layout>
			</Router>
		</Provider>
>>>>>>> Stashed changes
	);
};
export default App;
