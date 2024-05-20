import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const BlogCard = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get("https://filchi-blog.onrender.com/api/blog");
      setBlogPosts(response.data); // Update the entire blogPosts state with the fetched data
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();

    const blogInterval = setInterval(fetchBlogPosts, 5 * 60 * 1000);

    return () => clearInterval(blogInterval);
  }, []);

  const formatDate = (dateTime) => {
    return format(new Date(dateTime), "MM/dd/yyyy hh:mm a");
  };


//   const deleteUser = async () => {
//     try {
//       const response = await axios.delete(
//         `https://filchi-blog.onrender.com/api/blog/delete/${id}`
//       );
//       if (response.status === 200) {
//         console.log("User deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };
// Function to format date and time without seconds using date-fns

  return (
    <div className="h-100">
      <Link to={`/admin/viewlink/${id}`} className="link-card">
        <div className="card mb-3 position-relative border-0 shadow d-flex h-100">
          <img
            src={image}
            className="card-img-top img-thumbnail"
            alt="Blog Post"
            style={{ objectFit: "cover", width: "100%", height: "200px" }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h4 className="card-title" style={{ fontWeight: "bold" }}>
                {blogPosts.title}
              </h4>
              <p className="card-text" style={{ fontStyle: "italic" }}>
                {blogPosts.author}
              </p>
              <p className="card-text">
                {blogPosts.content ? blogPosts.content.substring(0, 80) : ""}...
              </p>
            </div>
            <p className="card-text" style={{ fontWeight: "bold" }}>
              {formatDate(blogPosts.dateTimeCreated)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
