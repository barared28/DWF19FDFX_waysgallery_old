import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addHired } from "../services/httpServices";

function Hire() {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const router = useHistory();

  const handleChange = (e) => {
    if (e.target) {
      const key = e.target.name;
      let value = e.target.value;
      if (key === "startDate" || key === "endDate") {
        value = dateJson(value);
      }
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleButton = (e) => {
    e.preventDefault();
    if (
      formData.title &&
      formData.description &&
      formData.startDate &&
      formData.endDate &&
      formData.price
    ) {
      const { title, description, startDate, endDate, price } = formData;
      console.log(formData);
      addHired({
        title,
        description,
        startDate,
        endDate,
        price,
        orderTo: id,
      }, () => router.push("/"));
    }
  };
  const dateJson = (date) => {
    const dateNew = new Date(date);
    const jsonDate = dateNew.toJSON();
    return jsonDate;
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
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            onChange={(e) => handleChange(e)}
          ></input>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            onChange={(e) => handleChange(e)}
          ></input>
          <input
            name="price"
            type="number"
            placeholder="Price"
            className="input"
            onChange={(e) => handleChange(e)}
          />
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

export default Hire;
