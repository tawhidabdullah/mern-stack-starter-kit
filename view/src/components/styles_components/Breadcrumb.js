import React from "react";

export default function Breadcrumb(props) {
  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Ratings</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#">Add Reviews</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Reviews
        </li>
        <li class="rate-product">
          <button
            className="rate-product-button"
            onClick={props.onAddRateButtonClick}
          >
            Rate Product
          </button>
        </li>
      </ol>
    </nav>
  );
}
