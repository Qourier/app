import { Outlet, Link, useParams } from "react-router-dom";
import { ethers } from "ethers";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import hubABI from "../../abi/hub.json";

export async function loader({ params }: { params: any }) {
  return params;
}

export default function Qourier() {
  let { hubAddress: hub, qourierAddress: qourier }: any = useParams();

  const { data: getHub }: any = useContractRead({
    address: hub,
    abi: hubABI,
    functionName: "getHub",
  });

  const { data }: any = useContractRead({
    address: hub,
    abi: hubABI,
    functionName: "getBalance",
    args: [qourier],
  });

  const { config } = usePrepareContractWrite({
    address: hub,
    abi: hubABI,
    functionName: "withdraw",
  });
  const {
    data: withdraw,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite(config);

  const [personal, task_id, price, modules] = getHub || [];

  return (
    <>
      {personal && (
        <div>
          <div>hub: {hub}</div>
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
      )}
      <hr></hr>
      {data && ethers.utils.formatEther(data)}
      <hr></hr>
      <button disabled={!write} onClick={() => write?.()}>
        withdraw
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div>Transaction: {JSON.stringify(withdraw)}</div>}
    </>
  );
}
