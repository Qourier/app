import { Link, useParams } from "react-router-dom";
import { ethers } from "ethers";
import {
  useContractInfiniteReads,
  paginatedIndexesConfig,
  useContractRead,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import hubABI from "../../abi/hub.json";
import { Prism } from "@mantine/prism";

import moment from "moment";

import {
  createStyles,
  Title,
  Container,
  Text,
  UnstyledButton,
  Overlay,
  SimpleGrid,
  Badge,
  Progress,
  Grid,
  Code,
  Stepper,
  Avatar,
  Table,
  Center,
  Divider,
  Box,
  List,
  ThemeIcon,
  Button,
  Group,
  Paper,
  Stack,
  Loader,
} from "@mantine/core";
import { ContactIconsList } from "../components/HubInfo";
import {
  IconAt,
  IconCircleDotted,
  IconCircleDashed,
  IconCircleCheck,
  IconDoorEnter,
  IconDoorOff,
  IconReceipt2,
  IconListCheck,
  IconHexagons,
  IconSearch,
  IconRun,
  IconCoins,
  IconColorSwatch,
  IconCode,
  IconHourglassEmpty,
  IconPhoneCall,
} from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl * 2,
  },

  header: {
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(135deg, ${theme.colors.gray[7]} 0%, ${theme.colors.gray[9]} 100%)`,
    backgroundSize: "cover",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "relative",
    padding: `${theme.spacing.xl * 1.5}px ${theme.spacing.xl * 2}px`,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.lg,

    "@media (max-width: 1080px)": {
      height: "auto",
      flexDirection: "column-reverse",
      alignItems: "initial",
      padding: theme.spacing.xl,
    },
  },

  title: {
    color: theme.white,
    position: "relative",
    zIndex: 1,
    fontSize: 46,
    fontWeight: 800,
    letterSpacing: -0.5,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 1080px)": {
      fontSize: 22,
      textAlign: "center",
      marginTop: theme.spacing.xl,
    },
  },

  titleOverlay: {
    zIndex: 0,
    position: "absolute",
    color: theme.white,
    fontWeight: 900,
    opacity: 0.1,
    fontSize: 150,
    lineHeight: 1,
    top: 10,
    left: 32,
    pointerEvents: "none",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 1080px)": {
      display: "none",
    },
  },

  contact: {
    padding: `${theme.spacing.xl * 1.5}px`,
    backgroundColor: theme.colors.cyan,
    borderRadius: theme.radius.lg,

    "@media (max-width: 1080px)": {
      padding: `${theme.spacing.xl}px`,
    },
  },

  contactTitle: {
    color: theme.black,
    marginBottom: theme.spacing.xl,
    lineHeight: 1,
  },

  categoryCard: {
    height: 160,
    position: "relative",
    backgroundSize: "100%",
    backgroundPosition: "center",
    color: theme.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.xl,
    overflow: "hidden",
    transition: "background-size 300ms ease",

    "&:hover": {
      backgroundSize: "105%",
    },
  },

  categoryLabel: {
    color: theme.white,
    zIndex: 2,
    position: "relative",
  },
}));

interface FaqWithHeaderProps {
  categories: { image: string; label: string }[];
}

const useStyles2 = createStyles((theme, _params, getRef) => ({
  root: {
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.md,
  },

  separator: {
    height: 2,
    borderTop: `2px dashed ${
      theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4]
    }`,
    borderRadius: theme.radius.xl,
    backgroundColor: "transparent",
  },

  separatorActive: {
    borderWidth: 0,
    backgroundImage: theme.fn.linearGradient(
      45,
      theme.colors.lime[6],
      theme.colors.cyan[6]
    ),
  },

  stepIcon: {
    ref: getRef("stepIcon"),
    borderColor: "transparent",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.white,
    borderWidth: 0,

    "&[data-completed]": {
      borderWidth: 0,
      backgroundColor: "transparent",
      backgroundImage: theme.fn.linearGradient(
        45,
        theme.colors.lime[6],
        theme.colors.cyan[6]
      ),
    },
  },

  step: {
    transition: "transform 150ms ease",

    "&[data-progress]": {
      transform: "scale(1.05)",
    },
  },
}));

import { Timeline } from "@mantine/core";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
} from "@tabler/icons-react";
import { useState } from "react";

const useStyles3 = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,

    "&:hover": {
      boxShadow: theme.shadows.md,
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6]
      ),
    },
  },
  for: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

interface CardGradientProps {
  title: string;
  description: string;
}

export default function Hub() {
  const { classes } = useStyles();
  const { classes: cl2 } = useStyles3();

  const { address } = useAccount();

  let { hubAddress: hub } = useParams();

  const hubContractConfig: any = {
    address: hub,
    abi: hubABI,
  };

  const { data: getBalance }: any = useContractRead({
    ...hubContractConfig,
    functionName: "getBalance",
    args: [address],
  });
  const userBalance =
    getBalance && getBalance.gt(ethers.BigNumber.from("0"))
      ? ethers.utils.formatEther(getBalance)
      : "";

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
            args: [ethers.BigNumber.from(index || "0")] as const,
          },
        ];
      },
      { start: 1, perPage: 10, direction: "increment" }
    ),
    cacheTime: 2_000,
  });

  const [personal, task_id, price, modules] = getHub || [];
  const notTasks =
    task_id && task_id.gt(ethers.BigNumber.from("0")) ? false : true;

  const dataInfo = [
    {
      title: "Open",
      description: (personal === ethers.constants.AddressZero).toString(),
      icon: IconDoorEnter,
    },
    {
      title: "Price",
      description: `${price ? ethers.utils.formatEther(price) : 0} tFIL`,
      icon: IconReceipt2,
    },
    {
      title: "Tasks",
      description: task_id ? task_id.toString() : "0",
      icon: IconListCheck,
    },
  ];

  const { classes: cl } = useStyles2();

  const { config }: any = usePrepareContractWrite({
    ...hubContractConfig,
    functionName: "withdraw",
  });
  const {
    data: withdraw,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite(config);

  const [forQ, setForQ] = useState(false);
  const [forD, setForD] = useState(false);

  const forQouriers = `qourier 
 --network
  filecoin
 --script 
  start 
 --key 
  $PRIVATE_KEY
 --address 
  ${hub}`;
  const forDevelopers = `import "@qourier/contracts/Hub.sol";

