import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProject, baseURL } from "../services/httpServices";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  useEffect(() => {
    getProject(id, setProject);
  }, []);
  return (
    <div>
      {project && project.file && (
        <div>
          <div>
            <img src={`${baseURL}${project.file[0].fileName}`} />
          </div>
          <div>
            <h2>{project.description}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
