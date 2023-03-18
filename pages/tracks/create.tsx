import FileUpload from '@/components/FileUpload'
import StepWrapper from '@/components/StapWrapper'
import StapWrapper from '@/components/StapWrapper'
import { storage } from '@/firebase'
import { v4 as uuidv4 } from 'uuid';
import { useInput } from '@/hooks/useInput'
import MainLayout from '@/layouts/MainLayout'
import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'
import { setAudioToFirebase, setImageToFirebase } from '@/utils/firebase.store';
const Create = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState<null | File>(null)
  const [audio, setAudio] = useState<null | File>(null)
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')
  const disabled = () => {
    if (activeStep === 0) {
      return name.value.trim() && text.value.trim() && artist.value.trim() ? false : true
    }
    if (activeStep === 1) {
      return !Boolean(picture)
    }
    if (activeStep === 2) {
      return !Boolean(audio)
    }
    return true
  }
  const disabledNext = disabled()
  const next = async () => {
    if (activeStep < 2) {
      setActiveStep(prev => prev + 1)
    } else {
      if (picture && audio) {
        const track: {
          name: string,
          text: string,
          artist: string,
          audio: null | {
            url: string,
            id: string
          },
          picture: null | {
            url: string,
            id: string
          },
        } = {
          name: name.value,
          text: text.value,
          artist: artist.value,
          audio: null,
          picture: null
        }
        try {
          track.audio = await setAudioToFirebase(audio)
          track.picture = await setImageToFirebase(picture)

          axios.post(`https://musick-platform-nest-next-ts.vercel.app/tracks`, track)
            .then(resp => router.push('/tracks'))
            .catch(e => console.log(e))
        } catch (error) {
          console.log('помилка при завантаженні пісні', error);
          alert('помилка при завантаженні пісні')
        }
      }
    }
  }
  const back = () => {
    setActiveStep(prev => prev - 1)
  }
  return (
    <MainLayout>
      <Grid container={true} direction={'column'}>
        <StepWrapper activeStep={activeStep}>
          {activeStep === 0 &&
            <Grid container={true} direction={"column"} style={{ padding: 20 }}>
              <TextField
                {...name}
                style={{ marginTop: 10 }}
                label={"Название трека"}
              />
              <TextField
                {...artist}
                style={{ marginTop: 10 }}
                label={"Имя исполнителя"}
              />
              <TextField
                {...text}
                style={{ marginTop: 10 }}
                label={"Слова к треку"}
                multiline
                rows={3}
              />
            </Grid>
          }
          {activeStep === 1 &&
            <FileUpload setFile={setPicture} accept='image/*' >
              <Button>Загрузить изображение</Button>
            </FileUpload>
          }
          {activeStep === 2 &&
            <FileUpload setFile={setAudio} accept='audio/*' >
              <Button>Загрузить аудио</Button>
            </FileUpload>
          }
        </StepWrapper>
        <Grid container justifyContent={'space-between'}>
          <Button disabled={activeStep === 0} onClick={back}>
            назад
          </Button>
          <Button disabled={disabledNext} onClick={next}>
            далі
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default Create