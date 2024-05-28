import React, { useEffect, useState, useRef } from "react";
import "./style.css";

import axios from "axios";
import { useParams, Link } from "react-router-dom";
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

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `https://filchi-blog.onrender.com/api/blog/${id}`
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
    return <div className="container text-center mt-5">Loading...</div>;
  }

  const formattedDate = format(new Date(blogPost.dateCreated), "MMMM dd, yyyy");

  const processContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const images = doc.querySelectorAll('img');
    images.forEach(img => img.classList.add('center-image'));
    return doc.body.innerHTML;
  };
  

  return (
    <div className="container my-5">
      <Link
        to="#"
        className="btn btn-outline-primary mb-3"
        onClick={() => window.history.back()}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
      </Link>
      <div className="row justify-content-center">
        <div className="col-md-15">
          <div className="card shadow-lg">
            <div className="card-body">
              <h6
                className="card-title m-4 font-weight-bolder text-center"
                style={{ color: "#0071FD", fontSize: "40px" }}
              >
                {blogPost.title}
              </h6>
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
                className="card-text m-4 text-justify"
                dangerouslySetInnerHTML={{ __html: processContent(blogPost.content) }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-5 card shadow-lg p-3">
        <h3 className="mb-3">Leave a Comment</h3>
        <form onSubmit={handleSubmitComment}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your comment here"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="mt-3 btn btn-primary">Submit</button>
        </form>
      </div> */}
    </div>
  );
};

export default Blog;
