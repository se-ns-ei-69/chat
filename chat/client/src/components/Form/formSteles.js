import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    textField: {
        margin: theme.spacing(2),
    },
    authButton: {
        maxWidth: '200px',
        margin: theme.spacing(2),
        background: '#00A170'
    },
    avatarsHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    avatar: {
        padding: '15px',
        margin: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formAlert: {
        margin: '10px'
    }
}));

export default useStyles