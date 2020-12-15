import { API, setAuthToken } from "../config/httpAxios";

// for image and static file
export const baseURL = "http://localhost:5000/";

export const loginService = async (dispatch, body, cbFailed, cbSuccess) => {
  try {
    const response = await API.post("/login", body);
    setAuthToken(response.data.data.token);
    localStorage.setItem("token", response.data.data.token);
    const getProfile = await API.get("/user");
    console.log(getProfile);
    dispatch({
      type: "LOGIN",
      payload: { ...getProfile.data.data },
    });
    cbSuccess(false);
  } catch (error) {
    console.log(error);
    cbFailed(true);
  }
};

export const registerService = async (dispatch, body, cbFailed) => {
  try {
    const response = await API.post("/register", body);
    setAuthToken(response.data.data.token);
    localStorage.setItem("token", response.data.data.token);
    const getProfile = await API.get("/user");
    dispatch({
      type: "LOGIN",
      payload: { ...getProfile.data.data },
    });
  } catch (error) {
    console.log(error);
    cbFailed(true);
  }
};

export const loadedService = async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    setAuthToken(token);
    const getProfile = await API.get("/user");
    dispatch({
      type: "LOADED",
      payload: { ...getProfile.data.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const logoutService = (dispatch) => {
  localStorage.removeItem("token");
  setAuthToken();
  dispatch({
    type: "LOGOUT",
  });
};

export const getPosts = async (cbSuccess) => {
  try {
    const posts = await API.get("/posts");
    cbSuccess(posts.data.data.posts);
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (id, cbSuccess) => {
  try {
    const post = await API.get(`/post/${id}`);
    cbSuccess(post.data.data.post);
    console.log(post.data.data.post);
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (cbSuccess) => {
  try {
    const profile = await API.get("/user");
    cbSuccess(profile.data.data);
    // cbSuccess();
  } catch (error) {
    console.log(error);
  }
};

export const addPost = (data, cbSuccess) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  API.post("/post", data, config)
    .then((res) => {
      cbSuccess();
    })
    .catch((err) => console.log(err));
};

export const editProfile = (data, cbSuccess) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  API.patch("/user", data, config)
    .then(() => cbSuccess())
    .catch((err) => console.log(err));
};

export const addArt = (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  API.post("/upload-arts", data, config)
    .then(() => alert("berhasil menambahkan art"))
    .catch((err) => console.log(err));
};

export const getProfileById = (id, cbSuccess) => {
  API.get(`/user/${id}`)
    .then((profile) => cbSuccess(profile.data.data))
    .catch((err) => console.log(err));
};

export const addHired = (data, cbSuccess) => {
  API.post("/hired", data)
    .then(() => cbSuccess())
    .catch((err) => console.log(err));
};

export const getMyOrder = (cbSuccess) => {
  API.get("/my-order")
    .then((res) => cbSuccess(res.data.data.order))
    .catch((err) => console.log(err));
};

export const getMyOffer = (cbSuccess) => {
  API.get("/my-offer")
    .then((res) => cbSuccess(res.data.data.offer))
    .catch((err) => console.log(err));
};

export const editStatusTransaction = (id, data, cbSuccess) => {
  API.patch(`/transaction/${id}`, data)
    .then(() => cbSuccess("sukses edit status silahkan refresh"))
    .catch((err) => console.log(err));
};

export const addProject = async (id, description, body, cbSuccess) => {
  try {
    API.post(`/send-project/${id}`, description)
      .then((res) => {
        API.post(`/add-file/${res.data.data.project.id}`, body)
          .then(() => {
            cbSuccess();
            editStatusTransaction(id, { status: "Success" }, null);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const getProject = (id , cbSuccess) => {
  API.get(`/project/${id}`)
    .then((res) => cbSuccess(res.data.data.project))
    .catch((err) => console.log(err));
};
