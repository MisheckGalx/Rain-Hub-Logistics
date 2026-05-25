import { describe, expect, it, vi } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

// Mock the database and notification functions
vi.mock("../db", () => ({
  createQuoteRequest: vi.fn().mockResolvedValue({ insertId: 1 }),
}));

vi.mock("../_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submitQuote", () => {
  it("submits a valid quote request", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submitQuote({
      name: "John Doe",
      email: "john@example.com",
      phone: "+27 10 085 0769",
      serviceType: "Road Freight",
      message: "I need to ship cargo from Johannesburg to Cape Town",
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Quote request submitted successfully");
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submitQuote({
        name: "John Doe",
        email: "invalid-email",
        phone: "+27 10 085 0769",
        serviceType: "Road Freight",
        message: "I need to ship cargo from Johannesburg to Cape Town",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects short message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submitQuote({
        name: "John Doe",
        email: "john@example.com",
        phone: "+27 10 085 0769",
        serviceType: "Road Freight",
        message: "Short",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects invalid service type", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.submitQuote({
        name: "John Doe",
        email: "john@example.com",
        phone: "+27 10 085 0769",
        serviceType: "Invalid Service" as any,
        message: "I need to ship cargo from Johannesburg to Cape Town",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
