import type { IsoDate } from "./common.js";

/**
 * A wall-clock time of day, `"HH:mm"` (24-hour), with no date or zone, e.g.
 * `"15:00"`. Used for a stay's optional check-in / check-out time, which the
 * traveler reads off their booking in the lodging's local time. We deliberately
 * do NOT pair stays with a UTC instant + IANA zone the way flights are: a hotel
 * stay is a multi-day, date-centric thing and the property's own local calendar
 * is the only meaningful frame, so a plain date (+ optional local time) is both
 * sufficient and less error-prone than a zoned instant.
 */
export type WallClockTime = string;

/**
 * The user-entered LODGING booking for a stay segment (hotel, rental, etc.).
 * Date-centric and manually entered — there is no live enrichment for stays
 * (unlike {@link FlightSegment}), so every field here is stable booking data.
 */
export interface StaySegment {
  /** Lodging name, e.g. `"Hotel Particulier Montmartre"`. */
  name: string;
  /** Free-text location / address, e.g. `"23 Avenue Junot, Paris"`. */
  location: string;
  /** Check-in calendar date (date only), e.g. `"2026-06-15"`. */
  checkInDate: IsoDate;
  /** Check-out calendar date (date only), e.g. `"2026-06-19"`. */
  checkOutDate: IsoDate;
  /** Optional check-in time of day, lodging-local wall clock, `"HH:mm"`. */
  checkInTime?: WallClockTime;
  /** Optional check-out time of day, lodging-local wall clock, `"HH:mm"`. */
  checkOutTime?: WallClockTime;
  /** Optional confirmation / reservation reference. */
  confirmationReference?: string;
  /** Optional free-text notes (e.g. "ask for a high floor"). */
  notes?: string;
}
