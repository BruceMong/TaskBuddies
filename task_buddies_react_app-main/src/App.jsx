import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./routes/Router"; // Importez votre fichier Routers

import store from "./store/store";
import { Provider } from "react-redux";

const App = () => {
	return (
	<Provider store={store}>
		<Router>
			<Routers />
		</Router>
	</Provider>

	);
  };
export default App;
