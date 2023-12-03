import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Popover,
  Stack,
  StackProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Comment as CommentType } from "models/post";
import { ReactElement, useRef, useState } from "react";
import { CommentInput } from "components/atoms/CommentInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "store";
import { userSelector } from "store/selectors/user";
import { useNavigate } from "react-router";
import { IconThreeDot } from "components/atoms/icons/IconThreeDot";
import { IconEdit } from "components/atoms/icons/IconEdit";
import { IconTrash } from "components/atoms/icons/IconTrash";

type Props = StackProps & {
  comment: CommentType;
  children?: ReactElement;
  onSend: (comment: string) => void;
  onRemove: () => void;
  onEdit: (comment: string) => void;
};

const validationSchema = Yup.object({
  content: Yup.string().trim().required("Content is required"),
});

const initialValues = {
  content: "",
};
type Values = typeof initialValues;

export const Comment = ({
  comment,
  onSend,
  onRemove,
  onEdit: onEditProps,
  children,
  ...props
}: Props) => {
  const commentInputRef = useRef(null) as any;
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useAppSelector(userSelector);
  const [isHovered, setIsHovered] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const shouldBeOwnerComment = user?.id === comment.User.id;

  const submitHandler = ({ content }: Values) => {
    if(isEdit){
      onEditProps(content);
      setIsEdit(false);
    }else{
      onSend(content);
    }
    setShowInput(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: submitHandler,
    validationSchema: validationSchema,
  });

  const onEdit = () => {
    setIsEdit(true);
    formik.setFieldValue('content',comment.content);
    setShowInput(true);
    onClosePopover();
    commentInputRef?.current?.focus();
  }

  const onReplyComment = () => {
    if (user) {
      setShowInput(true);
    } else {
      navigate("/sign-in");
    }
  };

  const onClickThreeDot = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onClosePopover = () => {
    setAnchorEl(null);
  };

  return (
    <Box width="100%" position="relative">
      <Stack
        spacing={0.875}
        direction="row"
        alignItems="start"
        width="100%"
        flexWrap="nowrap"
        {...props}
      >
        <Avatar sx={{ width: 29, height: 29 }} style={{ zIndex: 2 }}>
          {comment?.User?.firstName?.["0"]}
        </Avatar>
        <Stack mt={0.25} width="100%">
          <Stack
            alignItems="center"
            flexDirection="row"
            justifyContent="flex-start"
            gap={0.5}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Box
              py={1.25}
              px={1.5}
              borderRadius={"0px 16px 16px 16px"}
              width="max-content"
              sx={{ backgroundColor: theme.palette.primary.light }}
            >
              <Typography
                variant="body2"
                color={theme.palette.text.primary}
                fontWeight={600}
              >
                {comment?.User?.firstName} {comment?.User?.lastName}
              </Typography>
              <Typography variant="body2" color={theme.palette.text.primary}>
                {comment?.content}
              </Typography>
            </Box>
            {!!shouldBeOwnerComment && isHovered && (
              <Box width="max-content">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={onClickThreeDot}
                >
                  <IconThreeDot />
                </IconButton>
                <Popover
                  id={"simple-popover"}
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={onClosePopover}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton onClick={onRemove}>
                        <ListItemIcon>
                          <IconTrash />
                          <Typography variant="body2" ml={1}>
                            Remove
                          </Typography>
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={onEdit}>
                        <ListItemIcon>
                          <IconEdit />
                          <Typography variant="body2" ml={1}>
                            Edit
                          </Typography>
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Popover>
              </Box>
            )}
          </Stack>
          {!showInput && (
            <Typography
              variant="body2"
              width="max-content"
              mt={0.875}
              ml={1.5}
              color={theme.palette.primary.main}
              sx={{ cursor: "pointer" }}
              fontWeight={500}
              onClick={onReplyComment}
            >
              Reply
            </Typography>
          )}
          {showInput && (
            <Box mx={0} my={2}>
              <form onSubmit={formik.handleSubmit}>
                <CommentInput
                  placeholder="Let write comment"
                  fullWidth
                  name="content"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.content && Boolean(formik.errors.content)
                  }
                  ref={commentInputRef}
                />
              </form>
            </Box>
          )}
        </Stack>
      </Stack>
      {children}
    </Box>
  );
};
