import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Footer from "../../components/UIComponents/Footer/Footer";
import NavBar from "../../components/UIComponents/Navbar/Navbar";
import Button from "../../components/UIElements/Button/Button";
import "./AskQuestion.css";

const AskQuestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    console.log(selectedImage);
  };

  return (
    <div className="AskQuestionPage">
      <NavBar />

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            {...register("Title", { required: true, max: 80, min: 2 })}
          />
          {errors.Title && <span>Title is required.</span>}

          <input
            type="text"
            placeholder="Description"
            {...register("Description", { required: true, max: 300 })}
          />
          {errors.Description && <span>Description is required.</span>}

          <select {...register("Level")}>
            <option value="Primary School">Primary School</option>
            <option value="Secondary School">Secondary School</option>
            <option value="Universiy/College">Universiy/College</option>
            <option value="other">Other</option>
          </select>

          <select {...register("Subject")}>
            <option value="Accounting">Accounting</option>
            <option value="IT">IT</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="Medicine">Medicine</option>
            <option value="Other">Other</option>
          </select>

          <div className="image-upload-container">
            <label className="image-upload-button">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSelectedImage(URL.createObjectURL(e.target.files[0]))
                }
              />
              Upload Image
            </label>
            {selectedImage && (
              <img
                className="selected-image"
                src={selectedImage}
                alt="Selected"
              />
            )}
          </div>

          <Button>Submit Question</Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AskQuestion;
