import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./layout/Main";
import { ModuleComponent } from "./ModuleComponent";
import { createRouteTree, extractAllRoutes } from "./routeLoader";
import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";

const routeTree = createRouteTree();
const allRoutes = extractAllRoutes(routeTree);

function App() {
  return (
    <>
      <Router>
        <Main routes={routeTree}>
          <Routes>
            {"__STARTPAGE_COMPONENT_PATH__" && (
              <Route
                path="/"
                element={
                  <ModuleComponent
                    route={{
                      component: () =>
                        import("__STARTPAGE_COMPONENT_PATH__" as string),
                      urlPath: "/",
                      name: "startpage",
                      headName: "startpage",
                    }}
                  />
                }
              />
            )}
            {allRoutes.map((route) => {
              return (
                <Route
                  key={route.urlPath}
                  path={route.urlPath}
                  Component={() => <ModuleComponent route={route} />}
                />
              );
            })}
          </Routes>
        </Main>
      </Router>
    </>
  );
}

const container = document.querySelector("#app");
const root = createRoot(container!);
root.render(<App />);
