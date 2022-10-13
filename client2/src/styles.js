import { makeStyles } from "@mui/styles";
import { createTheme } from '@mui/system';

const theme = createTheme();

export default makeStyles(()=>({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',   
      },
      heading: {
        color: 'rgba(255,0,0, 1)',
      },
      image: {
        width: '60px',
      },
      [theme.breakpoints.down('sm')] : {
        mainContainer: {
          flexDirection: 'column-reverse',
        }
      }
}));