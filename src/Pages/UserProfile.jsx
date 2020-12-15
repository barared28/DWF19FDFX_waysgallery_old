import { useState, useEffect } from "react";
import { getProfileById, baseURL } from "../services/httpServices";
import { Link, useParams } from "react-router-dom";

function UserProfile() {
  const [profile, setProfile] = useState();
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id, setProfile);
  }, []);

  return (
    <>
      {profile && (
        <div>
          <div className="row">
            <div>
              <img src={`${baseURL}${profile.profile.avatar}`} />
              <h1>{profile.fullName}</h1>
              <h3>{profile.profile.greeting}</h3>
              <Link to={`/hire/${profile.id}`}>
                <button className="btn">Hire Now</button>
              </Link>
            </div>
            <div>
              {profile.post.length > 0 && profile.post[0].photo && (
                <img
                  className="img-post"
                  src={`${baseURL}${profile.post[0].photo[0].image}`}
                />
              )}
            </div>
          </div>
          <div className="mt-50">
            <h1>{profile.fullName} Work Art</h1>
            <div className="grid-container">
              {profile.art.length > 0 &&
                profile.art.map((art) => (
                  <img src={`${baseURL}${art.image}`} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
