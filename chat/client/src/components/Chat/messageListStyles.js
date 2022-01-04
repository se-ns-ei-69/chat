import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    chatSection: {
      display: 'flex',
      flexDirection: 'column',
      width: '70%',
      background: 'linear-gradient(to bottom right, #000000 19%, #cc486b 105%)',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#fefefe',
      height: '800px',
    },
    messageHistory: {
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'flex-end',
      margin: 'auto 0',
      height: '100%',
      width: '100%',
      overflowY: 'auto',
    },
    loader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%'
    },
    chatRules: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '5px auto',
      width: '50%',
      borderRadius: '25px',
      backgroundColor: '#00000090',
      backdropFilter: 'blur(6px)',
      padding: '5px',
      textAlign: 'center',
      color: '#fefefe90',
      fontSize: '12px',
    },
    messageInputZone: {
      background: '#131314',
      width: '100%',
      paddingTop: '10px'
    }
  }));

  export default useStyles