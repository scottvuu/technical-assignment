import { Post } from "models/post";

export const transformPostData = (post: Post) => {
  const parentComments =
    post.Comments?.filter((item) => !item.parentCommentId) || [];
  const mapChildrenComments = (parentCommentId) => {
    return post.Comments?.filter(
      (comment) => comment.parentCommentId === parentCommentId
    ).map((comment) => {
      const subChildrenComments = mapChildrenComments(comment.id);
      return { ...comment, childrenComments: subChildrenComments };
    });
  };

  const commentsWithChildren = parentComments.map((comment) => {
    const childrenComments = mapChildrenComments(comment.id);
    return { ...comment, childrenComments };
  });

  return commentsWithChildren;
};
