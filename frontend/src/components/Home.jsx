import React, { useEffect, useRef, useState } from "react";
import "./style.css";

import axios from "axios";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Home = () => {
  const closeRegButtonRef = useRef(null);
  const regButtonRef = useRef(null);
  const originalCloseRegButtonDisplayRef = useRef("");
  const originalRegButtonDisplayRef = useRef("");

  useEffect(() => {
    const hideButton = () => {
      originalCloseRegButtonDisplayRef.current =
        closeRegButtonRef.current.style.display;
      originalRegButtonDisplayRef.current = regButtonRef.current.style.display;
      closeRegButtonRef.current.style.display = "none";
      regButtonRef.current.style.display = "none";
      setTimeout(() => {
        closeRegButtonRef.current.style.display =
          originalCloseRegButtonDisplayRef.current;
        regButtonRef.current.style.display =
          originalRegButtonDisplayRef.current;
      }, 30000);
    };

    closeRegButtonRef.current.addEventListener("click", hideButton);

    return () => {
      closeRegButtonRef.current.removeEventListener("click", hideButton);
    };
  }, []);

  const [blogData, setBlog] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/blog/");

        if (response.status === 200) {
          setBlog(response.data.reverse());
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

  return (
    <>
      <div className="about wow fadeIn" data-wow-delay="0.1s">
        <div className="image-container1">
          <img
            src="https://i.imgur.com/LXJFjWM.jpg"
            alt=""
            style={{ padding: "0 5%" }}
          />
        </div>
        <div className="about-content flex-item" data-wow-delay="0.5s">
          <h1>Welcome to Fil-Chi Job Fair Blog!</h1>
          <p className="pa3">
            "Connecting Opportunities: Uniting Filipino-Chinese Communities in a
            Job Fair Extravaganza"
          </p>
          <p className="pa4">
            Explore our comprehensive blog/article page dedicated to the
            Filipino-Chinese Job Fair, where synergy between two vibrant
            cultures fosters career avenues. Delve into insightful event
            coverage as we showcase how this job fair acts as a bridge, linking
            talented individuals with flourishing opportunities while
            celebrating the fusion of Filipino and Chinese heritage.{" "}
          </p>
          <p className="pa4">
            Discover a world of possibilities where diversity, culture, and
            career growth intertwine seamlessly.
          </p>
        </div>
      </div>

      <section
        id="featured-articles"
        className="featured-articles no-underline textdec"
      >
        <div className="container flow">
          <h2 className="section-title text-center">Featured Articles</h2>
          <p className="text-center" style={{ marginBottom: "-100px" }}>
            Explore our series of insightful articles that delve into various
            aspects of the Fil-Chi Job Fair, offering a comprehensive
            perspective on this remarkable event.
          </p>

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="col text-center">Loading...</p>
            </div>
          ) : (
            <div>
              {blogData.length === 0 ? (
                <div className="row">
                  <div className="col text-center no-links-message">
                    <p>No links found</p>
                  </div>
                </div>
              ) : (
                <div className="row gy-4">
                  {blogData.map((link) => (
                    <section key={link._id} className="">
                      <div
                        className="bg-white p-4"
                        style={{ marginBottom: "-150px" }}
                      >
                        <div className="hero__content flow">
                          <li>
                            <article className="snippet">
                              <img
                                src={link.thumbnail.link}
                                alt="Blog Post"
                                className="snippet__image"
                              />
                              <h3 className="snippet__title">
                                <a href={`/blog/${link._id}/${link.title}`}>{link.title}</a>
                              </h3>
                              <a
                                href={`/blog/${link._id}/${link.title}`}
                                className="btn btn--primary"
                              >
                                Continue Reading
                              </a>
                              <p className="snippet__body">
                                {link.content.substring(0, 5)}...
                              </p>
                            </article>
                          </li>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              )}
            </div>
          )}

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

export default Home;
