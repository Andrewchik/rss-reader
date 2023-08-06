import React, { useState } from 'react';

interface Article {
    _id: string;
    title: string;
    content: string;
  }

interface ArticleEditFormProps {
  article: Article;
  onUpdate: (updatedArticle: Article) => void;
  setEditing: (value: boolean) => void;
}

const ArticleEditForm: React.FC<ArticleEditFormProps> = ({ article, onUpdate, setEditing }) => {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedArticle: Article = {
      _id: article._id,
      title: title,
      content: content,
    };
    onUpdate(updatedArticle);
  };


  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/articles/${article._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
  
      if (response.ok) {
        const updatedArticle = await response.json();
        onUpdate(updatedArticle);
        setEditing(false)
      } else {
        console.error('Error updating article:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };  

  return (
    <form onSubmit={handleSubmit} style={{padding: '50px', display: 'flex', flexDirection: 'column'}}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={event => setContent(event.target.value)}
        />
      </div>
      <button type="submit" onClick={handleUpdate}>Update Article</button>
    </form>
  );
};

export default ArticleEditForm;