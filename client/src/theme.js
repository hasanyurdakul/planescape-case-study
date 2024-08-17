import { createTheme } from "@mui/material/styles";
// const montserrat = Montserrat({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
// });

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
});

export default theme;
