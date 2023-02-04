import { Outlet, Link, useParams } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import {
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useContractRead,
} from "wagmi";
import hubABI from "../../abi/hub.json";

export async function loader({ params }: { params: any }) {
  return params;
}

export default function Hub() {
  let { hubAddress: hub } = useParams();

  const hubContractConfig: any = {
    address: hub,
    abi: hubABI,
  };

  const { data: getHub }: any = useContractRead({
    ...hubContractConfig,
    functionName: "getHub",
  });

  const { data } = useContractInfiniteReads({
    cacheKey: "hubAttributes",
    ...paginatedIndexesConfig(
      (index: any): any => {
        return [
          {
            ...hubContractConfig,
            functionName: "getTask",
            args: [BigNumber.from(index)] as const,
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
    cacheTime: 2_000,
  });

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
      {data &&
        data.pages &&
        data.pages.map((page) =>
          page.map((item, i) => {
            if (!item) return;
            const [
              module,
              params,
              result,
              callback,
              qourier,
              tasks,
              createdAt,
              completedAt,
            ]: any = item;
            return (
              <div key={i}>
                <div>module: {ethers.utils.parseBytes32String(module)}</div>
                <div>
                  qourier: <Link to={`/${hub}/${qourier}`}>{qourier}</Link>
                </div>
                <div>
                  {params.map((param: any, j: any) => {
                    if (!ethers.utils.toUtf8String(param)) return;
                    return (
                      <div key={j}>
                        param: {ethers.utils.toUtf8String(param)}
                      </div>
                    );
                  })}
                </div>
                <div>result: {ethers.utils.toUtf8String(result)}</div>
                <div>callback: {callback}</div>
                <div>tasks: {tasks.toString()}</div>
                <div>createdAt: {createdAt.toString()}</div>
                <div>completedAt: {completedAt.toString()}</div>
                <hr></hr>
              </div>
            );
          })
        )}
    </>
  );
}
