import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../utils/hooks/http-hook";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../utils/context-API";
import { toast } from "react-toastify-modernize";
import Footer from "../../components/UIComponents/Footer/Footer";
import NavBar from "../../components/UIComponents/Navbar/Navbar";
import Button from "../../components/UIElements/Button/Button";
import "./AskQuestion.css";
import Loader from "../../components/UIElements/Loader/Loader";

const AskQuestion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [selectedImage, setSelectedImage] = useState(null);
  const { userId } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      if (userId == null) {
        toast.info("login first");
        navigate("/login");
        return;
      }
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("level", data.level);
      formData.append("subject", data.subject);
      // selectedImage && formData.append("image", selectedImage);
      console.log(formData, data, selectedImage);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/questions/${userId}`,
        "POST",
        JSON.stringify(data)
      );

      toast.success("Posted!");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => clearError(),
      });
    }
  }, [error, clearError]);

  return (
    <>
      {isLoading && <Loader />}
      <NavBar />
      <div className="bg-gradient"></div>
      <div className="AskQuestionPage">
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="formGroup">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                {...register("title", { required: true, max: 80, min: 2 })}
              />
              {errors.title && <span>Title is required.</span>}
            </div>

            <div className="formGroup">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                placeholder="Description"
                {...register("description", { required: true, max: 300 })}
              />
              {errors.description && <span>Description is required.</span>}
            </div>

            <div className="formGroup">
              <label htmlFor="level">Level</label>
              <select {...register("level")} id="level">
                <option value="Primary School">Primary School</option>
                <option value="Secondary School">Secondary School</option>
                <option value="Universiy/College">Universiy/College</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="subject">Subject</label>
              <select {...register("subject")} id="subject">
                <option value="Accounting">Accounting</option>
                <option value="IT">IT</option>
                <option value="Maths">Maths</option>
                <option value="Science">Science</option>
                <option value="Medicine">Medicine</option>
                <option value="Other">Other</option>
              </select>
            </div>

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
                <div className="selectImageContainer">
                  <img src={selectedImage} alt="Selected" />
                </div>
              )}
            </div>

            <Button color="black" wid="150">
              Submit Question
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AskQuestion;
