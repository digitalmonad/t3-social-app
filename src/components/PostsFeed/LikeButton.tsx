import { useSession } from "next-auth/react";
import React from "react";
import { ThumbsUp } from "lucide-react";
import { ButtonHoverBgEffect } from "../utils/ButtonHoverBgEffect";

type TLikeButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  likedByMe: boolean;
  likeCount: number;
};

export const LikeButton = ({
  isLoading,
  onClick,
  likedByMe,
  likeCount,
}: TLikeButtonProps) => {
  const session = useSession();

  if (session.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <ThumbsUp />
        <span>{likeCount}</span>
      </div>
    );
  }

  return (
    <button
      disabled={isLoading}
      className={`group -ml-2 flex  items-center gap-1 self-start transition duration-300 ${
        likedByMe
          ? "fill-red-500"
          : "fill-gray-500 hover:text-purple-500 focus-visible:text-purple-500"
      }`}
    >
      <ButtonHoverBgEffect color>
        <ThumbsUp
          onClick={onClick}
          className={`h-5 w-5 transition duration-300 ${
            likedByMe
              ? "fill-purple-500 text-purple-600"
              : "text-gray-500 group-hover:text-purple-500  group-focus-visible:text-purple-500"
          }`}
        />
      </ButtonHoverBgEffect>
      <span>{likeCount}</span>
    </button>
  );
};
