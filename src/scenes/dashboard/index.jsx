import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import ControlIcons from "../../components/ControlIcons";
import Container from "@mui/material/Container";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import "./video.css";
import { useEffect, useState, useRef } from "react";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  } else {
    return `${mm}:${ss}`;
  }
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const mockTransactions = [
    {
      building: "Clark Building",
      camera: "Camera region 2",
      date: "2023-03-01",
      alert_type: "Arson",
    },
    {
      building: "Campus Village Building",
      camera: "Camera region 4",
      date: "2023-02-24",
      alert_type: "Dumping",
    },
    {
      building: "Engineering Building",
      camera: "First floor south wing",
      date: "2023-02-22",
      alert_type: "Dumping",
    },
  ];
  const [playerstate, setPlayerState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playerbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  //Destructure State in other to get the values in it
  const { playing, muted, volume, playerbackRate, played, seeking } =
    playerstate;
  const playerRef = useRef(null);
  const playerDivRef = useRef(null);

  //This function handles play and pause onchange button
  const handlePlayAndPause = () => {
    setPlayerState({ ...playerstate, playing: !playerstate.playing });
  };

  const handleMuting = () => {
    setPlayerState({ ...playerstate, muted: !playerstate.muted });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 30);
  };

  const handleVolumeChange = (e, newValue) => {
    setPlayerState({
      ...playerstate,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeek = (e, newValue) => {
    setPlayerState({
      ...playerstate,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handlePlayerRate = (rate) => {
    setPlayerState({ ...playerstate, playerbackRate: rate });
  };

  const handleFullScreenMode = () => {
    screenfull.toggle(playerDivRef.current);
  };

  const handlePlayerProgress = (state) => {
    console.log("onProgress", state);
    if (!playerstate.seeking) {
      setPlayerState({ ...playerstate, ...state });
    }
    console.log("afterProgress", state);
  };

  const handlePlayerSeek = (e, newValue) => {
    setPlayerState({ ...playerstate, played: parseFloat(newValue / 100) });
    playerRef.current.seekTo(parseFloat(newValue / 100));
    // console.log(played)
  };

  const handlePlayerMouseSeekDown = (e) => {
    setPlayerState({ ...playerstate, seeking: true });
  };

  const handlePlayerMouseSeekUp = (e, newValue) => {
    setPlayerState({ ...playerstate, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const currentPlayerTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const movieDuration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  const playedTime = format(currentPlayerTime);
  const fullMovieTime = format(movieDuration);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="10px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ReactPlayer
            width={"100%"}
            height="100%"
            ref={playerRef}
            //url="https://static.videezy.com/system/resources/previews/000/004/298/original/22.mp4"
            url="https://static.videezy.com/system/resources/previews/000/004/360/original/84.mp4"
            playing={playing}
            volume={volume}
            playbackRate={playerbackRate}
            onProgress={handlePlayerProgress}
            controls
            loop
            muted={muted}
            onError={() => console.log("onError callback")}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ReactPlayer
            width={"100%"}
            height="100%"
            ref={playerRef}
            url="https://static.videezy.com/system/resources/previews/000/004/298/original/22.mp4"
            playing={playing}
            volume={volume}
            playbackRate={playerbackRate}
            onProgress={handlePlayerProgress}
            controls
            loop
            muted={muted}
            onError={() => console.log("onError callback")}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ReactPlayer
            width={"100%"}
            height="100%"
            ref={playerRef}
            url="https://static.videezy.com/system/resources/previews/000/020/764/original/P1033645.mp4"
            playing={playing}
            volume={volume}
            playbackRate={playerbackRate}
            onProgress={handlePlayerProgress}
            controls
            loop
            muted={muted}
            onError={() => console.log("onError callback")}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ReactPlayer
            width={"100%"}
            height="100%"
            ref={playerRef}
            url="https://static.videezy.com/system/resources/previews/000/005/555/original/Times_Square_Wide.mp4"
            playing={playing}
            volume={volume}
            playbackRate={playerbackRate}
            onProgress={handlePlayerProgress}
            controls
            loop
            muted={muted}
            onError={() => console.log("onError callback")}
          />
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="15px"
            p="0 30px 0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Alerts Generated
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="15px"
            p="0 30px 0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Users
              </Typography>
            </Box>
          </Box>
          <Box height="255px" m="-20px 0 0 0">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="15px"
            p="0 30px 0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Alerts by buildings
              </Typography>
            </Box>
          </Box>
          <Box height="300px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Alerts
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.building}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.building}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.camera}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.redAccent[800]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.alert_type}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
