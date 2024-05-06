import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane as faPaperPlaneTop } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const BlogEdit = () => {
  const { id } = useParams();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [viewLink, setViewLink] = useState({
    thumbnail: "",
    imageCaption: "",
    title: "",
    description: "",
    content: "",
    author: "",
    tags: "",
    dateCreated: new Date().toISOString(),
  });
  const [formData, setFormData] = useState({
    imageCaption: "",
    title: "",
    description: "",
    tags: "",
    content: "",
    dateUpdated: new Date().toISOString(),
  });
  const [invalidFields, setInvalidFields] = useState({});
  const [thumbnail, setThumbnail] = useState();

  useEffect(() => {
    const fetchViewLink = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blog/${id}`
        );
        if (response.status === 200) {
          setViewLink(response.data);
          setFormData({
            imageCaption: response.data.imageCaption,
            title: response.data.title,
            description: response.data.description,
            tags: response.data.tags,
            content: response.data.content,
            dateUpdated: new Date().toISOString(),
          });
        } else {
          console.error("Did not get data", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchViewLink();
  }, [id]);

  const handleSignOut = () => {
    // Your logout logic here
    console.log("User signed out");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update the form data and include the updated date
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      dateUpdated: Date.toISOString(), // Update dateUpdated with current timestamp
    }));
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleBack = () => {
    // Navigate back to the previous page or route
    navigate(-1); // This will navigate back one step in the history stack
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInvalidFields({});

    const isFormDataChanged =
      formData.imageCaption !== viewLink.title ||
      formData.title !== viewLink.title ||
      formData.description !== viewLink.description ||
      formData.tags !== viewLink.tags ||
      formData.content !== viewLink.content;

    const errors = {};
    if (!isFormDataChanged) {
      toast.error("No changes have been made");
      return;
    }
    if (formData.imageCaption.length === 0) {
      errors.imageCaption = "Please input your image caption";
    }
    if (formData.title.length === 0) {
      errors.title = "Please input your title";
    } else if (formData.title.length < 5) {
      errors.title = "Title must be at least 5 characters long";
    }
    if (formData.description.length === 0) {
      errors.description = "Please input your description";
    } else if (formData.description.length < 5) {
      errors.description = "Description must be at least 5 characters long";
    }
    if (formData.tags.length === 0) {
      errors.description = "Please input your description";
    }
    if (formData.content.length === 0) {
      errors.content = "Please input your content";
    } else if (formData.content.length < 20) {
      errors.content = "Content must be at least 20 characters long";
    }

    const maxSizeInBytes = 1 * 1024 * 1024; // 1MB
    if (thumbnail?.size > maxSizeInBytes) {
      errors.thumbnail = "Image size exceeds the maximum allowed size (1MB)";
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
      formObject.append(
        "blog",
        JSON.stringify({
          ...viewLink,
          imageCaption: formData.imageCaption,
          title: formData.title,
          description: formData.description,
          tags: formData.tags,
          content: formData.content,
          dateUpdated: formData.dateUpdated,
        })
      );
      formObject.append("file", thumbnail);

      const response = await axios.patch(
        `http://localhost:8080/api/blog/edit/${id}`,
        formObject,
        {
          headers,
        }
      );

      if (response && response.data) {
        toast.success("Blog updated successfully");
      } else {
        console.log("Response data not available");
        toast.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error during form update:", error.message);
    }
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
              title={<FontAwesomeIcon icon={faPaperPlaneTop} />}
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
                  className={`form-control ${
                    invalidFields.description ? "is-invalid" : ""
                  }`}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />
                {invalidFields.description && (
                  <div className="invalid-feedback">
                    {invalidFields.description}
                  </div>
                )}
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
                  className={`form-control ${
                    invalidFields.author ? "is-invalid" : ""
                  }`}
                  id="author"
                  name="author"
                  value={viewLink.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  required
                />
                {invalidFields.author && (
                  <div className="invalid-feedback">{invalidFields.author}</div>
                )}
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
                <label htmlFor="dateCreated">Date Published</label>
                <input
                  type="text"
                  className="form-control"
                  id="dateCreated"
                  name="dateCreated"
                  value={
                    viewLink.dateCreated
                      ? new Date(viewLink.dateCreated).toLocaleString()
                      : ""
                  }
                  disabled
                />
                {invalidFields.tags && (
                  <div className="invalid-feedback">{invalidFields.tags}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="dateUpdated">Date Updated</label>
                <input
                  type="text"
                  className="form-control"
                  id="dateUpdated"
                  name="dateUpdated"
                  value={new Date(formData.dateUpdated).toLocaleString()}
                  disabled
                />
                {invalidFields.tags && (
                  <div className="invalid-feedback">{invalidFields.tags}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  className={invalidFields.content ? "is-invalid" : ""}
                  placeholder="Enter content"
                />
                {invalidFields.content && (
                  <div className="invalid-feedback">
                    {invalidFields.content}
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="col-md-6">
            {/* Preview Section */}
            <div className="preview-pane">
              <div className="preview-details">
                <h3>{formData.title}</h3>
                {formData.author && (
                  <p className="author">
                    <strong>By: </strong> {formData.author}
                  </p>
                )}
                <div className="preview-thumbnail">
                {viewLink && viewLink.thumbnail && (
                  <img
                    src={viewLink.thumbnail.link}
                    alt=""
                    className="w-[200px]"
                    style={{ objectFit: "contain", width: "800px" }}
                  />
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

export default BlogEdit;
