import { makeStyles, createStyles } from "@mui/styles";

export default makeStyles(()=> createStyles({
    applicationContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    applicationFilter: {
        width: '20%',
        height: '500px'
    },
    applicationFilterPaper: {
        width: '100%',
        height: '100%'
    },
    applicationList:{
        width: '80%'
    }

}));