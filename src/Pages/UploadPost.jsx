import { useState } from "react";
import { useHistory } from "react-router-dom";
import { addPost } from "../services/httpServices";

function UploadPost() {
  const [nameFile, setNameFile] = useState("Photo Post");
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
    if (formData.title && formData.description && formData.photos) {
      const { title, description, photos } = formData;
      const body = new FormData();
      body.append("title", title);
      body.append("description", description);
      body.append("photos", photos);
      addPost(body, () => router.push("/"));
    }
  };

  return (
    <div>
      <div></div>
      <div>
        <form className="column">
          <input
            name="title"
            placeholder="Title"
            className="input"
            onChange={(e) => handleChange(e)}
          />
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
              name="photos"
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
              Add Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadPost;
