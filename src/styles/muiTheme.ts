import { createTheme } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

const theme = createTheme(
  {
    typography: {
      fontFamily: "Inter, Inter Fallback",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontFamily: "Inter, Inter Fallback",
          },
        },
      },
    },
  },
  ptBR
);

export default theme;
