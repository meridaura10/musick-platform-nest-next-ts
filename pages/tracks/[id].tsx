import React, { useState } from 'react';
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useInput } from '@/hooks/useInput';
import { useAppSelector } from '@/hooks/redux';
import AuthForm from '@/components/AuthForm';


const TrackPage = ({ serverTrack }: { serverTrack: ITrack }) => {
    const {user} = useAppSelector(state => state.auth)
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const text = useInput('')
    const router = useRouter()
    if (!user) {
        return <MainLayout>
            <AuthForm text='щоб перейти на цю сторінку потрібно авторизуватись' />
        </MainLayout>
    }
    const addComment = async () => {
        try {
            const res = await axios.post(`${process.env.BACKEND_URL}tracks/comment`, {
                username: user?.name,
                text: text.value,
                trackId: track._id,
            })
            setTrack({ ...track, comments: [...track.comments, res.data] })
            text.setValue('')
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <MainLayout
            title={'музична платформа - ' + track.name + '-' + track.artist}
        >
            <Grid  direction={'column'}>
                <Button
                    variant={"outlined"}
                    style={{ fontSize: 32 }}
                    onClick={() => router.push('/tracks')}
                >
                    К списку
                </Button>
                <Grid container style={{ margin: '20px 0' }}>
                    <img src={track.picture.url} width={200} alt='картинка трека' height={200} />
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
                        <div key={comment._id}>
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
    const response = await axios.get(`${process.env.BACKEND_URL}tracks/` + params?.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}