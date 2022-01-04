import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    myMessage: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'flex-end',
        position: 'relative'
    },
    otherMessage: {
        display: 'flex',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        position: 'relative'
    },
    message: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#cc486b',
        margin: theme.spacing(1),
        padding: '5px 10px',
        borderRadius: '15px 15px 0 15px',
        cursor: 'pointer',
        overflow: 'hidden',
        textAlign: 'right'
    },
    otherAuthor: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#33393f',
        margin: theme.spacing(1),
        padding: '5px 10px',
        borderRadius: '15px 15px 15px 0',
        cursor: 'pointer',
        overflow: 'hidden'
    },
    messageText: {
        wordBreak: 'break-all',
        fontSize: '14px',
        padding: '5px 10px',
        margin: 0
    },
    menu: {
        "& .MuiMenu-paper": {
            background: 'linear-gradient(to top left, #13131490 50%, #cc486b50 100%)',
            backdropFilter: 'blur(6px)',
            color: '#fefefe',
        },
        "& .MuiList-padding": {
            padding: '0'
        }
    },
    menuItem: {
        borderBottom: '2px solid #cc486b',
        padding: '5px 40px',
        "&:last-child": {
            borderBottom: 'none'
        },
        "&:hover": {
            background: '#00000080'
        }
    },
    editInfo: {
        margin: '0',
        color: '#fefefe90',
        fontSize: '12px'
    },
    messageContentOtherAuthor: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    messageContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    messageImage: {
        width: '100%',
        maxWidth: '320px',
        // height: 'auto',
        display: 'inline-flex',
        objectFit: 'contain',
        border: '2px solid #cc486b',
        borderRadius: '15px'
    }
}));

export default useStyles