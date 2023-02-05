import { createStyles, Container, Text, Button, Group } from "@mantine/core";
import { Link } from "react-router-dom";

const BREAKPOINT = "@media (max-width: 755px)";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    borderRadius: theme.spacing.xl,
  },

  inner: {
    position: "relative",
    paddingTop: 100,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
    textAlign: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,
    textAlign: "center",

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function HeroTitle() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Q
          </Text>
          ourier
        </h1>

        <Text className={classes.description} color="dimmed">
          Infrastructural protocol for combining data between
        </Text>
        <Text className={classes.description} color="dimmed">
          WEB2 ⇠⇢ WEB3
        </Text>

        <Link to={`/hub`}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            m={30}
          >
            Launch App
          </Button>
        </Link>

        <Button
          component="a"
          href="https://github.com/Qourier"
          size="xl"
          variant="default"
          className={classes.control}
          m={30}
          target="_blank"
        >
          GitHub
        </Button>
      </Container>
    </div>
  );
}
