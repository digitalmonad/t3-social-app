import { inferRouterOutputs, inferRouterInputs } from "@trpc/server";
import { AppRouter } from "@/server/api/root";

export type OutputTypes = inferRouterOutputs<AppRouter>;
export type ImportTypes = inferRouterInputs<AppRouter>;
