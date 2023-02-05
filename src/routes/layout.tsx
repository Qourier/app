import { ConnectKitButton } from "connectkit";
import { Link, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";

import { Account } from "../components";

import { useState } from "react";
import {
  createStyles,
  Header,
  Group,
  ActionIcon,
  Container,
  Burger,
  Button,
  Image,
} from "@mantine/core";
import { IconRun } from "@tabler/icons-react";

import logo from "../images/logo.png";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "flex-start",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function Layout() {
  const { classes } = useStyles();

  const { isConnected } = useAccount();

  return (
    <Container size="md">
      <Header height={56} mb={20} withBorder={false}>
        <Container className={classes.inner}>
          <Group>
            <Link to={`/`}>
              <Image src={logo} height={40} fit="contain"></Image>
            </Link>
            <Link to={`/hub`}>
              <Button
                leftIcon={<IconRun size={14} />}
                variant="light"
                size="xs"
              >
                All Hubs
              </Button>
            </Link>
          </Group>
          <Group spacing={0} className={classes.social} position="right">
            <ConnectKitButton />
          </Group>
        </Container>
      </Header>
      <Outlet />
    </Container>
  );
}
