import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addProject } from "../services/httpServices";

function SumbitProject() {
  const [nameFile, setNameFile] = useState("Photo Post");
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const router = useHistory();

  const onUpload = (e) => {
    if (e.target.files[0]) {
      setNameFile(e.target.files[0].name);
    } else {
      setNameFile("Photo Post");
    }
  };

  const handleChange = (e) => {
    if (e.target) {
      const key = e.target.name;
      const value =
        e.target.type === "file" ? e.target.files[0] : e.target.value;
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleButton = (e) => {
    e.preventDefault();
    if (formData.description && formData.fileName) {
      const { description, fileName } = formData;
      const body = new FormData();
      body.append("fileName", fileName);
      addProject(id, { description }, body, () =>
        router.push("/my-transaction")
      );
    }
  };

  return (
    <div>
      <div></div>
      <div>
        <form className="column">
          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            className="input"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="files" className="cursor input w-photo-file">
            <div className="space-between align-center">
              <p>{nameFile}</p>
              <i className="fas fa-paperclip"></i>
            </div>
            <input
              type="file"
              className="none"
              id="files"
              name="fileName"
              onChange={(e) => {
                handleChange(e);
                onUpload(e);
              }}
            />
          </label>
          <div className="mt-55 item-center">
            <button
              className="btn btn-primary btn-add-product"
              onClick={(e) => handleButton(e)}
            >
              Sumbit Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SumbitProject;
