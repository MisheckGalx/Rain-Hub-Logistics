import { describe, expect, it } from "vitest";
import { openStatus } from "../client/src/lib/company";

// South Africa is UTC+2 all year, so 07:00 UTC = 09:00 in Johannesburg.
const at = (iso: string) => openStatus(new Date(iso));

describe("openStatus (hours are South African time)", () => {
  it("is open on a weekday morning", () => {
    expect(at("2026-10-12T07:00:00Z")).toEqual({ open: true, text: "Open now · closes 18:00" }); // Mon 09:00
  });
  it("is closed before opening and says when it opens today", () => {
    expect(at("2026-10-12T04:30:00Z").text).toBe("Closed · opens today at 07:00"); // Mon 06:30
  });
  it("closes at 18:00 sharp and reopens tomorrow", () => {
    expect(at("2026-10-12T15:59:00Z").open).toBe(true); // 17:59
    expect(at("2026-10-12T16:00:00Z").text).toBe("Closed · opens tomorrow at 07:00"); // 18:00
  });
  it("uses Saturday's shorter hours", () => {
    expect(at("2026-10-10T09:00:00Z")).toEqual({ open: true, text: "Open now · closes 13:00" }); // Sat 11:00
    expect(at("2026-10-10T11:30:00Z").text).toBe("Closed · opens Monday at 07:00"); // Sat 13:30
  });
  it("is closed all day Sunday", () => {
    expect(at("2026-10-11T08:00:00Z").text).toBe("Closed · opens tomorrow at 07:00");
  });
  it("judges by Johannesburg time, not the visitor's", () => {
    expect(at("2026-10-11T22:30:00Z").text).toBe("Closed · opens today at 07:00"); // Mon 00:30 in Johannesburg
  });
});
