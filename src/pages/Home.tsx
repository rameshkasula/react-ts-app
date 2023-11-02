import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

function generateRandomString(length: number): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const [roomId, setRoomId] = React.useState("");
  const naigate = useNavigate();

  const createNewRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const id = generateRandomString(14);
    setRoomId(id);
    enqueueSnackbar(`Room ID: ${id} created. `, { variant: "success" });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!roomId || roomId.length !== 14) {
      enqueueSnackbar("Invalid Room ID. ", { variant: "error" });
      return;
    }

    naigate(`/editor?roomId=${roomId}`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Join to code room
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="roomId"
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room ID"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Join Room
          </Button>
          <Grid container>
            <Grid item>
              <Typography
                onClick={createNewRoom}
                variant={"subtitle2"}
                component={"body"}
                sx={{ cursor: "pointer" }}
              >
                {"Don't have an roomId? Create new"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
