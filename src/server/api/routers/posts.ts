import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const postsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      const post = await ctx.prisma.post.create({
        data: { content, userId: ctx.session.user.id },
      });

      return post;
    }),
  infiniteFeed: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      const currentUserId = ctx.session?.user.id;
      const feed = await ctx.prisma.post.findMany({
        take: limit + 1,
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: { select: { likes: true } },
          likes: !currentUserId ? false : { where: { userId: currentUserId } },
          user: {
            select: { name: true, id: true, image: true },
          },
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (feed.length > limit) {
        const nextItem = feed.pop();
        if (!!nextItem) {
          nextCursor = { id: nextItem.id, createdAt: nextItem.createdAt };
        }
      }
      return {
        feed: feed.map((item) => ({
          id: item.id,
          content: item.content,
          createdAt: item.createdAt,
          likeCount: item._count.likes || 0,
          user: item.user,
          likedByMe: item.likes?.length > 0,
        })),
        nextCursor,
      };
    }),
  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = { postId: id, userId: ctx.session?.user.id };

      const existingLike = await ctx.prisma.like.findUnique({
        where: { userId_postId: data },
      });

      if (existingLike == null) {
        await ctx.prisma.like.create({ data });
        return { addedLike: true };
      } else {
        await ctx.prisma.like.delete({ where: { userId_postId: data } });
        return { addedLike: false };
      }
    }),
});
