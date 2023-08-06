import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface Article {
  id: string;
  title: string;
  content: string;
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: '20px', marginRight: '20px' }}>
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
    </Card>
  );
}
