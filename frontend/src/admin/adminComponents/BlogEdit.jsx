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
import WithAuth from "../../auth/WithAuth";
import { VscAccount } from "react-icons/vsc";

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
          `https://filchi-blog.onrender.com/api/blog/${id}`
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

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      imageCaption: viewLink.imageCaption,
      title: viewLink.title,
      description: viewLink.description,
      tags: viewLink.tags,
      content: viewLink.content,
    }));
  }, [viewLink]);

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

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      dateUpdated: new Date().toISOString(), // Update dateUpdated with current timestamp
    }));
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content, dateUpdated: new Date().toISOString(), });
  };

  const handleBack = () => {
    
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInvalidFields({});

    const isFormDataChanged =
      formData.imageCaption !== viewLink.imageCaption ||
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
    if (formData.tags.length === 0) {
      errors.description = "Please input your tags";
    }
    if (formData.content.length === 0) {
      errors.content = "Please input your content";
    } else if (formData.content.length < 20) {
      errors.content = "Content must be at least 20 characters long";
    }

    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (thumbnail?.size > maxSizeInBytes) {
      errors.thumbnail = "Image size exceeds the maximum allowed size (5MB)";
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
        `https://filchi-blog.onrender.com/api/blog/edit/${id}`,
        formObject,
        {
          headers,
        }
      );

      if (response && response.data) {
        toast.success("Blog updated successfully", {
          autoClose: 2000,
          onClose: () => navigate("/admin"),
        });
      } else {
        console.log("Response data not available");
        toast.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error during form update:", error.message);
    }
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to control visibility of confirmation modal
  const [showBack, setBack] = useState(false); // State to control visibility of confirmation modal
  const deleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await axios.delete(
        `https://filchi-blog.onrender.com/api/blog/delete/${id}`,
        { headers }
      );
      if (response.status === 200) {
        toast.success("User deleted successfully", {
          autoClose: 2000,
          onClose: () => navigate("/admin"),
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const handleBackCon = () => {
    const isFormDataChanged =
      formData.imageCaption !== viewLink.imageCaption ||
      formData.title !== viewLink.title ||
      formData.description !== viewLink.description ||
      formData.tags !== viewLink.tags ||
      formData.content !== viewLink.content;
        
    if (!isFormDataChanged) {
      navigate(-1);
    }
    else{
      setBack(true);
    }
    
  };

  const handleDeleteCancel = () => {
    setShowConfirmationModal(false);
  };

  const handleBackCan = () => {
    setBack(false);
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
            <Button variant="primary" onClick={handleBackCon}>
              <span>Back</span>
            </Button>
          </Nav>
          <Nav>
            <Button variant="danger" onClick={handleDeleteConfirmation} style={{marginRight: "20px"}}>
              <span>Delete</span>
            </Button>
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
                  value={viewLink?.author}
                  disabled
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
                <h2 style={{ color: "#0071FD" }}>{formData.title}</h2>
                {viewLink.author && (
                  <p className="author">
                    <strong>By: </strong> {viewLink.author}
                  </p>
                )}
                <div className="preview-thumbnail">
                  {thumbnail ? (
                    <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" />
                  ) : (
                    <>
                      {viewLink && viewLink.thumbnail && (
                        <img
                          src={viewLink.thumbnail.link}
                          alt=""
                          className="w-[200px]"
                          style={{ objectFit: "contain", width: "800px" }}
                        />
                      )}
                    </>
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
      {showConfirmationModal && (
        <div className="confirmation-modal">
          <h2>Are you sure you want to delete this user?</h2>
          <div className="button-container">
            <button className="mx-2" style={{backgroundColor: "#DC3545"}} onClick={deleteUser}>
              Yes, Delete
            </button>
            <button className="mx-2" style={{backgroundColor: "#0D6EFD"}} onClick={handleDeleteCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
      {showBack && (
        <div className="confirmation-modal">
          <h2>There are still unsaved changes!</h2>
          <div className="button-container">
            <button className="mx-2" style={{backgroundColor: "#0D6EFD"}} onClick={handleSubmit}>
              Save and Go Back
            </button>
            <button className="mx-2" style={{backgroundColor: "#DC3545"}} onClick={handleBack}>
              Discard
            </button>
            <button className="mx-2" style={{backgroundColor: "#0D6EFD"}} onClick={handleBackCan}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WithAuth(BlogEdit);
