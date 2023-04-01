import Navbar from '@/components/Navbar'
import Player from '@/components/Player'
import { Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'

interface MainLayoutProps {
    children: React.ReactNode,
    title?: string,
    description?: string,
    keywords?: string,
}

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    title,
    description,
    keywords
}) => {
    return (
        <>
            <Head>
                <title>{title || 'музична платформа'}</title>
                <meta name='description' content={'музична платформа. Тут кожен може залишити свій трек та стати знаментим.' + description
                } />
                <meta name="robots" content='index, follow' />
                <meta name="robots" content='index, follow' />
                <meta name="keywords" content={keywords || 'музика,трекі,артисти'} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0 "/>
            </Head>
            <Navbar />
            <Container style={{ margin: '90px auto', display: 'flex', justifyContent: 'center' }}>
                {children}
            </Container>
            <Player />
        </>
    )
}

export default MainLayout