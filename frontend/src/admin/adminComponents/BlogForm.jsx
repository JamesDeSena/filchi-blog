import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane as faPaperPlaneTop } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../auth/WithAuth";
import { VscAccount } from "react-icons/vsc";

const BlogForm = () => {
  const formRef = useRef(null);
  const [invalidFields, setInvalidFields] = useState({});
  const [formData, setFormData] = useState({
    imageCaption: "",
    title: "",
    description: "",
    content: "",
    author: "PDMN",
    tags: "post",
    dateCreated: new Date().toLocaleDateString(),
  });
  console.log(formData.content)
  const [thumbnail, setThumbnail] = useState();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInvalidFields({});
    const errors = {};
    if (formData.imageCaption.length === 0) {
      errors.imageCaption = "Please input your image caption";
    }
    if (formData.title.length === 0) {
      errors.title = "Please input your title";
    } else if (formData.title.length < 5) {
      errors.title = "Title must be at least 5 characters long";
    }
    if (formData.tags.length === 0) {
      errors.description = "Please input your tags";
    }
    if (formData.content.length === 0) {
      errors.content = "Please input your content";
    } else if (formData.content.length < 20) {
      errors.content = "Content must be at least 20 characters long";
    }
    if (!thumbnail) {
      errors.thumbnail = "Please upload an image";
    } else {
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

      if (thumbnail.size > maxSizeInBytes) {
        errors.thumbnail = "Image size exceeds the maximum allowed size (1MB)";
      }
    }

    setInvalidFields(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formObject = new FormData();
      formObject.append("file", thumbnail);
      formObject.append("blog", JSON.stringify(formData));
      formObject.append("dateUpdated", null);

      const response = await axios.post(
        "https://filchi-blog.onrender.com/api/blog/create",
        formObject,
        {
          headers,
        }
      );

      if (response && response.data) {
        toast.success("Uploaded successfully", {
          autoClose: 2000,
          onClose: () => navigate("/admin"),
        });
        formRef.current.reset();
      } else {
        toast.error("Failed to upload");
      }
    } catch (error) {
      console.error("Error during form submission:", error.message);
    }
  };

  const modules = {
    toolbar: [
      [{ header: 1 }, { header: 2 }],
      ["bold", "italic", "underline", "strike"],
      ["link", "image", "video"],

      [{ list: "ordered" }, { list: "bullet" }],

      ["clean"],
    ],
  };

  return (
    <>
      <ToastContainer />
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-around"
        >
          <Nav>
            <Button variant="primary" onClick={handleBack}>
              <span>Back</span>
            </Button>
          </Nav>
          <Nav>
            <Button variant="primary" onClick={handleSubmit}>
              <span>Submit</span>
            </Button>
          </Nav>
          <Nav>
            <NavDropdown
              title={<VscAccount size={24} />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={handleSignOut}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container mt-5">
        <div className="row">
          <div className="preview-pane col-md-6">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="blog-form"
              noValidate
            >
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className={`form-control ${
                    invalidFields.title ? "is-invalid" : ""
                  }`}
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  required
                />
                {invalidFields.title && (
                  <div className="invalid-feedback">{invalidFields.title}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                />
              </div>
              <div className="form-group">
                <label htmlFor="thumbnail">Thumbnail</label>
                <input
                  type="file"
                  className={`form-control ${
                    invalidFields.thumbnail ? "is-invalid" : ""
                  }`}
                  id="thumbnail"
                  name="thumbnail"
                  onChange={handleImage}
                  accept="image/*"
                  placeholder="Select thumbnail"
                  required
                />
                {invalidFields.thumbnail && (
                  <div className="invalid-feedback">
                    {invalidFields.thumbnail}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="imageCaption">Image Caption</label>
                <input
                  type="text"
                  className={`form-control ${
                    invalidFields.imageCaption ? "is-invalid" : ""
                  }`}
                  id="imageCaption"
                  name="imageCaption"
                  value={formData.imageCaption}
                  onChange={handleChange}
                  placeholder="Enter image caption"
                  required
                />
                {invalidFields.imageCaption && (
                  <div className="invalid-feedback">
                    {invalidFields.imageCaption}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="tags">Tags</label>
                <input
                  type="text"
                  className={`form-control ${
                    invalidFields.tags ? "is-invalid" : ""
                  }`}
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Enter tags"
                  required
                />
                {invalidFields.tags && (
                  <div className="invalid-feedback">{invalidFields.tags}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="dateCreated">Date Created</label>
                <input
                  type="text"
                  className="form-control"
                  id="dateCreated"
                  name="dateCreated"
                  value={formData.dateCreated}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={modules}
                  className={`form-control`}
                  placeholder="Enter content"
                />
              </div>
            </form>
          </div>
          <div className="col-md-6">
            {/* Preview Section */}
            <div className="preview-pane">
              <div className="preview-details">
                <h2 style={{ color: "#000000" }}>{formData.title}</h2>
                {formData.author && (
                  <p className="author">
                    <strong>By: </strong> {formData.author}
                  </p>
                )}
                <div className="preview-thumbnail">
                  {thumbnail && (
                    <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" />
                  )}
                </div>
                {formData.description && (
                  <p className="description">
                    <strong>Description: </strong>
                    {formData.description}
                  </p>
                )}
                {formData.content && (
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuth(BlogForm);
