export interface Article {
    _id: string;
    title: string;
    content: string;
}

export interface ArticleProps {
    article: Article,
    onDelete: (articleId : string) => void,
    onUpdate: (updatedArticle: Article) => void
}

export interface ArticleFormProps {
    onCreate: (newArticle: Article) => void;
}

export interface ArticleEditFormProps {
    article: Article;
    onUpdate: (updatedArticle: Article) => void;
    setEditing: (value: boolean) => void;
  }