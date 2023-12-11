import { useContext } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/PostList-store";
import WelcomeMessage from "./WelcomeMesage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, fetching } = useContext(PostListData);

  return (
    <div className="mainPostContent">
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage></WelcomeMessage>}
      {!fetching &&
        postList.map((post) => <Post key={post.id} post={post}></Post>)}
    </div>
  );
};
export default PostList;
