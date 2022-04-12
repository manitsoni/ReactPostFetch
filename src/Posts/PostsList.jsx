import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import usePageBottom from "./useBottom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom"
import { getPosts } from './service'
import { CircularProgress } from "@mui/material";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GetPosts = () => {
    const [postList, setPostList] = useState([]);
    const [cntr, setCntr] = useState(0);
    const [maxLimit, setMaxLimit] = useState(0);
    const reachedBottom = usePageBottom();
    const [msg, setMessage] = useState('');
    const [open, setOpen] = React.useState(false);
    const [isProgress, setProgress] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        fetchPosts()
    }, [])
    useEffect(() => {
        if (reachedBottom && cntr <= maxLimit) {
            fetchPosts()
        }
        
    }, [reachedBottom])
    useEffect(() => {
        if (cntr <= maxLimit) {
            const interval = setInterval(() => {
                fetchPosts()
            }, 2000);
            return () => clearInterval(interval);
        }
        else {
            setOpen(true);
            setProgress(false);
            setMessage("You reach the limit of the page")
        }
    }, [postList]);

    const fetchPosts = async () => {
        setProgress(true)
        if (cntr <= maxLimit) {
            await (getPosts(cntr)).then(res => res.json())
                .then((result) => {
                    setCntr(cntr => cntr + 1);
                    if (cntr == 0) {
                        setMaxLimit(result.nbPages);
                        setPostList(result.hits);
                    } else {
                        const array = result.hits;
                        setPostList([...postList, ...array]);
                    }
                    setProgress(false)
                },
                    (error) => {
                        setOpen(true);
                        setMessage("Error in getting posts");
                        setProgress(false);
                    })
        }
        


    };
    const handleClose = (event, reason) => {
        setOpen(false);
    }
    const passData = (data) => {
        navigate(`/display`, { state: data })
    }
    return (< >

        <AppBar position="fixed">
            <Toolbar variant="dense">
                <Typography variant="h5" color="inherit" component="div" align="center">
                    Post lists
                </Typography>
            </Toolbar>
        </AppBar>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
        <br></br><br></br>
        <TableContainer component={Paper} style={{ overflowX: 'auto' }} >
            {isProgress ? (
                <Box style={{ left: '50%', top: '50%', position: 'fixed' }}>
                    <CircularProgress />
                </Box>
            ) : ('')
            }
            <Table style={{ minWidth: 650 }}>
                <TableHead variant="head">
                    <TableRow selected>
                        <TableCell>Author</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Url</TableCell>
                        <TableCell>Created date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {postList.map((row) => (
                        <TableRow hover key={row.name} onClick={() => { passData(row) }}>
                            <TableCell>
                                {row.author}
                            </TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell style={{ width: '100px' }}>{row.url}</TableCell>
                            <TableCell>{row.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
};
export default GetPosts;