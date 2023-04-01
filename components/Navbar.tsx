import { AppBar, CssBaseline, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '@/hooks/redux';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
const menuItems = [
    { text: 'головна', href: '/', image: <AllInboxIcon /> },
    { text: 'Список треків', href: '/tracks', image: <AudiotrackIcon /> },
    { text: 'Список альбомів', href: '/albums', image: <LibraryMusicIcon /> },
    { text: 'пошук', href: '/search', image: <SearchIcon /> },
    { text: 'профіль', href: '/user', image: <PersonIcon /> }
]

export default React.memo(function Navbar() {
    const { user } = useAppSelector(state => state.auth)
    const [open, setOpen] = React.useState(false);
    const router = useRouter()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div >
            <CssBaseline />
            <AppBar
                position="fixed"
            >
                <Toolbar>
                    <Grid container  justifyContent={'space-between'} alignItems={'center'}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            музична платформа
                        </Typography>
                        <div>
                            {user?.name}
                        </div>
                    </Grid>
                </Toolbar>

            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
            >
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <List>
                    {menuItems.map(({ text, href, image }, index) => (
                        <ListItem className={href === router.asPath ? 'activeNavbarItem' : ''} button key={href} onClick={() => router.push(href)}>
                            <ListItemIcon>
                                {image}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
})