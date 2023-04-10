import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import ControlIcons from "../../components/ControlIcons";
import Container from '@mui/material/Container';
import './video.css'
import  { useEffect, useState, useRef } from 'react';


const format = (seconds) => {
  if (isNaN(seconds)) {
    return '00:00'
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
  } else {
      return `${mm}:${ss}`
  }
};

const Dashboard = () => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [playerstate, setPlayerState] = useState({
      playing: true,
      muted: true,
      volume: 0.5,
      playerbackRate:1.0,
      played:0,
      seeking: false,
    })
  
  
    //Destructure State in other to get the values in it
    const { playing, muted, volume, playerbackRate, played, seeking } = playerstate;
    const playerRef = useRef(null);
    const playerDivRef = useRef(null);
  
    //This function handles play and pause onchange button
    const handlePlayAndPause = () => {
      setPlayerState({...playerstate, playing: !playerstate.playing})
    }
  
    const handleMuting = () => {
      setPlayerState({...playerstate, muted: !playerstate.muted})
    }
  
    const handleRewind = () => {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
    }
  
    const handleFastForward = () => {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 30)
    }
  
    const handleVolumeChange = (e, newValue) => {
      setPlayerState({...playerstate, volume:parseFloat(newValue/100), muted:newValue === 0 ? true : false, });
    }
  
    const handleVolumeSeek = (e, newValue) => {
      setPlayerState({...playerstate, volume:parseFloat(newValue/100), muted:newValue === 0 ? true : false, });
    }
  
    const handlePlayerRate = (rate) => {
      setPlayerState({...playerstate, playerbackRate: rate});
    }
  
    const handleFullScreenMode = () => {
      screenfull.toggle(playerDivRef.current)
    }
  
    const handlePlayerProgress = (state) => {
      console.log('onProgress', state);
      if (!playerstate.seeking) {
        setPlayerState({...playerstate, ...state});
      }
      console.log('afterProgress', state);
    }
  
    const handlePlayerSeek = (e, newValue) => {
      setPlayerState({...playerstate, played: parseFloat(newValue / 100)});
      playerRef.current.seekTo(parseFloat(newValue / 100));
      // console.log(played)
    }
  
    const handlePlayerMouseSeekDown = (e) => {
      setPlayerState({...playerstate, seeking: true});
    }
  
    const handlePlayerMouseSeekUp = (e, newValue) => {
      setPlayerState({...playerstate, seeking: false});
      playerRef.current.seekTo(newValue / 100);
    }
  
    const currentPlayerTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
    const movieDuration =  playerRef.current ? playerRef.current.getDuration() : '00:00';
    const playedTime = format(currentPlayerTime);
    const fullMovieTime = format(movieDuration);

    return (
        <Box m="20px">
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>
            <Container maxWidth="md">
        <div className='playerDiv' ref={playerDivRef}>
          <ReactPlayer width={'100%'} height='300%'
          ref={playerRef} 

          url="https://static.videezy.com/system/resources/previews/000/004/298/original/22.mp4"
          playing={playing}
          volume={volume} 
          playbackRate={playerbackRate}
          onProgress={handlePlayerProgress}
          muted={muted}/>

          <ControlIcons
           key={volume.toString()}
           playandpause={handlePlayAndPause}
           playing={playing}
           rewind={handleRewind}
           fastForward={handleFastForward}
           muting={handleMuting}
           muted={muted}
           volumeChange={handleVolumeChange}
           volumeSeek={handleVolumeSeek}
           volume={volume}
           playerbackRate={playerbackRate}
           playRate={handlePlayerRate}
           fullScreenMode={handleFullScreenMode}
           played={played}
           onSeek={handlePlayerSeek}  
           onSeekMouseUp={handlePlayerMouseSeekUp}
           onSeekMouseDown={handlePlayerMouseSeekDown}
           playedTime={playedTime}
           fullMovieTime={fullMovieTime}
           seeking={seeking}
          />
        </div>
      </Container>
            </Box>
            );
};

export default Dashboard;
