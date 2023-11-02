import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MSidebar from "../components/MSidebar";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import MCodeEditor from "../components/MCodeEditor";
import io, { Socket } from "socket.io-client";
import ACTIONS from "../utils/Actions";

export default function MEditor() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [id, setId] = React.useState<string | null>(null);
  const SocketRef = React.useRef<Socket<any> | null>(null);
  const [queryParams, setQueryParams] = useSearchParams();
  const [clients, setClients] = React.useState<
    { socketId: string; username: string }[]
  >([]);

  const { enqueueSnackbar } = useSnackbar();
  const handleLogout = () => {
    auth.logout();
    enqueueSnackbar("Logged out successfully", { variant: "success" });
    navigate("/signin");
  };

  const roomId = queryParams.get("roomId");

  React.useEffect(() => {
    const socketIo = io("https://code-collab-api.vercel.app/").connect();
    SocketRef.current = socketIo;

    socketIo.on("connect", () => {
      console.log("Connected");
    });

    socketIo.emit(ACTIONS.JOIN, { roomId, username: auth.user?.name });

    socketIo.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
      // console.log("Joined", { clients, username, socketId });
      if (username !== auth.user?.name) {
        //   enqueueSnackbar(`${username} joined the room.`);
        //  console.log(`${username} joined`);
      }
      setClients(clients);
      setId(socketId);
      socketIo.emit(ACTIONS.SYNC_CODE, {
        code: auth.code,
        socketId,
      });
    });

    socketIo.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
      //  console.log("Disconnected", { socketId });
      if (username !== auth.user?.name) {
        enqueueSnackbar(`${username} left the room.`);
      }
      setClients((prev) => {
        return prev.filter((client) => client.socketId !== socketId);
      });
    });
  }, [roomId]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Code editor
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <MSidebar clients={clients} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <MCodeEditor socketRef={SocketRef} roomId={roomId} socketId={id} />
      </Box>
    </Box>
  );
}
