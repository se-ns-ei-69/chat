import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    userList: {
      width: '30%',
      margin: theme.spacing(1),
    },
    user: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      color: "#fefefe",
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      border: '2px solid #cc486b',
      borderRadius: '50px',
      marginBottom: '15px',
    },
    loader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    },
    nick: {
      fontWeight: '600'
    },
    infoBlock: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '15px',
      width: 'calc(100% - 60px)'
  }
  }));

  export default useStyles