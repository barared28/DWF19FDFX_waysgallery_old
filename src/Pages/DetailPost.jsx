import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostById, baseURL } from "../services/httpServices";

function DetailPost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    getPostById(id, setPost);
  }, []);
  return (
    <div>
      {post && post.createdby && (
        <div>
          <div>
            <h1>{post.title}</h1>
            <h4>{post.createdby.fullName}</h4>
            <Link to={`/profile/${post.createdby.id}`}>
              <button className="btn">Hire</button>
            </Link>
          </div>
          <div>
            <img src={`${baseURL}${post.photo[0].image}`} />
          </div>
          <div>
            <p>{post.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPost;
