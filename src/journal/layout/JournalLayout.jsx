import {Box} from '@mui/system';
import {NavBar} from '../components/NavBar';
import { SideBar } from '../components/SideBar';
import {Toolbar} from'@mui/material' 

const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display:'flex'}} className='animate__animated animate__fadeIn animate__faster'>

        {/* navbar */}
        <NavBar  drawerWidth ={drawerWidth }/>

        {/* sidebar drawerWidth */}
        <SideBar drawerWidth={drawerWidth}/>
        
        <Box 
            component='main'
            sx={{flexGrow:1 , p:3}}
        >
            <Toolbar/>

            {children}
        
        </Box>
    </Box>
  )
}
