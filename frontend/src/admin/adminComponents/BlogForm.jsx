import React, { useState, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill, { Quill } from "react-quill";
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
    titleDesc: "",
    description: "",
    content: "",
    author: "Fil-Chi Job Fair Team",
    tags: "post",
    dateCreated: new Date().toLocaleDateString(),
  });
  const [thumbnail, setThumbnail] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/admin");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'titleDesc' ? value.replace(/\s+/g, '-') : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    setInvalidFields({});
    const errors = {};
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
    }

    setInvalidFields(errors);

    if (Object.keys(errors).length > 0) {
      setLoading(false);
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
          autoClose: 1500,
          pauseOnFocusLoss: false,
          onClose: () => navigate("/admin"),
        });
        formRef.current.reset();
        setLoading(false);
      } else {
        toast.error("Failed to upload");
        setLoading(false);
      }
    } catch (error) {
      console.error(
        "Error during form submission:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        `Failed to upload: ${
          error.response ? error.response.data.message : error.message
        }`
      );
      setLoading(false);
    }
  };

  const formats = [
    "header",
    "font",
    "size",
    "color",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ];

  const fontSizeArr = [
    "8px",
    "9px",
    "10px",
    "12px",
    "14px",
    "16px",
    "20px",
    "24px",
    "32px",
    "42px",
    "54px",
    "68px",
    "84px",
    "98px",
  ];

  var Size = Quill.import("attributors/style/size");
  Size.whitelist = fontSizeArr;
  Quill.register(Size, true);

  const modules = {
    toolbar: [
      [{ size: fontSizeArr }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [
        {
          color: [
            { value: "color-picker", title: "Color Picker" },
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#006699",
            "#1a1ae0",
            "#990099",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
          ],
        },
      ],

      ["clean"],
    ],
  };

  const processContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img");
    images.forEach((img) => img.classList.add("center-image"));
    return doc.body.innerHTML;
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
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <div className="d-flex align-items-center">
                  <div
                    className="spinner-grow"
                    role="status"
                    style={{
                      width: "1rem",
                      height: "1rem",
                      marginRight: "0.5rem",
                    }}
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <span>Loading...</span>
                </div>
              ) : (
                <span>Submit</span>
              )}
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
                <textarea
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
                <label htmlFor="titleDesc">Preview Link</label>
                <input
                  type="text"
                  className="form-control"
                  id="titleDesc"
                  name="titleDesc"
                  value={formData.titleDesc}
                  onChange={handleChange}
                  placeholder="Enter Preview Link"
                />
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
                  className={`form-control`}
                  id="imageCaption"
                  name="imageCaption"
                  value={formData.imageCaption}
                  onChange={handleChange}
                  placeholder="Enter image caption"
                />
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
                  formats={formats}
                  className={`form-control ${
                    invalidFields.content ? "is-invalid" : ""
                  }`}
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
                <h2 style={{ color: "#000000", whiteSpace: "pre-wrap" }}>
                  {formData.title}
                </h2>
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
                    dangerouslySetInnerHTML={{
                      __html: processContent(formData.content),
                    }}
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
