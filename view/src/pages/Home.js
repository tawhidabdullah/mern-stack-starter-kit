import React from "react";
import { Link } from "react-router-dom";
import bannerimg from "../images/schoolbooks-colour-1200px.png";

// import Services from "../components/Services";
// import FeaturedRooms from "../components/FeaturedRooms";
const Home = () => {
  return (
    <>
      <div className="getalife">
        <div>
          <img src={bannerimg} alt="get a life" />{" "}
        </div>
        <div className="banner-content">
          <h2>The Sharp Library</h2>
          <h6>Stay connected with us, and we will make history</h6>
          <button className="banner-button">
            <Link
              to="/rooms"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block"
              }}
            >
              See Books
            </Link>
          </button>
        </div>
      </div>

      {/* <Services />
      <FeaturedRooms /> */}
    </>
  );
};

export default Home;
