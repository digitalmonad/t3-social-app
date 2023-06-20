import React from "react";
import { PostCard } from "./PostCard";
import InfiniteScroll from "react-infinite-scroll-component";

import type { OutputTypes } from "@/types";

export type TPostsFeedProps = {
  posts: OutputTypes["posts"]["infiniteFeed"]["feed"] | undefined;
  isError: boolean;
  isLoading: boolean;
  hasMore: boolean;
  fetchNextPage: () => Promise<unknown>;
};

export const PostsFeed = ({
  posts = [],
  isError,
  isLoading,
  hasMore,
  fetchNextPage,
}: TPostsFeedProps) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (posts.length < 1)
    return (
      <div className="my-4 text-center text-2xl text-gray-500">
        No posts so far...
      </div>
    );

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
      >
        <div className="flex flex-col gap-2 p-2">
          {posts.map((post) => (
            <PostCard
              createdAt={post.createdAt}
              id={post.id}
              key={post.id}
              content={post.content}
              user={post.user}
              likeCount={post.likeCount}
              likedByMe={post.likedByMe}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};
