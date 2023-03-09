import FileUpload from '@/components/FileUpload'
import StepWrapper from '@/components/StapWrapper'
import StapWrapper from '@/components/StapWrapper'
import { useInput } from '@/hooks/useInput'
import MainLayout from '@/layouts/MainLayout'
import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Create = () => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState(null)
  const [audio, setAudio] = useState(null)
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1)
    } else {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('text', text.value)
      formData.append('artist', artist.value)
      formData.append('picture', picture || '')
      formData.append('audio', audio || '')
      axios.post('http://localhost:4444/tracks', formData)
        .then(resp => router.push('/tracks'))
        .catch(e => console.log(e))
    }
  }
  const back = () => {
    setActiveStep(prev => prev - 1)
  }
  return (
    <MainLayout>
      <Grid direction={'column'}>
        <StepWrapper activeStep={activeStep}>
          {activeStep === 0 &&
            <Grid container direction={"column"} style={{ padding: 20 }}>
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
          <Button onClick={next}>
            далі
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default Create