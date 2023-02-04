import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import factoryABI from "../../abi/factory.json";

const factoryContractConfig = {
  address: "0x38c8A563b4873FEEd2B3a592bA08ce8BAE59Df8d",
  abi: factoryABI,
};

import { Account } from "../components";

export async function loader({ params }: { params: any }) {
  return params;
}

export default function App() {
  const { isConnected } = useAccount();

  const { data } = useContractInfiniteReads({
    cacheKey: "factoryAttributes",
    ...paginatedIndexesConfig(
      (index: any): any => {
        return [
          {
            ...factoryContractConfig,
            functionName: "getHubById",
            args: [BigNumber.from(index)] as const,
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
    cacheTime: 2_000,
  });

  return (
    <>
      <h1>Qourier</h1>
      <ConnectKitButton />
      {isConnected && <Account />}
      <hr></hr>
      {data &&
        data.pages &&
        data.pages.map((page) =>
          page.map((item) => {
            if (!item) return;
            const [hub, personal, task_id, price, modules]: any = item;
            return (
              <div key={hub}>
                <div>
                  hub: <Link to={`/${hub}`}>{hub}</Link>
                </div>
                <div>personal: {personal}</div>
                <div>task_id: {task_id.toString()}</div>
                <div>price: {price.toString()}</div>
                <div>
                  {modules.map((module: any) => {
                    if (module === ethers.constants.HashZero) return;
                    return (
                      <div key={hub + module}>
                        module: {ethers.utils.parseBytes32String(module)}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
    </>
  );
}
