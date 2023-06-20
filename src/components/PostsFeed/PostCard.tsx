import React from "react";
import Link from "next/link";

import { OutputTypes } from "@/types";
import { ProfileImage } from "@/components/ProfileImage";
import { dateTimeFormatter } from "@/utils/date";
import { LikeButton } from "./LikeButton";
import { api } from "@/utils/api";

export const PostCard = ({
  content,
  user,
  id,
  createdAt,
  likeCount,
  likedByMe,
}: OutputTypes["posts"]["infiniteFeed"]["feed"][number]) => {
  const trpcUtils = api.useContext();
  const toggleLike = api.posts.toggleLike.useMutation({
    onSuccess: ({ addedLike }) => {
      const updateData: Parameters<
        typeof trpcUtils.posts.infiniteFeed.setInfiniteData
      >[1] = (oldData) => {
        if (oldData == null) return;

        const countModifier = addedLike ? 1 : -1;

        const r = {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              feed: page.feed.map((post) => {
                if (post.id === id) {
                  return {
                    ...post,
                    likeCount: post.likeCount + countModifier,
                    likedByMe: addedLike,
                  };
                }

                return post;
              }),
            };
          }),
        };

        return r;
      };

      trpcUtils.posts.infiniteFeed.setInfiniteData({}, updateData);
    },
  });

  const handleToggleLike = () => {
    toggleLike.mutate({ id });
  };

  return (
    <li className="flex gap-4 rounded border p-2">
      <Link href={`/profile/${user?.id}`}>
        <ProfileImage src={user?.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${user?.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {user?.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter().format(createdAt)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <LikeButton
          onClick={handleToggleLike}
          isLoading={toggleLike.isLoading}
          likedByMe={likedByMe}
          likeCount={likeCount}
        />
      </div>
    </li>
  );
};
