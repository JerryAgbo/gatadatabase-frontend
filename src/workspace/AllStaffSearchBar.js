import React, { useEffect } from "react";
import "./AllStaffSearchBar.css";

const AllStaffSearchBar = () => {
  useEffect(() => {
    const handleScroll = () => {
      const searchBarBottom = document
        .querySelector(".search-bar")
        .getBoundingClientRect().bottom;
      const elements = document.querySelectorAll(".hero-section .box"); // Adjust selector as needed

      elements.forEach((el) => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop <= searchBarBottom + 10) {
          // +10 pixels before it actually touches the searchBar
          el.classList.add("fade-out");
        } else {
          el.classList.remove("fade-out");
        }
      });
    };

    // Add scroll event listener
    document.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export default AllStaffSearchBar;
