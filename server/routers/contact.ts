import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createQuoteRequest } from "../db";
import { notifyOwner } from "../_core/notification";

export const contactRouter = router({
  submitQuote: publicProcedure
    .input(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(5),
        serviceType: z.string().min(1),
        message: z.string().min(10),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await createQuoteRequest(input);
      } catch (err) {
        console.warn("[contact] could not save quote request:", err);
      }
      try {
        await notifyOwner({
          title: `New quote request from ${input.name}`,
          content: `${input.serviceType}\n${input.email} | ${input.phone}\n\n${input.message}`,
        });
      } catch (err) {
        console.warn("[contact] notifyOwner failed:", err);
      }
      return { success: true, message: "Quote request submitted successfully" } as const;
    }),
});
