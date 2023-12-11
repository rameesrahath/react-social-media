import { MdDelete } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { useContext } from "react";
import { PostList } from "../store/PostList-store";
const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card post-card" style={{ width: "60rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
            {post.reactions}
            <span className="visually-hidden">unread messages</span>
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge tags rounded-pill ">
            {tag}
          </span>
        ))}
      </div>
      <div className="action-buttons">
        <button
          onClick={() => deletePost(post.id)}
          type="button"
          className="btn"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};
export default Post;
