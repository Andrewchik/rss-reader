import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card';

interface Article {
  id: string;
  title: string;
  content: string;
}

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <ul className='articles-list'>
        {articles.map(article => (
         <Card key={article.id} article={article} />
        ))}
      </ul>
    </div>
  );
};