import { Palette, alpha } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    border?: {
      main?: string;
      light?: string;
    };
    gray?: {
      main: string;
    };
    card?:{
      shadow: string
    }
  }
}

export const palette: Partial<Palette> = {
  border: {
    main: "#F3E9E9",
    light: "#DAE8ED",
  },
  gray: {
    main: "#727272",
  },
  text: {
    primary: "#000000",
    secondary: "#8F8F8F",
    disabled: alpha("#8F8F8F", 0.5),
  },
  primary: {
    main: "#3676D6",
    light: "#E9FAFF",
    dark: alpha("#3676D6", 0.7),
    contrastText: "",
  },
  background: {
    default: "#ffffff",
    paper: "#F9F9F9",
  },
  card:{
    shadow: "0px 4px 34px 0px rgba(0, 0, 0, 0.15)"
  }
};
