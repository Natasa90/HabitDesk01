import { ReactNode } from "react";

export interface CardLayoutProps {
    title: string;
    porch: any;
    displayComment: string;
    commentText: string;
    showMore: boolean;
    handleMore: () => void;
    handleVote: () => void;
    isUpdating: boolean;
    formattedDate: string;
    isVoteDisabled: boolean;
    hasVoted: boolean;
    extraContent?: ReactNode;
  };
  
export interface HeaderWithIconProps {
    icon: string;
    title: string; 
}

export interface BackgroundWrapperProps {
  children: React.ReactNode; 
}