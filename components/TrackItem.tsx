import { ITrack } from '@/types/track'
import { Card, Grid, IconButton } from '@mui/material';
import styles from '../styles/TrackItem.module.scss'
import React from 'react'
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useActions, useAppSelector } from '@/hooks/redux';
import { convertToTime } from '@/utils/convertToTime';
import $api from '@/http';


interface TrackItemProps {
    track: ITrack,
    active?: Boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const {user} = useAppSelector(state => state.auth)
    const { pause,currentTime,duration } = useAppSelector(state => state.player)
    const { setActive, toggleTrack,removeTrack } = useActions()
    const router = useRouter()
    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (active) {
            toggleTrack(!pause)
        } else {
            setActive(track)
            toggleTrack(false)
        }
    }
    const deleteTrack = (e: React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation()
        $api.delete(`/tracks/${track._id}`).catch((e: any) =>{
            console.log(e);           
        })
        removeTrack(track._id)
    }
    return (
        <Card onClick={() => router.push('/tracks/' + track._id)} className={styles.track}>
            <IconButton onClick={toggle}>
                {
                    active ? pause ? <PlayArrow /> : <Pause /> : <PlayArrow />
                }
            </IconButton>
            <img style={{
                borderRadius: '10px'
            }} alt='картинка трека' width={70} height={70} src={track.picture.url} />
            <Grid container style={{ width: '200px', margin: '0px 20px' }} direction={'column'} >
                <div>
                    {track.name}
                </div>
                <div className={styles.textArtist}>
                    {track.artist}
                </div>
            </Grid>
            {active && <div>{convertToTime(currentTime)} / {convertToTime(duration)}</div>}
            {user && user.id === track.creator &&  <IconButton onClick={deleteTrack} style={{ marginLeft: 'auto' }}>
                <Delete />
            </IconButton>}
        </Card>
    )
}

export default TrackItem