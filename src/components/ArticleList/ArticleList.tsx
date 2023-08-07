import { useEffect, useState } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import ArticleForm from '../ArticleForm/ArticleForm';
import { useSelector } from 'react-redux';
import { Article } from '../../interfaces/article.interfaces';
import Loader from '../Loader/Loader';

export const ArticleList = () => {
  const isAuth = useSelector(({auth}) => auth.isLoggedIn);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    fetchArticles();
  }, [loading]);


  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/articles');
      if (response.ok) {
        const data: Article[] = await response.json();
        setArticles(data);
        setLoading(false);
      } else {
        throw new Error(`Failed to fetch articles. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
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
      <div className="articles-create-block">
        {isAuth && <ArticleForm onCreate={handleCreate} />}
      </div>
      <ul className='articles-list'>
        {loading ? (
          <Loader />
        ) : (
          articles.map(article => (
            <ArticleCard
              key={article._id}
              article={article}
              onDelete={onDeleteArticle}
              onUpdate={onUpdateArticle}
            />
          ))
        )}
      </ul>
    </div>
  );
};