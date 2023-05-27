import { extendTheme } from "@chakra-ui/react";

const customedTheme = extendTheme({
  colors: {},
  fonts: {},
  fontSizes: {},
  breakpoints: {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  },
  backgroundColor:'purple.50'
});

const theme = extendTheme({ customedTheme });

export default theme;
