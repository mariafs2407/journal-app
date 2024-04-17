import { MenuOutlined, LogoutOutlined, ConstructionOutlined } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar, Grid, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../store/auth/thunks'

export const NavBar = ({ drawerWidth = 240 }) => {

  const dispatch = useDispatch();

  const onLogout = () =>{
      //console.log('logout');
      dispatch(startLogout());
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        maxWidth: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar >
        <IconButton
          color='inherint'
          edge='start'
          sx={{ display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'
        >
          <Typography variant='h6' noWrap component='div'> JournalApp </Typography>
          <IconButton
            color='error'
            onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
