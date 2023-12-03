import { Typography } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles/createTypography" {
  interface Typography {
    body1?: TypographyStyle;
    body2: TypographyStyle;
  }
}

export const typography: Partial<Typography> = {
  body1: {
    fontSize: "1rem",
    lineHeight: "normal",
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: "normal",
  },
};
