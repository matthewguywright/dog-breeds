import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Typography } from "@mui/material";

const container = document.getElementById("root")!;
const root = createRoot(container);
const App = lazy(() => {
  return import("./App");
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense
          fallback={
            <Typography variant="h2">Loading Application...</Typography>
          }
        >
          <App />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
