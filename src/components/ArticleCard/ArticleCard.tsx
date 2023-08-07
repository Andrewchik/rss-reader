import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import ArticleEditForm from '../ArticleEditForm/ArticleEditForm';

interface Article {
  _id: string;
  title: string;
  content: string;
}

interface ArticleProps {
  article: Article,
  onDelete: (articleId : string) => void,
  onUpdate: (updatedArticle: Article) => void
}


export default function ArticleCard({article, onDelete, onUpdate} : ArticleProps) {
  const isAuth = useSelector(({auth}) => auth.isLoggedIn);
  const [editing, setEditing] = useState<boolean>(false);


  const deleteArticle = async () => {
    
    try {
      const response = await fetch(`http://localhost:3000/api/articles/${article._id}`, {
        method: 'DELETE'
      });
  
      if (response.status === 200) {
        onDelete(article._id)
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
}

  return (
    <Card sx={{ maxWidth: 345, marginBottom: '20px', marginRight: '20px', position: 'relative' }}>
      {isAuth && 
        <div className="card-top">
          <div className="delete"  style={{float: 'right', cursor: 'pointer', padding: '5px'}} onClick={() => deleteArticle()}>
          <DeleteIcon />
          </div>
          <div className="edit"  style={{float: 'left', cursor: 'pointer', padding: '5px'}} onClick={() => setEditing(!editing)}>
          <EditIcon />
          </div>
          {editing &&
            <ArticleEditForm article={article} onUpdate={(updateArticle: Article) => onUpdate(updateArticle)} setEditing={setEditing} />
          }
        </div>
      }
           {!editing &&
            <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.content}
              </Typography>
            </CardContent>
          </CardActionArea>
          }

    </Card>
  );
}