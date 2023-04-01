import { ITrack } from '@/types/track'
import { Box, Grid } from '@mui/material'
import React from 'react'
import TrackItem from './TrackItem'
import { useAppSelector } from '@/hooks/redux'
interface TrackListProps {
    tracks: ITrack[]
}

const TrackList:React.FC<TrackListProps> = ({tracks}) => {
  const {active} = useAppSelector(state => state.player)
  return (
    <Grid container direction={'column'}>
        <Box>
            {tracks.map(track => <TrackItem active={active?._id === track._id} key={track._id} track={track}/>)}
        </Box>
    </Grid>
  )
}

export default TrackList