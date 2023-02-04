import { ConnectKitProvider } from "connectkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";

import { createHashRouter, RouterProvider } from "react-router-dom";

import { client } from "./wagmi";

import App, { loader as appLoader } from "./routes/app";
import Hub, { loader as hubLoader } from "./routes/hub";
import Qourier, { loader as qourierLoader } from "./routes/qourier";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    loader: appLoader,
  },
  {
    path: "/:hubAddress",
    element: <Hub />,
    loader: hubLoader,
  },
  {
    path: "/:hubAddress/:qourierAddress",
    element: <Qourier />,
    loader: qourierLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <RouterProvider router={router} />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
