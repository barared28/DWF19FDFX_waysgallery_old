import { useState } from "react";
import { useHistory } from "react-router-dom";
import { editProfile, addArt } from "../services/httpServices";

function EditProfilePage() {
  const [nameFile, setNameFile] = useState("Photo Avatar");
  const [formData, setFormData] = useState({});
  const router = useHistory();

  const onUpload = (e) => {
    if (e.target.files[0]) {
      setNameFile(e.target.files[0].name);
    } else {
      setNameFile("Photo Avatar");
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
    if (formData.fullName && formData.greeting && formData.avatar) {
      const { fullName, greeting, avatar } = formData;
      const body = new FormData();
      body.append("fullName", fullName);
      body.append("greeting", greeting);
      body.append("avatar", avatar);
      editProfile(body, () => router.push("/my-profile"));
    }
  };
  const handleUploadArt = (e) => {
    if (e.target) {
      const image = e.target.files[0];
      const body = new FormData();
      body.append("image", image);
      addArt(body);
    }
  };

  return (
    <div className="space-between">
      <div className="">
        <label htmlFor="files" className="cursor input w-photo-file">
          <div className="space-between align-center">
            <p>Upload Art Disini</p>
            <i className="fas fa-paperclip"></i>
          </div>
          <input
            type="file"
            className="none"
            id="files"
            name="image"
            onChange={(e) => handleUploadArt(e)}
          />
        </label>
      </div>
      <div>
        <form className="column">
          <input
            name="fullName"
            placeholder="Full Name"
            className="input"
            onChange={(e) => handleChange(e)}
          />
          <textarea
            name="greeting"
            placeholder="Greeting"
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
              name="avatar"
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
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
