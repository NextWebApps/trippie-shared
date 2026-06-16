import type { IataCode, IsoUtcDateTime, LocalizedDateTime } from "./common.js";

/**
 * Live operational status of a flight, as reported by an enrichment source.
 */
export type FlightStatus =
  | "scheduled"
  | "on-time"
  | "delayed"
  | "boarding"
  | "departed"
  | "landed"
  | "cancelled";

/**
 * The user-entered flight BOOKING record. This is the stable, slow-changing
 * data the traveler knows when they add the flight to a trip. Live
 * operational data (gate, delays, etc.) is kept separately in
 * {@link FlightEnrichment} so it can refresh independently over time.
 */
export interface FlightSegment {
  /** Operating airline name or IATA airline designator, e.g. `"SK"`. */
  airline: string;
  /** Flight number, e.g. `"SK1429"`. */
  flightNumber: string;
  /** Origin airport IATA code. */
  origin: IataCode;
  /** Destination airport IATA code. */
  destination: IataCode;
  /** Scheduled departure, UTC + origin-airport-local wall time. */
  scheduledDeparture: LocalizedDateTime;
  /** Scheduled arrival, UTC + destination-airport-local wall time. */
  scheduledArrival: LocalizedDateTime;
  /** Optional booking reference / PNR. */
  bookingReference?: string;
}

/**
 * Best-effort schedule details resolved by a flight-data provider to PREFILL
 * the add-flight form. Unlike {@link FlightSegment}, every field except the
 * flight number is OPTIONAL: providers often have only partial data for
 * far-future or lightly-scheduled flights (e.g. a known departure airport/time
 * but no arrival airport/time yet). The user completes any missing fields
 * before saving, at which point it becomes a full {@link FlightSegment}.
 */
export interface FlightSchedulePrefill {
  /** Operating airline name or IATA designator, if known. */
  airline?: string;
  /** Flight number, normalized (no spaces, upper-case), e.g. `"IZ592"`. */
  flightNumber: string;
  /** Origin airport IATA code, if resolved. */
  origin?: IataCode;
  /** Destination airport IATA code, if resolved. */
  destination?: IataCode;
  /** Scheduled departure, UTC + origin-airport-local wall time, if resolved. */
  scheduledDeparture?: LocalizedDateTime;
  /** Scheduled arrival, UTC + destination-airport-local wall time, if resolved. */
  scheduledArrival?: LocalizedDateTime;
}

/**
 * Live, refreshable enrichment for a flight. Stored SEPARATELY from the
 * {@link FlightSegment} booking record (different table/record) so it can be
 * re-fetched as departure approaches without mutating the booking. Every field
 * beyond `status` and `lastRefreshedAt` is optional because a given source may
 * not provide it, and it may not be known until close to departure.
 */
export interface FlightEnrichment {
  /** Current operational status. */
  status: FlightStatus;
  /** Departure terminal, if known, e.g. `"5"`. */
  departureTerminal?: string;
  /** Departure gate, if known, e.g. `"F32"`. */
  departureGate?: string;
  /** Arrival terminal, if known. */
  arrivalTerminal?: string;
  /** Arrival gate, if known. */
  arrivalGate?: string;
  /** Boarding time, UTC + origin-airport-local, if published. */
  boardingTime?: LocalizedDateTime;
  /** Estimated (vs scheduled) departure, if revised. */
  estimatedDeparture?: LocalizedDateTime;
  /** Estimated (vs scheduled) arrival, if revised. */
  estimatedArrival?: LocalizedDateTime;
  /** When this enrichment snapshot was last refreshed from the source, UTC. */
  lastRefreshedAt: IsoUtcDateTime;
}
