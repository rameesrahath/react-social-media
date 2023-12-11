import { useCallback, useReducer, useState, useEffect } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const PostList = createContext({
  postList: [],
  fetching: false,
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currentPostList, action) => {
  let postList = currentPostList;
  if (action.type === "DELETE_POST") {
    postList = postList.filter((item) => item.id !== action.payload.id);
  } else if (action.type === "ADD_POST") {
    postList = [...postList, action.payload.post];
  } else if (action.type === "ADD_INITIAL_POST") {
    postList = action.payload.posts;
  }
  return postList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [fetching, setFetching] = useState(false);

  const addPost = useCallback(
    (post) => {
      dispatchPostList({
        type: "ADD_POST",
        payload: {
          post,
        },
      });
    },
    [dispatchPostList]
  );
  const addInitialPost = useCallback(
    (posts) => {
      dispatchPostList({
        type: "ADD_INITIAL_POST",
        payload: {
          posts,
        },
      });
    },
    [dispatchPostList]
  );
  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: { id: postId },
      });
    },
    [dispatchPostList]
  );
  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPost(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <PostList.Provider
      value={{
        postList,
        fetching,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
