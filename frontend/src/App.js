import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";

import Similarity from "./components/Similarity"
import Ranking from "./components/Ranking"

function App() {
  return (
    <div>

        <BrowserRouter>
			<Switch>
				<Route path="/similarity" exact component={Similarity}/>
				<Route path="/ranking" exact component={Ranking}/>
			</Switch>
		</BrowserRouter>

    </div>
  );
}

export default App;
