import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify-modernize";
import useHttp from "../../../utils/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../UIElements/Button/Button";
import "./EditProfile.css";
import { AuthContext } from "../../../utils/context-API";
import Loader from "../../UIElements/Loader/Loader";

const EditProfile = ({ data }) => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      email: data.email,
      level: data.level,
    },
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    `${process.env.REACT_APP_ASSETS_URL}${data.profile_image}`
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (formData) => {
    const data = new FormData();

    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("level", formData.level);
    data.append("mobileNumber", formData.mobileNumber);

    if (profileImage) {
      data.append("image", profileImage);
    }

    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/me/${userId}`,
        "PATCH",
        data
      );

      if (error) {
        throw new Error(error);
      }
      navigate("/questions");
      toast.success("Profile Updated!");
    } catch (e) {
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
    <div className="editProfilePage">
      {isLoading && <Loader />}
      <h2>Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="profileImageContainer">
          <input
            type="file"
            accept="image/*"
            id="profileImagePicker"
            onChange={handleImageChange}
          />
          <label htmlFor="profileImagePicker">
            <div className="profileImageWrapper">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="profileImage"
                />
              ) : (
                <img
                  src="https://th.bing.com/th?id=OIP.JBpgUJhTt8cI2V05-Uf53AHaG1&w=260&h=240&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
                  alt="Profile"
                  className="profileImage"
                />
              )}
            </div>
            <div className="profileImagePlaceholder">
              <span>Upload Image</span>
            </div>
          </label>
        </div>

        <div className="formGroup">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: true,
              maxLength: 80,
            })}
            className={errors.firstName ? "error" : ""}
          />
          {errors.firstName && (
            <p className="errorMessage">First name is required</p>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Kebede"
            {...register("lastName", {
              required: true,
              maxLength: 100,
            })}
            className={errors.lastName ? "error" : ""}
          />
          {errors.lastName && (
            <p className="errorMessage">Last name is required</p>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="abebekebede@email.com"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <p className="errorMessage">Please enter a valid email address</p>
          )}
        </div>

        <div className="formGroup">
          <label htmlFor="level">Level</label>
          <select {...register("level")} id="level">
            <option value="Primary School">Primary School</option>
            <option value="Secondary School">Secondary School</option>
            <option value="University/College">University/College</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="formGroup">
          <label htmlFor="mobileNumber">Mobile number</label>
          <input
            type="tel"
            id="mobileNumber"
            placeholder="0943109147"
            {...register("mobileNumber", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
            className={errors.mobileNumber ? "error" : ""}
          />
          {errors.mobileNumber && (
            <p className="errorMessage">
              Mobile number must be between 6 and 12 digits
            </p>
          )}
        </div>

        <Button wid="310" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
