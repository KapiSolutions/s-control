import { AriaAttributes, DOMAttributes } from "react";

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    name?: string;
  }
};

declare module "@mui/material/styles" {
  interface Palette {
    text: {
      dark: string;
      darkSecondary: string;
    };
    layout: {
      dark: string;
      semiLight: string;
      light: string;
      navbar: string;
      dividerDark: string;
    };
  }
}
