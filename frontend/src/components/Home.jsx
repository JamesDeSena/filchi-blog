import React, { useEffect, useRef, useState, useCallback } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Carousel, Spinner, Button, Card } from "react-bootstrap";
import image1 from "../assets/carouselimg/Job Fair 2023-157.jpg";
import image2 from "../assets/carouselimg/Job Fair 2023-331.jpg";
import image3 from "../assets/carouselimg/Job Fair 2023-504.jpg";
import image4 from "../assets/carouselimg/Job Fair 2023-1218.jpg";
import image5 from "../assets/carouselimg/Job Fair 2023-1291.jpg";

const Home = () => {
  const closeRegButtonRef = useRef(null);
  const regButtonRef = useRef(null);
  const originalCloseRegButtonDisplayRef = useRef("");
  const originalRegButtonDisplayRef = useRef("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const hideButton = (event) => {
      event.preventDefault(); // Prevent the default anchor tag behavior

      if (closeRegButtonRef.current && regButtonRef.current) {
        originalCloseRegButtonDisplayRef.current =
          closeRegButtonRef.current.style.display;
        originalRegButtonDisplayRef.current =
          regButtonRef.current.style.display;
        closeRegButtonRef.current.style.display = "none";
        regButtonRef.current.style.display = "none";
        setTimeout(() => {
          if (closeRegButtonRef.current && regButtonRef.current) {
            closeRegButtonRef.current.style.display =
              originalCloseRegButtonDisplayRef.current;
            regButtonRef.current.style.display =
              originalRegButtonDisplayRef.current;
          }
        }, 30000);
      }
    };

    if (closeRegButtonRef.current) {
      closeRegButtonRef.current.addEventListener("click", hideButton);
    }

    return () => {
      if (closeRegButtonRef.current) {
        closeRegButtonRef.current.removeEventListener("click", hideButton);
      }
    };
  }, []);

  const [blogData, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10); // State to keep track of visible documents
  const [loadingMore, setLoadingMore] = useState(false); // Separate state for loading more
  const loaderRef = useRef(null); // Ref for the loader element

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await axios.get(
          "https://filchi-blog-1.onrender.com/api/blog/"
        );

        if (response.status === 200) {
          // Sort the data by dateCreated in descending order
          const sortedData = response.data.sort(
            (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
          );
          setBlog(sortedData);
        } else {
          console.error("Did not get data", response.status);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, []);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const images = [
    "https://i.imgur.com/LXJFjWM.jpg",
    image1,
    image2,
    image3,
    image4,
    image5,
  ];

  const imageHeight = screenWidth <= 768 ? "20em" : "32em";
  const imageContainer = screenWidth <= 768 ? "40em" : "";

  const fontZ = screenWidth <= 768 ? "18px" : "24px";

  // Intersection Observer for lazy loading
  const loadMore = useCallback(() => {
    if (!loadingMore && visibleCount < blogData.length) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 10);
        setLoadingMore(false);
      }, 1000);
    }
  }, [loadingMore, visibleCount, blogData.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMore]);

  return (
    <>
      <div className="about wow fadeIn" data-wow-delay="0.1s">
        <div className="image-container1" style={{ width: imageContainer }}>
          <Carousel activeIndex={index} onSelect={handleSelect} interval={3000}>
            {images.map((src, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="carImg"
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: imageHeight,
                    objectFit: "contain",
                    padding: "0 5%",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        <div
          className="about-content flex-item"
          style={{ color: "#666565" }}
          data-wow-delay="0.5s"
        >
          <h6 style={{ fontSize: screenWidth <= 768 ? "32px" : "40px" }}>
            Welcome to Fil-Chi Job Fair Blog!
          </h6>
          <p className="pa3 py-3">
            "Connecting Opportunities: Uniting Filipino-Chinese Communities in a
            Job Fair Extravaganza"
          </p>
          <p className="pa4 py-3">
            Explore our comprehensive blog/article page dedicated to the
            Filipino-Chinese Job Fair, where synergy between two vibrant
            cultures fosters career avenues. Delve into insightful event
            coverage as we showcase how this job fair acts as a bridge, linking
            talented individuals with flourishing opportunities while
            celebrating the fusion of Filipino and Chinese heritage.
          </p>
          <p className="pa4 py-3">
            Discover a world of possibilities where diversity, culture, and
            career growth intertwine seamlessly.
          </p>
        </div>
      </div>
      <section
        id="featured-articles"
        className="featured-articles no-underline"
        style={{ backgroundColor: "#E3F4FF" }}
      >
        <div className="container flow">
          <h3
            className="section-title text-center py-4"
            style={{ fontWeight: "700" }}
          >
            Featured Articles
          </h3>
          <p className="text-center">
            Explore our series of insightful articles that delve into various
            aspects of the Fil-Chi Job Fair, offering a comprehensive
            perspective on this remarkable event.
          </p>

          {loading ? (
            <div className="flex justify-center items-center h-screen mt-5">
              <div className="text-center">
                <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            </div>
          ) : blogData.length === 0 ? (
            <div className="row">
              <div className="col text-center no-links-message">
                <p>No links found</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {blogData
                .slice(0, visibleCount)
                .filter((link) => link.tier === "Gold")
                .map((link) => (
                  <section key={link._id} style={{ marginBottom: "-150px" }}>
                    <div className="bg-white p-5 flex">
                      <article className="snippet">
                        <img
                          src={link.thumbnail.link}
                          alt={link.imageCaption}
                          className="snippet__image"
                        />
                        <div>
                          <h4
                            className="snippet__title"
                            style={{
                              color: "#0071FD",
                              fontWeight: "bold",
                              fontSize: fontZ,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            <Link
                              to={`/blog/${link._id}/${
                                link.titleDesc && link.titleDesc !== ""
                                  ? link.titleDesc
                                  : link.title
                              }`}
                            >
                              {link.title}
                            </Link>
                          </h4>
                          <span
                            style={{
                              color: "#666565",
                              fontSize: "16px",
                            }}
                          >
                            {new Date(link.dateCreated).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}{" "}
                          </span>
                        </div>
                        <Link
                          to={`/blog/${link._id}/${
                            link.titleDesc && link.titleDesc !== ""
                              ? link.titleDesc
                              : link.title
                          }`}
                          className="btn btn--primary"
                        >
                          Continue Reading
                        </Link>
                        <div
                          className="snippet__body"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "wrap",
                            textAlign: "justify",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: truncateContent(link.content, 200),
                          }}
                        />
                      </article>
                    </div>
                  </section>
                ))}
              {blogData
                .slice(0, visibleCount)
                .filter((link) => link.tier === "Silver")
                .map((link) => (
                  <section key={link._id} style={{ marginBottom: "-150px" }}>
                    <div className="bg-white p-5 flex">
                      <article className="snippet">
                        <img
                          src={link.thumbnail.link}
                          alt={link.imageCaption}
                          className="snippet__image"
                        />
                        <div>
                          <h4
                            className="snippet__title"
                            style={{
                              color: "#0071FD",
                              fontWeight: "bold",
                              fontSize: fontZ,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            <Link
                              to={`/blog/${link._id}/${
                                link.titleDesc && link.titleDesc !== ""
                                  ? link.titleDesc
                                  : link.title
                              }`}
                            >
                              {link.title}
                            </Link>
                          </h4>
                          <span
                            style={{
                              color: "#666565",
                              fontSize: "16px",
                            }}
                          >
                            {new Date(link.dateCreated).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}{" "}
                          </span>
                        </div>
                        <Link
                          to={`/blog/${link._id}/${
                            link.titleDesc && link.titleDesc !== ""
                              ? link.titleDesc
                              : link.title
                          }`}
                          className="btn btn--primary"
                        >
                          Continue Reading
                        </Link>
                        <div
                          className="snippet__body"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "wrap",
                            textAlign: "justify",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: truncateContent(link.content, 200),
                          }}
                        />
                      </article>
                    </div>
                  </section>
                ))}
              {blogData
                .slice(0, visibleCount)
                .filter((link) => link.tier === "Normal")
                .map((link) => (
                  <section key={link._id} style={{ marginBottom: "-150px" }}>
                    <div className="bg-white p-5 flex">
                      <article className="snippet">
                        <img
                          src={link.thumbnail.link}
                          alt={link.imageCaption}
                          className="snippet__image"
                        />
                        <div>
                          <h4
                            className="snippet__title"
                            style={{
                              color: "#0071FD",
                              fontWeight: "bold",
                              fontSize: fontZ,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            <Link
                              to={`/blog/${link._id}/${
                                link.titleDesc && link.titleDesc !== ""
                                  ? link.titleDesc
                                  : link.title
                              }`}
                            >
                              {link.title}
                            </Link>
                          </h4>
                          <span
                            style={{
                              color: "#666565",
                              fontSize: "16px",
                            }}
                          >
                            {new Date(link.dateCreated).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}{" "}
                          </span>
                        </div>
                        <Link
                          to={`/blog/${link._id}/${
                            link.titleDesc && link.titleDesc !== ""
                              ? link.titleDesc
                              : link.title
                          }`}
                          className="btn btn--primary"
                        >
                          Continue Reading
                        </Link>
                        <div
                          className="snippet__body"
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "wrap",
                            textAlign: "justify",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: truncateContent(link.content, 200),
                          }}
                        />
                      </article>
                    </div>
                  </section>
                ))}
            </div>
          )}

          <div ref={loaderRef} className="loading-container">
            {loadingMore && (
              <p
                className="col text-center"
                style={{ backgroundColor: "blue", color: "white" }}
              >
                Loading more...
              </p>
            )}
          </div>
          <a
            href="#"
            className="btn btn-lg btn-primary btn-lg-square back-to-top"
          >
            <i className="bi bi-arrow-up"></i>
          </a>
          <a
            ref={regButtonRef}
            href="https://merged.filchi-jobfair.com/products/registration"
            className="regButton"
            style={{ textDecoration: "none" }}
            target="_blank"
          >
            Register <br /> Now!
          </a>
          <a
            ref={closeRegButtonRef}
            href="#"
            id="closeReg"
            className="closeRegButton"
            style={{ textDecoration: "none" }}
          >
            x
          </a>
        </div>
      </section>
    </>
  );
};

function truncateContent(content, maxLength) {
  const truncatedContent =
    content.length > maxLength
      ? `${content.substring(0, maxLength)}...`
      : content;
  return truncatedContent.replace(/<[^>]+>/g, ""); // Remove HTML tags
}

export default Home;
