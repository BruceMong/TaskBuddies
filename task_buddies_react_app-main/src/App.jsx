import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./routes/Router"; // Importez votre fichier Routers

const App = () => {
	return (
	<Router>
		<Routers />
	</Router>
	);
  };
export default App;
