import Player from '@/components/Player'
import TrackList from '@/components/TrackList'
import { useActions, useAppSelector } from '@/hooks/redux'
import MainLayout from '@/layouts/MainLayout'
import { AppDispath, wrapper } from '@/store'
import { fetchTracks, setTracks } from '@/store/slices/trackSlice'
import { ITrack } from '@/types/track'
import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Index = () => {
    const router = useRouter()
    const [query,setQuery] = useState<string>('')
    const { error, isLoading, tracks } = useAppSelector(state => state.track)
    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }
    const search = (e: React.ChangeEvent<HTMLInputElement>) =>{
        
    }
    return (
        <div>
            <MainLayout title='список треков - музична платформа'>
                <Grid container justifyContent={'center'}>
                    <Card style={{ width: '900px' }}>
                        <Box p={3}>
                            <Grid container justifyContent={'space-between'}>
                                <h1>track list</h1>
                                <Button onClick={() => router.push('/tracks/create')}>завантажити</Button>
                            </Grid>
                        </Box>
                        <TextField
                            fullWidth
                            value={query}
                            onChange={search}
                        />
                        <TrackList tracks={tracks} />
                    </Card>
                </Grid>
                <Player />
            </MainLayout>
        </div>
    )
}
export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
    const dispath = store.dispatch

   const data = await dispath(fetchTracks())   
   const tracks = data.payload as ITrack[]
   dispath(setTracks(tracks))
    return {
        props: {},
        
    }
});

export default Index


