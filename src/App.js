import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import ControlIcons from './components/ControlIcons';
import Container from '@mui/material/Container';
import { Amplify, Auth } from 'aws-amplify';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import  { useEffect, useState, useRef } from 'react';
import Topbar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import {Route,Routes} from "react-router-dom";
import Team from "./scenes/team";
import Calendar from "./scenes/calendar/calendar";
// import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";

import awsExports from './aws-exports';
Amplify.configure(awsExports);



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

function App({ signOut, user }) {

  const [theme,colorMode]=useMode();
  const [credentials, setCredentials] = useState(null);
   const [session, setSession] = useState(null);
  const [isSidebar, setIsSidebar] = useState(true);
  
  useEffect(() => {
    async function getCurrentCredentials() {
      try {
        const credentials = await Auth.currentUserInfo();
        setCredentials(credentials);
      } catch (error) {
        console.log('Error getting current credentials:', error);
      }
    }

    getCurrentCredentials();
  }, []);

  useEffect(() => {
    async function getCurrentSession() {
      try {
        const session = await Auth.currentSession();
        setSession(session);
      } catch (error) {
        console.log('Error getting current user session:', error);
      }
    }

    getCurrentSession();
  }, []);



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
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <div className='app'>
          <Sidebar isSidebar={isSidebar} />
            <main className='content'>
              <Topbar setIsSidebar={setIsSidebar}/>
              {/* <h1>Hello {user.username}</h1> */}
              <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/calendar" element={<Calendar />} /> 
              
            </Routes>
      
      {/* <div>
      {credentials ? (
        <div>
          <p>Username: {credentials.username}</p>
          <p>Email: {credentials.attributes.email}</p>
          <p>Phone Number: {credentials.attributes.admin}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
      </div> */}
        
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
      
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
    </>
  );
}

export default withAuthenticator(App);
