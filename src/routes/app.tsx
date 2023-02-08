import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi";
import factoryABI from "../../abi/factory.json";

import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  Container,
  Anchor,
  Button,
  Tooltip,
  Center,
} from "@mantine/core";

import { IconDoorEnter, IconDoorOff } from "@tabler/icons-react";

const factoryContractConfig = {
  address: "0x0450e8b9166f1067a414fde415735255E27Ab8Fc",
  abi: factoryABI,
};

export default function App() {
  const { data } = useContractInfiniteReads({
    cacheKey: "factoryAttributes",
    ...paginatedIndexesConfig(
      (index: any): any => {
        return [
          {
            ...factoryContractConfig,
            functionName: "getHubById",
            args: [ethers.BigNumber.from(index)] as const,
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
    cacheTime: 2_000,
  });

  const rows =
    data && data.pages && Array.isArray(data.pages)
      ? data.pages.map((page) => {
          if (!page) return;
          return page.map((item, i) => {
            if (!item) return;
            let [hub, personal, task_id, price, modules]: any = item;
            const open = personal === ethers.constants.AddressZero;
            return (
              <tr key={hub + i}>
                <td>
                  <Center>
                    {open ? (
                      <Avatar color="green" radius="sm">
                        <IconDoorEnter />
                      </Avatar>
                    ) : (
                      <Avatar color="red" radius="sm">
                        <IconDoorOff />
                      </Avatar>
                    )}
                  </Center>
                </td>
                <td>
                  <Center>
                    <Link to={`/hub/${hub}`}>
                      <Button variant="subtle" size="sm">
                        {hub}
                      </Button>
                    </Link>
                  </Center>
                </td>
                <td>
                  <Center>
                    <Badge color="indigo">{task_id.toString()}</Badge>
                  </Center>
                </td>
                <td>
                  <Center>
                    <Badge color="orange">
                      {ethers.utils.formatEther(price)} tFIL
                    </Badge>
                  </Center>
                </td>
                <td>
                  <Center>
                    <Tooltip.Group openDelay={300} closeDelay={100}>
                      <Avatar.Group spacing="sm">
                        {modules.map((module: any, i: any) => {
                          if (module === ethers.constants.HashZero) return;
                          return (
                            <Tooltip
                              key={i}
                              label={ethers.utils.parseBytes32String(module)}
                              withArrow
                            >
                              <Avatar radius="xl" color="teal">
                                {ethers.utils
                                  .parseBytes32String(module)
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </Avatar>
                            </Tooltip>
                          );
                        })}
                      </Avatar.Group>
                    </Tooltip.Group>
                  </Center>
                </td>
              </tr>
            );
          });
        })
      : "";

  return (
    <Container size="md">
      <ScrollArea>
        {rows && (
          <Table sx={{ minWidth: 800 }} verticalSpacing="sm" withColumnBorders>
            <thead>
              <tr>
                <th>
                  <Center>Open</Center>
                </th>
                <th></th>
                <th>
                  <Center>Tasks</Center>
                </th>
                <th>
                  <Center>Price</Center>
                </th>
                <th>
                  <Center>Modules</Center>
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </ScrollArea>
    </Container>
  );
}
