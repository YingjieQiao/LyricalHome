import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";

import Home from "./components/Home"


function App() {
  return (
    <div>

        <BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home}/>
			</Switch>
		</BrowserRouter>

    </div>
  );
}

export default App;
