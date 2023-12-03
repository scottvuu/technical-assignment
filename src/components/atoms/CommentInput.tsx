import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { IconReply } from "./icons/IconReply";
import { forwardRef } from "react";

type Props = TextFieldProps & {
};

export const CommentInput = forwardRef((props: Props,ref) => {
  return (
    <TextField
      placeholder="Let write comment"
      fullWidth
      InputProps={{
        sx: { borderRadius: 25, outlineWidth: 1, border: "none" },
        size: "small",
        ref,
        endAdornment: (
          <InputAdornment position="start">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
              type="submit"
            >
              <IconReply/>
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
});
