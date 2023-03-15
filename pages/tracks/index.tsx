import Player from '@/components/Player'
import TrackList from '@/components/TrackList'
import { useActions, useAppSelector } from '@/hooks/redux'
import MainLayout from '@/layouts/MainLayout'
import { AppDispath, wrapper } from '@/store'
import { fetchTracks, setTracks } from '@/store/slices/trackSlice'
import { ITrack } from '@/types/track'
import { Box, Button, Card, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Index = () => {
    const router = useRouter()
    const [query,setQuery] = useState<string>('')
    const [tracks,setTracks] = useState<ITrack[]>([])
    const { error, isLoading } = useAppSelector(state => state.track)
    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }
    useEffect(() =>{
       axios.get('https://musick-platform-nest-next-ts.vercel.app/tracks').then(({data}: {data: ITrack[]}) =>{
        setTracks(data)
       }).catch(e =>{
        console.log(e);
       })
    },[])
    const search = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setQuery(e.target.value)
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

export default Index


