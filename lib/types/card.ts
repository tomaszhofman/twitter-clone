export type CardProps = {
  userImage: string;
  name: string;
  tag: string;
  createdAt: number;
  text: string;
  numberOfLikes: number;
  numberOfReplies: number;
  isLikedByCurrentUser: boolean;
  onDelete?: () => void;
  onReply: () => void;
  onLike: () => void;
};
