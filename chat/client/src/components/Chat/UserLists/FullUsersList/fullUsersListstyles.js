import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    userList: {
      margin: theme.spacing(1),
      width: '30%',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    accordion: {
      background: 'none',
      boxShadow: 'none',
      color: '#fefefe',
      marginBottom: '10px',
      border: '2px solid #cc486b',
      '& .MuiButtonBase-root': {
        "&:hover": {
          background: '#13131430',
        }
      },
    },
    AccordionDetails: {
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'none',
      background: '#131314',
    },
    mainInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: 'none',
      boxShadow: '',
      borderBottom: '1px solid #cc486b'
    },
    loader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    userNameOnline: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid green',
      borderRadius: '50%',
      height: '30px',
      width: '30px',
    }
  }));

  export default useStyles