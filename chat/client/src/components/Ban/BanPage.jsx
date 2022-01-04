import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import UploadImage from '../Chat/UploadImage';

// const useStyles = makeStyles({
//     root: {
//         display: 'flex',
//         height: '100vh',
//         flexDirection: 'column',
//         textAlign: 'center',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
// });

export default function BanPage() {
    // const classes = useStyles();

    return (
        <UploadImage/>
        // <Container className={classes.root} maxWidth="lg">
        //     <ErrorIcon color="secondary" style={{ fontSize: 100 }} />
        //     <Typography className={classes.text} variant="h1" component="h1">
        //         Sorry T_T
        //     </Typography>
        //     <Typography className={classes.text} variant="h2" component="h2">
        //         You are banned from Administrator
        //     </Typography>
        // </Container>
    )
}
