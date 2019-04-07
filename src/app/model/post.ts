import { Episode } from './episode';
import { PatronList } from './patron.list';

export interface PostDetailsResponse {
  post: Post;
  episode: Episode;
  patrons: PatronList;
}

export class Post {
  id: number;
  episodeId: number;
  createdAt: Date;
  name: string;
  shortDescription: string;
  description: string;
  link: string;
  guests: string[];
}
