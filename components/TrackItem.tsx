import { ITrack } from '@/types/track'
import { Card, Grid, IconButton } from '@mui/material';
import styles from '../styles/TrackItem.module.scss'
import React from 'react'
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useActions, useAppSelector } from '@/hooks/redux';


interface TrackItemProps {
    track: ITrack,
    active?: Boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const {active,pause} = useAppSelector(state => state.player)
    const { setActive, toggleTrack } = useActions()
    const router = useRouter()    
    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (active) {
            toggleTrack(!pause)       
        }else{            
            setActive(track)
            toggleTrack(false)
        }
    }
    return (
        <Card onClick={() => router.push('/tracks/' + track._id)} className={styles.track}>
            <IconButton onClick={toggle}>
                {
                     pause ? <PlayArrow /> : <Pause />
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
            {active && <div>2:42 / 03:22</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{ marginLeft: 'auto' }}>
                <Delete />
            </IconButton>
        </Card>
    )
}

export default TrackItem