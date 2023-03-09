import { ITrack } from '@/types/track'
import { Card, Grid, IconButton } from '@mui/material';
import styles from '../styles/TrackItem.module.scss'
import React from 'react'
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useActions } from '@/hooks/redux';

interface TrackItemProps {
    track: ITrack,
    active?: Boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter()
    const { setActive, toggleTrack } = useActions()
    const play = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setActive(track)
        toggleTrack(true)
    }
    return (
        <Card onClick={() => router.push('/tracks/' + track._id)} className={styles.track}>
            <IconButton onClick={play}>
                {
                    active ? <Pause /> : <PlayArrow />
                }
            </IconButton>
            <img style={{
                borderRadius: '999px'
            }} width={70} height={70} src={'http://localhost:4444/' + track.picture} />
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