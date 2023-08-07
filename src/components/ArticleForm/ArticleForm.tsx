import React, { useState } from 'react';
import axios from 'axios';


interface Article {
    _id: string;
    title: string;
    content: string;
  }

interface ArticleFormProps {
  onCreate: (newArticle: Article) => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/articles', { title, content });
      onCreate(response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={'article-input'}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className={'article-textarea'}>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button type="submit">Create Article</button>
    </form>
  );
};

export default ArticleForm;