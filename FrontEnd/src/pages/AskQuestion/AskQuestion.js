import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const subjects = [
    "collaborate",
    "Advice",
    "Programming",
    "Tech",
    "Chemistry",
    "Physics",
    "Accounting",
    "Maths",
    "Biology",
    "Medicine",
    "Engineering",
    "Art",
    "Law",
    "Social studies",
    "other",
  ];

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const edit = searchParams.get("edit");
  const title = decodeURIComponent(searchParams.get("title"));
  const QID = decodeURIComponent(searchParams.get("id"));
  const description = decodeURIComponent(searchParams.get("description"));
  const level = decodeURIComponent(searchParams.get("level"));
  const subject = decodeURIComponent(searchParams.get("subject"));
  const image = decodeURIComponent(searchParams.get("image"));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [selectedImage, setSelectedImage] = useState(null);
  const { userId } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (edit) {
      // Set the form input values using the retrieved query parameters
      setIsEdit(true);
      setValue("title", title);
      setValue("description", description);
      setValue("level", level);
      setValue("subject", subject);
      setSelectedImage(image); // Set the selectedImage state with the image URL
    }
  }, [edit, title, description, level, subject, image]);

  const onSubmit = async (data) => {
    if (!edit) {
      try {
        if (userId == null) {
          toast.info("login first");
          navigate("/login");
          return;
        }
        const formData = new FormData();
        console.log(data);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("level", data.level);
        formData.append("subject", data.subject);
        formData.append("image", selectedImage);
        console.log(formData, selectedImage, data);
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/questions/${userId}`,
          "POST",
          formData
        );
        toast.success("Posted!");
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("level", data.level);
        formData.append("subject", data.subject);
        selectedImage && formData.append("image", selectedImage);

        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/questions/${QID}`,
          "PATCH",
          JSON.stringify(data),
          { "Content-Type": "application/json" }
        );

        toast.success("Edited!");
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
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
                <option value="University/College">Universiy/College</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="subject">Subject</label>
              <select {...register("subject")} id="subject">
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="image-upload-container">
              <label className="image-upload-button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                Upload Image
              </label>
              {selectedImage && (
                <div className="selectImageContainer">
                  {selectedImage && (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                    />
                  )}{" "}
                </div>
              )}
            </div>

            <Button color="black" wid="150">
              {isEdit ? "Edit Question" : "Submit Question"}
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AskQuestion;
