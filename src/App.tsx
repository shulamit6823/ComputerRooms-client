import { Outlet } from 'react-router'
import { Box, Typography } from '@mui/material'
import Header from './components/Header'

const currentYear = new Date().getFullYear();

function App() {


  return (
    <Box sx={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
    <Header></Header>
     <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
       <Outlet></Outlet>
     </Box>
     <Typography
       component="footer"
       sx={{
         textAlign: 'center',
         py: 2,
         fontSize: 13,
         color: '#9aa5b4',
         borderTop: '1px solid #ece8f3',
         background: 'linear-gradient(to left, #faf5fe, #f3fbfd)',
       }}
     >
       © {currentYear} <bdi>FixIt</bdi> · כל הזכויות שמורות
     </Typography>
    </Box>
  )
}

export default App
