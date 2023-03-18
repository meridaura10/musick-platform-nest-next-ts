import Player from '@/components/Player'
import TrackList from '@/components/TrackList'
import { useActions, useAppSelector } from '@/hooks/redux'
import MainLayout from '@/layouts/MainLayout'
import { AppDispath, wrapper } from '@/store'
import { ITrack } from '@/types/track'
import { Box, Button, Card, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from '../../styles/Index.module.scss'
import { useDebounce } from '@/hooks/use-debounce'
import { useInput } from '@/hooks/useInput'
const Index = () => {
    const router = useRouter()
    const { fetchTracks, fetchSearchTracks } = useActions()
    const query = useInput('')
    const debounce = useDebounce(query.value, 200)
    const { error, isLoading, tracks, searchError, isSearchLoading } = useAppSelector(state => state.track)
    if (error || searchError) {
        return <MainLayout>
            <h1>{error || searchError}</h1>
        </MainLayout>
    }
    useEffect(() => {
        fetchTracks({
            limit: 5,
            offset: 0,
        })
    }, [])
    useEffect(() => {
        if (debounce.trim()) {
            fetchSearchTracks({
                limit: 10,
                offset: 0,
                query: debounce,
            })
        } else {
            fetchTracks({
                limit: 5,
                offset: 0,
            })
        }
    }, [debounce])

    useEffect(() => {
        const scrollHangler = (e: any) => {
            
            if (
              e.target.documentElement.scrollHeight -
                (e.target.documentElement.scrollTop + window.innerHeight) <
              30
            ) {
                console.log('app');
                
            }
          };
          document.addEventListener("scroll", scrollHangler);
          return () => {
            document.removeEventListener("scroll", scrollHangler);
          };
    }, []);
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
                        <Box p={3}>
                            <TextField
                                fullWidth
                                className={styles.textInput}
                                {...query}
                                placeholder='введіть назву пісні яку хочете знайти'
                            />
                        </Box>
                        {
                            isLoading && <Box className='loadingBox'>
                                loading...
                            </Box>
                        }

                        {
                            isSearchLoading ? <Box className='loadingBox'>
                                search loading...
                            </Box> : tracks.length > 0 ? <Box paddingLeft={3}>
                                {debounce.trim() && <div>
                                    за результатом пошуку: <span style={{
                                        fontSize: '17px',
                                        fontWeight: 600,
                                    }}>{debounce.trim()}</span> було знайдено такі пісні
                                </div>}
                            </Box> : debounce.trim() && <div>
                                за результатом пошуку: <span style={{
                                    fontSize: '17px',
                                    fontWeight: 600,
                                }}>{debounce.trim()}</span> не було знайдено треків
                            </div>
                        }
                        <TrackList tracks={tracks} />
                    </Card>
                </Grid>
                <Player />
            </MainLayout>
        </div>
    )
}

export default Index

