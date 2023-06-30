import React from 'react';
import moment from 'moment';

function Article({ article }) {
  return (
    <div className="article" key={article?.id}>
      <h3>
        <a href={article?.url} className="article-title">
          {article?.title}
        </a>
      </h3>
      <p className="article-date">{moment(article.publishedAt).format('MMMM Do YYYY')}</p>
      <p className="article-description">{article.description}</p>
    </div>
  );
}

export default Article;
