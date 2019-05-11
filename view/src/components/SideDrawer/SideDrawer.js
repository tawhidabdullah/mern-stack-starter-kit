import React from "react";
import "./SideDrawer.css";
import { FaBook, FaCar, FaClone, FaCogs } from "react-icons/fa";

const SideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">
            {" "}
            <FaBook
              style={{
                color: "#bbb",
                marginRight: "13px",
                fontSize: "19px",
                marginTop: "14px"
              }}
            />
            Books
          </a>
        </li>
        <li>
          <a href="/">
            {" "}
            <FaCar
              style={{
                color: "#bbb",
                marginRight: "13px",
                fontSize: "19px",
                marginTop: "14px"
              }}
            />
            Cars
          </a>
        </li>
        <li>
          <a href="/">
            {" "}
            <FaCogs
              style={{
                color: "#bbb",
                marginRight: "13px",
                fontSize: "19px",
                marginTop: "14px"
              }}
            />
            Electronics
          </a>
        </li>
        <li>
          <a href="/">
            {" "}
            <FaClone
              style={{
                color: "#bbb",
                marginRight: "13px",
                fontSize: "19px",
                marginTop: "14px"
              }}
            />
            Cloths
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
