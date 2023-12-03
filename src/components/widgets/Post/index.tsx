import {
  Avatar,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Post as PostType } from "models/post";
import { Comment as CommentType } from "models/post";
import { Comment } from "components/widgets/Comment";
import { MouseEvent, useState } from "react";
import { IconReply } from "components/atoms/icons/IconReply";
import { transformPostData } from "./utils";
import { useAppDispatch, useAppSelector } from "store";
import { addComment, removeComment, updateComment } from "store/slices/post";
import { userSelector } from "store/selectors/user";
import { CommentInput } from "components/atoms/CommentInput";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  content: Yup.string().trim().required("Content is required"),
});

type Props = {
  post: PostType;
};

export const Post = ({ post }: Props) => {
  const theme = useTheme();
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const items = transformPostData(post) || [];

  const submitHandler = ({ content }) => {
    onAddComment(content);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: submitHandler,
    validationSchema: validationSchema,
  });

  const [viewMoreComment, setViewMoreComment] =
    useState<Record<string, string>>();

  const onViewMoreComment =
    (commentId: string) => (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      setViewMoreComment((prevState) => {
        const viewMoreIndexingById = { ...prevState };
        if (viewMoreIndexingById[commentId]) {
          delete viewMoreIndexingById[commentId];
        } else {
          viewMoreIndexingById[commentId] = commentId;
        }
        return viewMoreIndexingById;
      });
    };

  const onAddComment = (value: string, item?: CommentType) => {
    const payload = {
      ...item,
      content: value,
      postId: post.id,
      parentCommentId: item?.id,
      User: user,
    };
    dispatch(addComment(payload));
  };

  const onRemoveComment = (commentId: string, postId: string) => {
    const payload = {
      commentId,
      postId,
    };
    dispatch(removeComment(payload));
  };

  const onEditComment = (content: string, commentId: string, postId: string) => {
    const payload = {
      content,
      commentId,
      postId,
    };
    dispatch(updateComment(payload));
  };

  return (
    <Box boxShadow={theme.palette.card?.shadow}>
      <Stack
        spacing={2.25}
        direction="row"
        alignItems="center"
        py={1.875}
        px={4.25}
        borderBottom={1}
        borderColor={theme.palette.border?.main}
      >
        <Avatar sizes="md">{post.User.firstName?.["0"]}</Avatar>
        <Box ml={1}>
          <Typography
            variant="body2"
            color={theme.palette.text.primary}
            fontWeight={600}
          >
            {post.User.firstName} {post.User.lastName}
          </Typography>
          <Typography
            variant="body2"
            color={theme.palette.text.secondary}
            fontWeight={500}
          >
            {/* {formatDate(new Date(post.createdAt))} */} 2d
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="column"
        pt={2.125}
        pb={2.375}
        px={4.25}
        borderBottom={1}
        borderColor={theme.palette.border?.main}
      >
        <Box>
          <Typography
            variant="body1"
            color={theme.palette.text.primary}
            fontWeight={600}
          >
            {post.title}
          </Typography>
          <Typography
            mt={1.125}
            variant="body2"
            color={theme.palette.text.primary}
            fontWeight={500}
          >
            {post.content}
          </Typography>
        </Box>
      </Stack>
      <Stack
        direction="column"
        py={2.125}
        px={4.25}
        borderBottom={1}
        borderColor={theme.palette.border?.main}
      >
        <Typography
          variant="body2"
          color={theme.palette.text.secondary}
          fontWeight={600}
          borderColor={theme.palette.border?.main}
        >
          Comment
        </Typography>
      </Stack>
      <Stack pb={4.75}>
        {items.map((item) => {
          const hasChildren = !!item.childrenComments?.length;
          const hasViewMore = viewMoreComment?.[item.id];
          return (
            <Box
              px={5}
              py={1.875}
              key={item.id}
              position="relative"
              overflow="hidden"
              zIndex={2}
            >
              <Comment
                comment={item}
                onSend={(value) => onAddComment(value, item)}
                onEdit={(content) => onEditComment(content, item.id, post.id)}
                onRemove={() => onRemoveComment(item.id, post.id)}
                sx={
                  hasChildren && hasViewMore
                    ? {
                        position: "relative",
                        "&::after": {
                          position: "absolute",
                          width: "1px",
                          height: "calc(100% + 25px)",
                          background: theme.palette.border?.light,
                          content: '""',
                          display: "block",
                          left: "14px",
                        },
                      }
                    : {}
                }
              >
                <>
                  {hasChildren && hasViewMore && (
                    <>
                      {item.childrenComments?.map((childrenItem, index) => {
                        // const hasViewMoreSubChildren =
                        //   viewMoreComment?.[childrenItem.id];
                        const hasSubChildrenItems =
                          !!childrenItem.childrenComments?.length;
                        const isLastItem =
                          item.childrenComments?.length - 1 === index;
                        return (
                          <Box>
                            <Box
                              pl={6}
                              mt={3.125}
                              key={childrenItem.id}
                              position="relative"
                              sx={{
                                "&::after": {
                                  position: "absolute",
                                  width: "1px",
                                  height: "calc(100% + 25px)",
                                  background: theme.palette.border?.light,
                                  content: isLastItem ? "unset" : '""',
                                  display: "block",
                                  left: "14px",
                                  top: "0",
                                },
                              }}
                            >
                              <Comment
                                onEdit={(content) =>
                                  onEditComment(content, childrenItem.id, post.id)
                                }
                                onRemove={() =>
                                  onRemoveComment(childrenItem.id, post.id)
                                }
                                comment={childrenItem}
                                key={childrenItem.id}
                                onSend={(value) =>
                                  onAddComment(value, childrenItem)
                                }
                                sx={{
                                  position: "relative",
                                  "&::before": {
                                    position: "absolute",
                                    width: "29px",
                                    height: "25px",
                                    content: '""',
                                    display: "block",
                                    left: "-34px",
                                    bottom: "calc(100% - calc(25px / 1.8))",
                                    border: `1px solid ${theme.palette.border?.light}`,
                                    borderTop: 0,
                                    borderRight: 0,
                                    borderBottomLeftRadius: 8,
                                  },
                                  "&::after": {
                                    position: "absolute",
                                    width: "1px",
                                    height: "calc(100% + 25px)",
                                    background: theme.palette.border?.light,
                                    content: isLastItem ? "unset" : '""',
                                    display: "block",
                                    left: "-34px",
                                  },
                                }}
                              >
                                <>
                                  {hasSubChildrenItems &&
                                    childrenItem.childrenComments?.map(
                                      (subChildrenItem) => {
                                        return (
                                          <Box
                                            pl={6}
                                            mt={3.125}
                                            key={item.id}
                                            position="relative"
                                          >
                                            <Comment
                                              onEdit={(content) =>
                                                onEditComment(
                                                  content,
                                                  subChildrenItem.id,
                                                  post.id
                                                )
                                              }
                                              onRemove={() =>
                                                onRemoveComment(
                                                  subChildrenItem.id,
                                                  post.id
                                                )
                                              }
                                              comment={subChildrenItem}
                                              key={subChildrenItem.id}
                                              onSend={(value) =>
                                                onAddComment(
                                                  value,
                                                  subChildrenItem
                                                )
                                              }
                                              sx={{
                                                position: "relative",
                                                "&::before": {
                                                  position: "absolute",
                                                  width: "29px",
                                                  height: "25px",
                                                  content: '""',
                                                  display: "block",
                                                  left: "-34px",
                                                  bottom:
                                                    "calc(100% - calc(25px / 1.8))",
                                                  border: `1px solid ${theme.palette.border?.light}`,
                                                  borderTop: 0,
                                                  borderRight: 0,
                                                  borderBottomLeftRadius: 8,
                                                },
                                                "&::after": {
                                                  position: "absolute",
                                                  width: "1px",
                                                  height: "calc(100% + 25px)",
                                                  background:
                                                    theme.palette.border?.light,
                                                  content: '""',
                                                  display: "block",
                                                  left: "-34px",
                                                  bottom: "100%",
                                                },
                                              }}
                                            />
                                          </Box>
                                        );
                                      }
                                    )}
                                </>
                              </Comment>
                            </Box>
                          </Box>
                        );
                      })}
                    </>
                  )}

                  {hasChildren && !hasViewMore && (
                    <>
                      <Stack
                        alignItems="center"
                        justifyContent="start"
                        flexDirection="row"
                        pl={6.175}
                        mt={1.25}
                        onClick={onViewMoreComment(item.id!!)}
                      >
                        <Box>
                          <IconReply />
                        </Box>
                        <Typography
                          variant="body2"
                          ml={0.875}
                          color={theme.palette.text.primary}
                          sx={{ cursor: "pointer" }}
                          fontWeight={500}
                        >
                          {item.childrenComments.length} Replies
                        </Typography>
                      </Stack>
                    </>
                  )}
                </>
              </Comment>
            </Box>
          );
        })}
      </Stack>
      {!!user?.id && (
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          py={2.125}
          px={4.25}
          borderTop={1}
          borderColor={theme.palette.border?.main}
        >
          <Avatar sx={{ width: 29, height: 29 }} style={{ zIndex: 2 }}>
            {user?.firstName?.["0"]}
          </Avatar>
          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <CommentInput
              placeholder="Let write comment"
              fullWidth
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.content && Boolean(formik.errors.content)}
            />
          </form>
        </Stack>
      )}
    </Box>
  );
};
