import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Main } from "./layout/Main";
import { ModuleComponent } from "./ModuleComponent";
import { createRouteTree, extractAllRoutes } from "./routeLoader";

const routeTree = createRouteTree();
const allRoutes = extractAllRoutes(routeTree);

function App() {
  return (
    <>
      <Router>
        <Main routes={routeTree}>
          <Switch>
            {allRoutes.map((route) => {
              return (
                <Route
                  key={route.urlPath}
                  exact
                  path={route.urlPath}
                  component={() => <ModuleComponent route={route} />}
                />
              );
            })}
          </Switch>
        </Main>
      </Router>
    </>
  );
}

render(<App />, document.querySelector("#app"));
