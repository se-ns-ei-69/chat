import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      width: 'calc(100% - 20px)',
      border: '2px solid #cc486b',
      borderRadius: '50px',
      background: '#131314',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      color: '#fefefe',
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
      background: '#cc486b',
      width: '2px'
    },
    messageLengthCounter: {
      color: '#fefefe99',
      fontSize: '12px',
      padding: '0 10px'
    },
    editBase: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    editInfo: {
      display: 'flex',
    },
    edit: {
      color: '#cc486b',
      fontSize: '14px',
      paddingBottom: '5px'
    },
    editContent: {
      fontSize: '14px',
      paddingBottom: '5px',
    },
    imageBlock: {
      display: 'flex'
    }
  }));

  export default useStyles