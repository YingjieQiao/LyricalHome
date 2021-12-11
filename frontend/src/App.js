import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";

import Home from "./components/Home"
import Similarity from "./components/Similarity"
import Ranking from "./components/Ranking"

function App() {
  return (
    <div>

        <BrowserRouter>
			<Switch>
			<Route path="/" exact component={Home}/>
				<Route path="/similarity" exact component={Similarity}/>
				<Route path="/ranking" exact component={Ranking}/>
			</Switch>
		</BrowserRouter>

    </div>
  );
}

export default App;
