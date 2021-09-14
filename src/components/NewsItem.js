import React from "react";

const NewsItem = (props) => {
  let { title, descreption, imageUrl, newsUrl, date, author, source } = props;
  return (
    <div>
      <div className="card">
        <span class="position-absolute top-0  start-50 translate-middle badge rounded-pill bg-danger">
          {source}
        </span>
        <img
          src={
            !imageUrl
              ? "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
          style={{ height: "220px", borderBottom: "1px solid black" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>

          <p class="card-text">
            <small class="text-muted">
              <b>By</b> {!author ? "Unknown" : author} <br />
              <b>On</b> {new Date(date).toGMTString()}
            </small>
          </p>
          <p className="card-text">{descreption}...</p>
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
