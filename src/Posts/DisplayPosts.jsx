import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import ReactJson from 'react-json-view'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
const DisplayPosts = (props) => {
    const { objData } = useParams()
    const { state } = useLocation();
    return (<>
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <Typography variant="h5" color="inherit" component="div" align="center">
                    Post details
                </Typography>
            </Toolbar>
        </AppBar>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <span style={{ display: 'flex' }}>
            <ReactJson src={state} />
        </span>
    </>)
}
export default DisplayPosts;