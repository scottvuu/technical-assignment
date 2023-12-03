import { Box } from "@mui/material";
import { Post } from "components/widgets/Post";
import { POST_CARD_WIDTH } from "constants/form";
import { useAppSelector } from "store";
import { postsSelector } from "store/selectors/post";

export const Posts = () => {
  const posts = useAppSelector(postsSelector);  
  return (
    <Box m={"auto"} maxWidth={POST_CARD_WIDTH}>
      {(posts || []).map((item) => {        
        return <Post post={item} key={item.id} />;
      })}
    </Box>
  );
};
