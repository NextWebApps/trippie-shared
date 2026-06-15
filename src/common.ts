/**
 * Shared primitives and conventions used across the Trippie domain model.
 */

/**
 * An ISO-8601 timestamp in UTC, e.g. `"2026-06-15T14:30:00Z"`.
 * Always stored/transmitted in UTC; pair with an IANA time zone when a
 * wall-clock (airport-local) reading is also needed.
 */
export type IsoUtcDateTime = string;

/**
 * A calendar date with no time component, `"YYYY-MM-DD"`.
 * Used for trip start/end where time-of-day is irrelevant.
 */
export type IsoDate = string;

/**
 * An IANA time zone identifier, e.g. `"Europe/Stockholm"`.
 * Lets a consumer render an {@link IsoUtcDateTime} in airport-local wall time.
 */
export type IanaTimeZone = string;

/**
 * A 3-letter IATA airport code, e.g. `"ARN"`, `"JFK"`. Uppercase by convention.
 */
export type IataCode = string;

/**
 * A point in time expressed both as an absolute UTC instant and the
 * airport-local wall-clock reading at that instant. Storing both avoids
 * ambiguity when a consumer needs to display local departure/arrival times
 * without re-deriving the offset.
 */
export interface LocalizedDateTime {
  /** The absolute instant, in UTC. */
  utc: IsoUtcDateTime;
  /** The IANA time zone of the relevant airport. */
  timeZone: IanaTimeZone;
  /**
   * The wall-clock reading at the airport, ISO-8601 with offset,
   * e.g. `"2026-06-15T16:30:00+02:00"`. Denormalized for convenience.
   */
  local: string;
}
