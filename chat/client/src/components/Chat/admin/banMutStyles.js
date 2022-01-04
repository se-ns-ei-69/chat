import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%'
    },
    track: {
      backgroundColor: '#cc486b',
      opacity: '1',
    }
  }))

  export default useStyles