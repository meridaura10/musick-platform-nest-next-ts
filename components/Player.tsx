import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useEffect } from "react";
import styles from '../styles/Player.module.scss'
import TrackProgress from "./TrackProgress";
import { ITrack } from "@/types/track";
import { useSelector } from "react-redux";
import { useActions, useAppSelector } from "@/hooks/redux";
import axios from "axios";
let audio: HTMLAudioElement | null = null;
const Player = () => {
    const { active, currentTime, duration, pause, volume } = useAppSelector(state => state.player)
    const { toggleTrack, setVolume, setCurrentTime, setDuraction } = useActions()
    
    
    const play = () => {
        if (pause) {
            toggleTrack(false)
            audio?.play()
        } else {
            toggleTrack(true)
            audio?.pause()
        }
    }
    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            setAudio(audio)
        }else {
            setAudio(audio)
            play()
        }
    }, [active])
    const setAudio = (audio: HTMLAudioElement) => {
        if (active) {
            audio.volume = volume / 100
            audio.src = active.audio.url;
            audio.onloadedmetadata = () => {
                setDuraction(Math.ceil(Number(audio?.duration)))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(Number(audio?.currentTime)))
            }
            audio.onended = () =>{
                axios.post('https://musick-platform-nest-next-ts.vercel.app/tracks/listen/'+ active._id)
                play()
            }
        }
    }
    useEffect(() =>{

    },[])
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audio) {
            audio.volume = Number(e.target.value) / 100
        }
        setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audio) {
            audio.currentTime = Number(e.target.value)
        }
        setCurrentTime(Number(e.target.value))
    }

    return (
       active &&  <div className={styles.player}>
       <IconButton onClick={play}>
           {pause
               ? <PlayArrow />
               : <Pause />
           }
       </IconButton>
       <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
           <div>name {active?.name}</div>
           <div style={{ fontSize: 12, color: 'gray' }}>artist {active?.artist}</div>
       </Grid>
       <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
       <VolumeUp style={{ marginLeft: 'auto' }} />
       <TrackProgress left={volume} right={100} onChange={changeVolume} />
   </div>
    );
};

export default Player;