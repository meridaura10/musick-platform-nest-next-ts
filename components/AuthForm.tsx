import { useActions, useAppSelector } from '@/hooks/redux'
import { useInput } from '@/hooks/useInput'
import { Box, Button, Grid, TextField } from '@mui/material'
import React, { FC, FormEvent, useState } from 'react'
interface AuthFormProps {
    text?: string
}

const AuthForm: FC<AuthFormProps> = ({ text }) => {
    const { fetchLogin, fetchRegister } = useActions()
    const { error, isLoading } = useAppSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(true)
    const name = useInput('')
    const email = useInput('')
    const password = useInput('')
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (isRegister) {
            fetchRegister({
                email: email.value,
                password: password.value,
                name: name.value,
            })
        } else {
            fetchLogin({
                email: email.value,
                password: password.value
            })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box paddingBottom={2} fontSize={18}>
                    форма {isRegister ? 'регістрації' : 'авторизації'} на музичній платформі
                </Box>
                {text && <Box paddingBottom={2} fontSize={18}>
                    {text}
                </Box>}
                {error && <Box fontSize={17} color={'red'}>
                    {error}
                </Box>}
                {
                    isRegister && <TextField
                        label="name"
                        type="name"
                        name="name"
                        {...name}
                        fullWidth
                        required
                        margin="normal"
                    />
                }
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    {...email}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    {...password}
                    fullWidth
                    required
                    margin="normal"
                />

                <Grid container alignItems={'center'}>
                    <div>
                        <Button disabled={isLoading} type="submit" variant="contained" color="primary">
                            {isRegister ? "зарегеструватись" : 'Увійти'}
                        </Button>
                    </div>
                    <Box onClick={() => setIsRegister((prev) => !prev)} className="textRegister" paddingLeft={2}> або {!isRegister ? "зарегеструватись" : "війдіть"}</Box>
                </Grid>

            </form>
        </>
    )
}

export default AuthForm