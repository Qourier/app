import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import { MantineProvider } from "@mantine/core";

import { createHashRouter, RouterProvider } from "react-router-dom";

import { client } from "./wagmi";

import Layout from "./routes/layout";
import App from "./routes/app";
import Hub, { FaqWithHeader } from "./routes/hub";
import Qourier from "./routes/qourier";
import Index from "./routes/index";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/hub",
        element: <App />,
      },
      {
        path: "/hub/:hubAddress",
        element: <FaqWithHeader />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <MantineProvider
          theme={{ colorScheme: "dark" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <RouterProvider router={router} />
        </MantineProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
