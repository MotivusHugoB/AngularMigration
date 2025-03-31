export interface Article {
  slug?: string;
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  favoritesCount?: number;
  author?: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface ArticleListConfig {
  type: 'all' | 'feed';
  filters?: {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
  };
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface SingleArticleResponse {
  article: Article;
}