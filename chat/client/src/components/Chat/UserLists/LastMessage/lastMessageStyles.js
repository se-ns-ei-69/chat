import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    lastMessage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        color: '#fefefe90',
        wordBreak: 'break-all',
        fontSize: '12px'
    },
    lastMessageContent: {
        padding: '0',
        margin: '0'
    }
}));

export default useStyles