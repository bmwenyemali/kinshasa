import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@kinservices/api";

export const trpc = createTRPCReact<AppRouter>();
