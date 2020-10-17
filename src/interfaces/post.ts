export interface PostImage {
  id?: string;
  imgUrl?: string;
  note?: string;
}

export interface Post {
  id?: number;
  title?: string;
  content?: string;
  tag?: string;
  emotion?: string;
  images?: PostImage[];
}
