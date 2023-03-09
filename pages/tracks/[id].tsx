import React, { useState } from 'react';
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useInput } from '@/hooks/useInput';
import { env } from 'process';


const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const username = useInput('')
    const text = useInput('')
    const router = useRouter()

    const addComment = async () => {
        try {
            const res = await axios.post(`${env.BACKEND_URL}/tracks/comment`, {
                username: username.value,
                text: text.value,
                trackId: track._id,
            })
            setTrack({ ...track, comments: [...track.comments, res.data] })
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <MainLayout
            title={'музична платформа - ' + track.name + '-' + track.artist}
        >
            <Grid direction={'column'}>
                <Button
                    variant={"outlined"}
                    style={{ fontSize: 32 }}
                    onClick={() => router.push('/tracks')}
                >
                    К списку
                </Button>
                <Grid container style={{ margin: '20px 0' }}>
                    <img src={env.BACKEND_URL + track.picture} width={200} alt='картинка трека' height={200} />
                    <div style={{ marginLeft: 30 }}>
                        <h1>Название трека - {track.name}</h1>
                        <h1>Исполнитель - {track.artist}</h1>
                        <h1>Прослушиваний - {track.listens}</h1>
                    </div>
                </Grid>
                <h1>Слова в треке</h1>
                <p>{track.text}</p>
                <h1>Комментарии</h1>
                <Grid container>

                    <TextField
                        {...username}
                        label="Ваше имя"
                        fullWidth

                    />
                    <TextField
                        label="Комментарий"
                        {...text}
                        fullWidth
                        multiline
                        rows={4}
                    />
                    <Button onClick={addComment} >Отправить</Button>
                </Grid>
                <div>
                    {track.comments.map(comment =>
                        <div>
                            <div>Автор - {comment.username}</div>
                            <div>Комментарий - {comment.text}</div>
                        </div>
                    )}
                </div>
            </Grid>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`${env.BACKEND_URL}/tracks/` + params?.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}