import React from 'react';
import { Avatar, Box, Button, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useAppSelector } from '@/hooks/redux';
import MainLayout from '@/layouts/MainLayout';
import AuthForm from '@/components/AuthForm';
import TrackItem from '@/components/TrackItem';
import TrackList from '@/components/TrackList';
import { useRouter } from 'next/router';

const Index = () => {
    const router = useRouter()
    const { user } = useAppSelector(state => state.auth)
    if (!user) {
        return <MainLayout>
            <AuthForm text='спочатку авторизуйтесь' />
        </MainLayout>
    }
    const onLogout = () => {
        console.log('log');

    }
    return (
        <MainLayout>
            <div style={{
                width: "100%"
            }}>
                <Typography pb={1} variant="h4">ваша інформація</Typography>
                <Typography variant="h5">Email: {user.email}</Typography>
                <Typography variant="h5">Nickname: {user.name}</Typography>
                <Typography pt={1} variant="h4">Ваші трекі</Typography>
                <Box mt={2} mb={2}>
                    <Grid alignItems={'center'} justifyContent={'space-between'} container>
                        <Box>
                            <Button variant="contained" color="primary" onClick={() => router.push('/tracks/create')}>
                                Додати трек
                            </Button>
                        </Box>
                        <Box >
                            <Button variant="contained" color="primary" onClick={onLogout}>
                                Вийти
                            </Button>
                        </Box>
                    </Grid>
                </Box>
                <TrackList tracks={user.tracks} />
            </div>
        </MainLayout>
    );
};

export default Index;