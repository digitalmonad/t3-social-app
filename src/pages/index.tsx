import { NewPostForm } from "@/components/NewPostForm";
import { PostsFeed } from "@/components/PostsFeed";

import { api } from "@/utils/api";

export default function Home() {
  const createPost = api.posts.create.useMutation();
  const posts = api.posts.infiniteFeed.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => {
        lastPage.nextCursor;
      },
    }
  );

  const pageso = posts.data?.pages.flatMap((page) => page.feed);

  const handleSubmit = async ({ content }: { content: string }) =>
    void (await createPost.mutateAsync({ content }));

  return (
    <>
      <header className="paper sticky top-0 z-10 flex h-12 items-center border-b px-2">
        <h1 className="text-lg font-bold">Home</h1>
      </header>
      <NewPostForm onSubmit={handleSubmit} />
      <PostsFeed
        isError={!!posts.error}
        isLoading={posts.isLoading}
        hasMore={!!posts.hasNextPage}
        fetchNextPage={posts.fetchNextPage}
        posts={pageso}
      />
    </>
  );
}
