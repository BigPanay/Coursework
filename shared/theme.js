import { createMuiTheme } from '@material-ui/core/styles';
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#69b9f9"
      },
      secondary: { main: red[700] }
    },
    props: {
      MuiButtonBase: {
        disableRipple: true
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 720,
        md: 1000,
        lg: 1280,
        xl: 4000
      }
    }
  });

  export default theme;