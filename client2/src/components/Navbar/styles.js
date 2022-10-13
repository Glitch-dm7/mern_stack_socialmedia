import { makeStyles } from '@mui/styles';
import { deepPurple } from '@mui/material/colors';

import { createTheme } from '@mui/system';

const theme = createTheme();

export default makeStyles(({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
  },
  heading: {
    color: 'rgb(255,0,0)',
    textDecoration: 'none',
   fontWeight: 'bold',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    // color: theme.palette(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));