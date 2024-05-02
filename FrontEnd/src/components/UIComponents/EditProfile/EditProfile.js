import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../UIElements/Button/Button";
import "./EditProfile.css";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      mobileNumber: "1234567890",
      oldPassword: "",
      newPassword: "",
    },
  });

  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    // Include the profileImage state in the submitted data
    data.profileImage = profileImage;
    console.log(data);
  };

  return (
    <div className="editProfilePage">
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
              {profileImage ? (
                <img
                  src={profileImage}
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

        <div className="formGroup">
          <label htmlFor="oldPassword">Old password</label>
          <div className="passwordInput">
            <input
              type="password"
              id="oldPassword"
              placeholder="********"
              {...register("oldPassword", {
                required: true,
                maxLength: 25,
                minLength: 6,
              })}
              className={errors.oldPassword ? "error" : ""}
            />
            {errors.oldPassword && (
              <p className="errorMessage">
                Password must be between 6 and 25 characters
              </p>
            )}
          </div>
        </div>

        <div className="formGroup">
          <label htmlFor="newPassword">New password</label>
          <div className="passwordInput">
            <input
              type="password"
              id="newPassword"
              placeholder="********"
              {...register("newPassword", {
                required: true,
                maxLength: 25,
                minLength: 6,
              })}
              className={errors.newPassword ? "error" : ""}
            />
            {errors.newPassword && (
              <p className="errorMessage">
                Password must be between 6 and 25 characters
              </p>
            )}
          </div>
        </div>

        <Button wid="310" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
