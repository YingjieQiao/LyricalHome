import {
	BrowserRouter,
	Switch,
	Route,
} from "react-router-dom";

import Similarity from "./components/Similarity"


function App() {
  return (
    <div>

        <BrowserRouter>
			<Switch>
				<Route path="/" exact component={Similarity}/>
			</Switch>
		</BrowserRouter>

    </div>
  );
}

export default App;
