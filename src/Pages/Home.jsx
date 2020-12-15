import { useState, useEffect } from "react";
import { getPosts, baseURL } from "../services/httpServices";
import { Link } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts(setPosts);
  }, []);
  return (
    <div className="grid-container">
      {posts.length > 0 && posts.map((post) => <Post post={post} />)}
    </div>
  );
}

const Post = ({ post }) => {
  return (
    <>
      {post.photo[0] && (
        <Link to={`/post/${post.id}`}>
          <img className="img-post" src={`${baseURL}${post.photo[0].image}`} />
        </Link>
      )}
    </>
  );
};

export default Home;
