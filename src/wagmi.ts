import { getDefaultClient } from "connectkit";
import { createClient } from "wagmi";
import { filecoinHyperspace } from "wagmi/chains";

const chains = [filecoinHyperspace];

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: "Qourier",
    chains,
  })
);
