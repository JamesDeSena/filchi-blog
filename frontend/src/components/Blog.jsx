import React, { useEffect, useState } from "react";
import "./style.css";

import { Spinner } from "react-bootstrap";

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTag,
  faUser,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const Blog = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `https://filchi-blog-1.onrender.com/api/blog/${id}`
        );
        if (response.status === 200) {
          setBlogPost(response.data);
        } else {
          console.error("Did not get data", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogPost();
  }, [id]);

  if (!blogPost) {
    return (
      <div className="flex justify-center items-center h-screen m-5">
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  const formattedDate = format(new Date(blogPost.dateCreated), "MMMM dd, yyyy");

  const processContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = doc.querySelectorAll("img");
    images.forEach((img) => img.classList.add("center-image"));
    return doc.body.innerHTML;
  };

  const fontZ = screenWidth <= 768 ? "18px" : "24px";

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-primary mb-3"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </button>
      <div className="row justify-content-center">
        <div className="col-md-15">
          <div className="card shadow-lg">
            <div className="card-body">
              <h6
                className="card-title m-4 font-weight-bolder text-center"
                style={{
                  color: "#0071FD",
                  fontSize: fontZ,
                  whiteSpace: "pre-wrap",
                }}
              >
                {blogPost.title}
              </h6>
              <img
                src={blogPost.thumbnail.link}
                className="card-img-top mb-4 rounded"
                alt={blogPost.title}
                style={{
                  margin: "auto",
                  display: "block",
                  objectFit: "contain",
                  maxWidth: "700px",
                  border: "2px solid gray",
                  maxHeight: "450px",
                }}
              />
              <div
                className="card-text text-justify"
                style={{ margin: "8%" }}
                dangerouslySetInnerHTML={{
                  __html: processContent(blogPost.content),
                }}
              />
              <div className="card-text text-capitalize">
                <div className="row justify-content-center">
                  <div className="col-md-2 text-center">
                    {blogPost.author === "" ? (
                      <p className="mb-2">
                        <FontAwesomeIcon icon={faUser} />
                        <strong style={{ margin: "0 5px" }}></strong>
                      </p>
                    ) : (
                      <p className="mb-2">
                        <FontAwesomeIcon icon={faUser} />
                        <strong style={{ margin: "0 5px" }}>
                          By: {blogPost.author}
                        </strong>
                      </p>
                    )}
                  </div>
                  <div className="col-md-2 text-center">
                    <p className="mb-2">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <strong style={{ margin: "0 5px" }}>
                        {formattedDate}
                      </strong>
                    </p>
                  </div>
                  <div className="col-md-2 text-center">
                    <p className="mb-2">
                      <FontAwesomeIcon icon={faTag} />
                      <strong style={{ margin: "0 5px" }}>
                        {blogPost.tags}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