Hub(
  ${hub}
).createTaskN{ value: price }
(
  bytes32("module-name"),
  [bytes("param1"), bytes("param2"), ...]
);`;

  return (
    <Container className={classes.wrapper} size="lg">
      <div className={classes.header}>
        <Title className={classes.title}>
          {modules && (
            <List spacing="xs" size="xs" listStyleType="none" center>
              {modules
                .map((m: any) => ethers.utils.parseBytes32String(m))
                .filter((m: any) => !!m)
                .map((m: any, i: any) => (
                  <List.Item key={i}>
                    <Code color="cyan">{m}</Code>
                  </List.Item>
                ))}
            </List>
          )}
          {userBalance && (
            <Button
              color="cyan"
              compact
              size="xs"
              leftIcon={<IconCoins size={33} />}
              disabled={!write}
              onClick={() => write?.()}
            >
              {isLoading
                ? "Waiting for confirmation"
                : `Withdraw ${userBalance} tFIL`}
            </Button>
          )}
        </Title>
        <Title className={classes.titleOverlay} role="presentation">
          HUB {hub?.slice(0, 4)}..
        </Title>

        <div className={classes.contact}>
          <ContactIconsList data={dataInfo} />
        </div>
      </div>
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        <Grid.Col span={6}>
          <Paper withBorder radius="md" className={cl2.card}>
            <ThemeIcon
              size="xl"
              radius="md"
              variant="gradient"
              gradient={{ deg: 0, from: "pink", to: "orange" }}
            >
              <IconRun size={28} stroke={1.5} />
            </ThemeIcon>
            <Text
              size="xl"
              weight={500}
              mt="md"
              onClick={() => {
                setForQ(!forQ);
              }}
              className={cl2.for}
            >
              For Qouriers
            </Text>
            {forQ && (
              <Text size="sm" mt="sm" color="dimmed">
                <Prism language="tsx">{forQouriers}</Prism>
              </Text>
            )}
          </Paper>
        </Grid.Col>
        <Grid.Col span={6}>
          <Paper withBorder radius="md" className={cl2.card}>
            <ThemeIcon
              size="xl"
              radius="md"
              variant="gradient"
              gradient={{ deg: 0, from: "pink", to: "orange" }}
            >
              <IconCode size={28} stroke={1.5} />
            </ThemeIcon>
            <Text
              size="xl"
              weight={500}
              mt="md"
              onClick={() => {
                setForD(!forD);
              }}
              className={cl2.for}
            >
              For Developers
            </Text>
            {forD && (
              <Text size="sm" mt="sm" color="dimmed">
                <Prism language="jsx">{forDevelopers}</Prism>
              </Text>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
      <Divider
        my="xl"
        label="Tasks"
        labelPosition="left"
        size="xl"
        color="cyan.8"
      />
      {notTasks ? (
        <Stack>
          <Center>
            <Loader color="cyan" size="lg" variant="bars" />
          </Center>
          <Center>Waiting for tasks.</Center>
        </Stack>
      ) : (
        <Timeline bulletSize={24} lineWidth={5} color="cyan">
          {data &&
            data.pages &&
            data.pages.map((page) =>
              page.map((item, i) => {
                if (!item) return;
                let [
                  module,
                  params,
                  result,
                  callback,
                  qourier,
                  tasks,
                  createdAt,
                  completedAt,
                ]: any = item;
                const left =
                  tasks && tasks.gt(ethers.BigNumber.from("1"))
                    ? ` (paid ${tasks.toString()} tasks)`
                    : "";
                const complete =
                  qourier === ethers.constants.AddressZero ? 2 : 3;
                const createTime = createdAt
                  ? moment(
                      new Date(
                        parseInt(
                          createdAt
                            .mul(ethers.BigNumber.from("1000"))
                            .toString()
                        )
                      )
                    ).fromNow()
                  : "---";
                const completeTime =
                  completedAt && completedAt.gt(ethers.BigNumber.from("0"))
                    ? moment(
                        new Date(
                          parseInt(
                            completedAt
                              .mul(ethers.BigNumber.from("1000"))
                              .toString()
                          )
                        )
                      ).from(
                        new Date(
                          parseInt(
                            createdAt
                              .mul(ethers.BigNumber.from("1000"))
                              .toString()
                          )
                        )
                      )
                    : "---";
                module = ethers.utils.parseBytes32String(module);
                params = params.map(ethers.utils.toUtf8String).filter(Boolean);
                result = ethers.utils.toUtf8String(result);

                return (
                  <Timeline.Item
                    key={i}
                    active={true}
                    title={
                      <Divider
                        my="xs"
                        size="xl"
                        variant={complete === 2 ? "dashed" : "solid"}
                        color={complete === 2 ? "gray.8" : "teal"}
                        labelPosition="center"
                        label={
                          <>
                            <IconPhoneCall size={12} />
                            <Box ml={5}>{callback}</Box>
                          </>
                        }
                      />
                    }
                    bullet={
                      complete === 2 ? (
                        <IconCircleDotted size={12} />
                      ) : (
                        <IconCircleCheck size={12} />
                      )
                    }
                    lineVariant={complete === 2 ? "dashed" : "solid"}
                    color={complete === 2 ? "gray" : "cyan"}
                    lineActive={true}
                  >
                    <Table
                      sx={{ minWidth: 800 }}
                      verticalSpacing="sm"
                      withColumnBorders
                    >
                      <tbody>
                        <tr>
                          <td>Params</td>
                          <td style={{ width: "85%" }}>
                            <Code color="green">{params.join(" | ")}</Code>
                          </td>
                        </tr>
                        <tr>
                          <td>Result</td>
                          <td>
                            {result ? (
                              <Code color="blue">{result}</Code>
                            ) : (
                              "..."
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Qourier</td>
                          <td>
                            {qourier !== ethers.constants.AddressZero ? (
                              <Code color="lime">{qourier}</Code>
                            ) : (
                              "..."
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Stepper classNames={cl} active={complete} breakpoint="sm">
                      <Stepper.Step
                        label={`Created${left}`}
                        description={createTime}
                      />
                      <Stepper.Step
                        label="Executed"
                        description={module}
                        loading={complete === 2}
                      />
                      <Stepper.Step
                        label="Completed"
                        description={completeTime}
                      />
                    </Stepper>
                  </Timeline.Item>
                );
              })
            )}
        </Timeline>
      )}
    </Container>
  );
}
