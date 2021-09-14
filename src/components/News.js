import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const news = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settoTalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&Page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(api);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    settoTalResults(parsedData.totalResult);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsFeed`;
    updateNews();
  }, []);

  // previousPage = async () => {
  //
  //   setPage(page -1)
  //   updateNews()
  // };

  // nextPage = async () => {
  //
  //   setPage(page +1)
  //  updateNews()
  // };

  const fetchMoreData = async () => {
    const api = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&Page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);

    let data = await fetch(api);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    settoTalResults(parsedData.totalResults);
  };

  return (
    <div className="my-5">
      <p className="text-center my-5 py-4">
        <h1>
          News Feed - Top{" "}
          <span className="text-danger">
            {capitalizeFirstLetter(props.category)}
          </span>{" "}
          Headlines{" "}
        </h1>
      </p>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row ">
            {articles.map((el) => {
              return (
                <div className="col-md-4 col-sm-1 my-3" key={el.url}>
                  <NewsItem
                    title={el.title ? el.title.slice(0, 30) : ""}
                    descreption={
                      el.description ? el.description.slice(0, 40) : ""
                    }
                    imageUrl={el.urlToImage}
                    newsUrl={el.url}
                    date={el.publishedAt}
                    author={el.author}
                    source={el.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

news.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
  totalResults: 0,
};
news.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
};

export default news;
