import React, { useEffect, useState } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import ArticleForm from '../ArticleForm/ArticleForm';

interface Article {
  _id: string;
  title: string;
  content: string;
}

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);


  useEffect(() => {
    fetchArticles();
  }, []);


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

  const handleCreate = (newArticle: Article) => {
    setArticles([...articles, newArticle]);
  };

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
  
  

  return (
    <div>
      <ul className='articles-list'>
        <ArticleForm onCreate={handleCreate} />
        {articles.map(article => (
         <ArticleCard key={article._id} article={article} onDelete={onDeleteArticle} onUpdate={onUpdateArticle} />
        ))}
      </ul>
    </div>
  );
};