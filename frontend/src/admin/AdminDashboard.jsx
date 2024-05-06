import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WithAuth from "../../auth/WithAuth";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faThList } from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [viewMode, setViewMode] = useState(false);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/blog");
      setBlogPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();

    const blogInterval = setInterval(fetchBlogPosts, 5 * 60 * 1000);

    return () => clearInterval(blogInterval);
  }, []);

  const switchToListView = () => {
    setViewMode(false);
  };

  const switchToCardView = () => {
    setViewMode(true);
  };

  return (
    <div className="container text-center mt-3 p-3">
      <div className="card mb-2">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h2 className="card-title mb-4">Blog</h2>
            <Link to="/admin/newblog">
              <button className="btn btn-success">Create New Blog</button>
            </Link>
          </div>
          <div className="d-flex justify-content-end align-items-center mb-3">
            <div className="d-flex align-items-center">
              <span className="mx-2">View As:</span>
              <button
                className={`mx-1 btn btn-secondary ${viewMode ? "" : "active"}`}
                onClick={switchToListView}
                aria-label="Grid View"
              >
                <FontAwesomeIcon icon={faThLarge} />
                <span className="sr-only">Grid View</span>
              </button>
              <button
                className={`mx-1 btn btn-secondary ml-2 ${viewMode ? "active" : ""}`}
                onClick={switchToCardView}
                aria-label="List View"
              >
                <FontAwesomeIcon icon={faThList} />
                <span className="sr-only">List View</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {blogPosts.map((post, index) => (
          <div key={index} className={`col-md-${viewMode ? '12' : '3'} mb-3`}>
            {viewMode ? (
              <div className="card mx-5 mb-1">
                <div className="card-body">
                <h4 className={`card-title ${post.title.length > 15 ? 'fade-text' : ''}`} style={{ fontWeight: "bold" }}>
                  {post.title.substring(0, 15)}
                </h4>
                </div>
              </div>
            ) : (
              <Link to={`/admin/newblog`} className="link-card">
                <div className="card position-relative border-0 shadow d-flex h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                    <div className="card-body">
                      <h4 className={`card-title ${post.title.length > 15 ? 'fade-text' : ''}`} style={{ fontWeight: "bold" }}>
                        {post.title.substring(0, 15)}
                      </h4>
                    </div>
                    </div>
                    <img
                      src={post.thumbnail.link}
                      className="card-img-top img-thumbnail"
                      alt="Blog Post"
                      style={{ objectFit: "cover", width: "100%", height: "200px" }}
                    />
                    <p className="card-text" style={{ fontWeight: "bold" }}>
                      {post.dateTimeCreated}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithAuth(AdminDashboard);
