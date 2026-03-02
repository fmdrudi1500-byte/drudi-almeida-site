import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware that adds Cache-Control headers to public GET responses
const withPublicCache = (maxAgeSeconds: number) =>
  t.middleware(async ({ ctx, next }) => {
    const result = await next();
    // Only cache successful query responses
    if (result.ok) {
      ctx.res.setHeader(
        "Cache-Control",
        `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${maxAgeSeconds * 2}`
      );
    }
    return result;
  });

// Public procedure with 5-minute cache (for blog posts, SEO data, etc.)
export const cachedPublicProcedure = t.procedure.use(withPublicCache(300));

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== 'admin') {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);
