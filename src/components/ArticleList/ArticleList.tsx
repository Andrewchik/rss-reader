import React, { useEffect, useState } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';

interface Article {
  _id: string;
  title: string;
  content: string;
}

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/articles');
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        } else {
          throw new Error(`Failed to fetch articles. Status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchArticles();
  }, []);


  const onDeleteArticle = (articleId : string) => {
    setArticles(articles.filter(article => article._id !== articleId));
  }
  

  const onUpdateArticle = (updatedArticle: Article) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        article._id === updatedArticle._id ? updatedArticle : article
      )
    );
  };

  const handleAdd = async (newArticle: Article) => {
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newArticle.title,
          content: newArticle.content,
        }),
      });
  
      if (response.status === 201) {
        const data = await response.json();
        setArticles([...articles, data]);
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };
  
  

  return (
    <div>
      <ul className='articles-list'>
        {articles.map(article => (
         <ArticleCard key={article._id} article={article} onDelete={onDeleteArticle} onUpdate={onUpdateArticle} />
        ))}
      </ul>
    </div>
  );
};