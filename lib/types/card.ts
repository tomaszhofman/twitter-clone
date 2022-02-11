export type CardProps = {
  userImage: string;
  name: string;
  tag: string;
  createdAt: number;
  postId: string;
  text: string;
  numberOfLikes: number;
  numberOfReplies: number;
  image: string;
  isLikedByCurrentUser: boolean;
  onDelete?: () => void;
  onReply: () => void;
  onLike: () => void;
};
