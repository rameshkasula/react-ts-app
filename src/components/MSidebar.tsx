import { Button, Drawer, Stack } from "@mui/material";
import React, { Fragment } from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Toolbar } from "@mui/material";
import MAvatar from "./MAvatar";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";
import { Socket } from "socket.io-client";

const drawerWidth = 280;

export default function MSidebar({ clients: clients }: any) {
  const { user } = useAuth();
  const reactNavigator = useNavigate();

  function leaveRoom() {
    reactNavigator("/");
  }

  return (
    <Fragment>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          marginX: 2,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {/* <List>
            {clients.map((user: any, index: any) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MAvatar user={user?.username} />
                  </ListItemIcon>
                  <ListItemText primary={user?.username} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
          {/* <Divider /> */}

          <Stack direction="column" spacing={2}>
            <MySelect />
            {/* <MyThemeSelect /> */}
            <Button
              variant="contained"
              color="error"
              className="btn leaveBtn"
              onClick={leaveRoom}
            >
              Leave
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Fragment>
  );
}

const languageOptions = [
  { value: "clike", label: "C / C++ / C#" },
  { value: "css", label: "CSS" },
  { value: "dart", label: "Dart" },
  { value: "django", label: "Django" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "go", label: "Go" },
  { value: "htmlmixed", label: "HTML-mixed" },
  { value: "javascript", label: "JavaScript" },
  { value: "jsx", label: "JSX" },
  { value: "markdown", label: "Markdown" },
  { value: "php", label: "PHP" },
  { value: "python", label: "Python" },
  { value: "r", label: "R" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "sass", label: "Sass" },
  { value: "shell", label: "Shell" },
  { value: "sql", label: "SQL" },
  { value: "swift", label: "Swift" },
  { value: "xml", label: "XML" },
  { value: "yaml", label: "YAML" },
];

function MySelect() {
  const auth = useAuth();
  const [lang, setLang] = React.useState(auth.selectedLanguage);

  const handleChange = (e: any) => {
    setLang(e.target.value);
    auth.changeLanguage(e.target.value);
    // You can perform any additional actions you need here
    // If you want to reload the page, you can use window.location.reload()
  };

  return (
    <Select value={lang} onChange={handleChange} className="seLang">
      {languageOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

const themeOptions = [
  "default",
  "3024-day",
  "3024-night",
  "abbott",
  "abcdef",
  "ambiance",
  "ayu-dark",
  "ayu-mirage",
  "base16-dark",
  "base16-light",
  "bespin",
  "blackboard",
  "cobalt",
  "colorforth",
  "darcula",
  "duotone-dark",
  "duotone-light",
  "eclipse",
  "elegant",
  "erlang-dark",
  "gruvbox-dark",
  "hopscotch",
  "icecoder",
  "idea",
  "isotope",
  "juejin",
  "lesser-dark",
  "liquibyte",
  "lucario",
  "material",
  "material-darker",
  "material-palenight",
  "material-ocean",
  "mbo",
  "mdn-like",
  "midnight",
  "monokai",
  "moxer",
  "neat",
  "neo",
  "night",
  "nord",
  "oceanic-next",
  "panda-syntax",
  "paraiso-dark",
  "paraiso-light",
  "pastel-on-dark",
  "railscasts",
  "rubyblue",
  "seti",
  "shadowfox",
  "solarized",
  "the-matrix",
  "tomorrow-night-bright",
  "tomorrow-night-eighties",
  "ttcn",
  "twilight",
  "vibrant-ink",
  "xq-dark",
  "xq-light",
  "yeti",
  "yonce",
  "zenburn",
];

function MyThemeSelect() {
  const auth = useAuth();
  const [theme, setTheme] = React.useState(auth.selectedTheme);

  const handleChange = (e: any) => {
    setTheme(e.target.value);
    auth.changeTheme(e.target.value);
    // You can perform any additional actions you need here
    // If you want to reload the page, you can use window.location.reload()
  };

  return (
    <Select value={theme} onChange={handleChange} className="seLang">
      {themeOptions.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
}
