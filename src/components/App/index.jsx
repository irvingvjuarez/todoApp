import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../../pages/Home";
import Login from "../../pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
