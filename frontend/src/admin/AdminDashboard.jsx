import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WithAuth from "../../auth/WithAuth";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faThList } from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [viewMode, setViewMode] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

  const filteredBlogPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container text-center mt-3 p-3">
      <div className="card mb-2">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h1 className="card-title mb-4">Blog</h1>
            <Link to="/admin/newblog">
              <button className="btn btn-success">Create New Blog</button>
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="d-flex align-items-center">
              <span className="mx-2">View As:</span>
              <button
                className={`mx-1 btn btn-secondary ml-2 ${
                  viewMode ? "active" : ""
                }`}
                onClick={switchToListView}
                aria-label="Grid View"
              >
                <FontAwesomeIcon icon={faThList} />
                <span className="sr-only">List View</span>
              </button>
              <button
                className={`mx-1 btn btn-secondary ${viewMode ? "" : "active"}`}
                onClick={switchToCardView}
                aria-label="List View"
              >
                <FontAwesomeIcon icon={faThLarge} />
                <span className="sr-only">Grid View</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredBlogPosts.map((post, index) => (
          <div key={index} className={`col-md-${viewMode ? "4" : "12"} mb-3`}>
            {viewMode ? (
              <Link
                to={`/admin/editblog/${post._id}`}
                className="link-card"
                style={{ textDecoration: "none" }}
              >
                <div className="card position-relative border-0 shadow d-flex h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <div className="card-body">
                        <h4
                          className="card-title"
                          style={{
                            fontWeight: "bold",
                            fontSize: "18px",
                          }}
                        >
                          {post.title}
                        </h4>
                      </div>
                    </div>
                    <img
                      src={post.thumbnail.link}
                      className="card-img-top img-thumbnail"
                      alt="Blog Post"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "200px",
                      }}
                    />
                    <p className="card-text" style={{ fontWeight: "bold" }}>
                      {post.dateTimeCreated}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to={`/admin/editblog/${post._id}`}
                className="link-card"
                style={{ textDecoration: "none" }}
              >
                <div className="card mb-1">
                  <div className="card-body">
                    <h4
                      className={`card-title`}
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        textAlign: "start",
                      }}
                    >
                      {post.title}
                    </h4>
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
