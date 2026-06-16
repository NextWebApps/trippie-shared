/**
 * API request/response contracts (DTOs) for the first Trippie feature set.
 *
 * Conventions:
 * - Request shapes carry only client-supplied fields; server-owned fields
 *   (`id`, `ownerId`, timestamps, derived `status`) are assigned by the API.
 * - Response shapes reuse the domain types from {@link "./trip.js"} etc.
 */

import type { IsoDate } from "./common.js";
import type { FlightSegment } from "./flight.js";
import type { Segment, Trip } from "./trip.js";

/* -------------------------------------------------------------------------- */
/* Create trip                                                                */
/* -------------------------------------------------------------------------- */

/** Body for `POST /trips`. */
export interface CreateTripRequest {
  title: string;
  destination: string;
  startDate: IsoDate;
  endDate: IsoDate;
}

/** Response for `POST /trips` — the newly created trip (with empty segments). */
export interface CreateTripResponse {
  trip: Trip;
}

/* -------------------------------------------------------------------------- */
/* List trips (upcoming vs past)                                              */
/* -------------------------------------------------------------------------- */

/**
 * Lightweight trip summary for list views — omits the full `segments` array
 * to keep list payloads small. Detail is fetched per-trip on demand.
 */
export interface TripSummary {
  id: string;
  title: string;
  destination: string;
  startDate: IsoDate;
  endDate: IsoDate;
  status: Trip["status"];
  /** Number of segments in the trip, for at-a-glance display. */
  segmentCount: number;
}

/**
 * Response for `GET /trips` — trips pre-split into upcoming and past buckets
 * so the client doesn't re-derive the partition.
 */
export interface ListTripsResponse {
  upcoming: TripSummary[];
  past: TripSummary[];
}

/* -------------------------------------------------------------------------- */
/* Get trip detail                                                            */
/* -------------------------------------------------------------------------- */

/** Response for `GET /trips/{tripId}` — the full trip with all segments. */
export interface GetTripResponse {
  trip: Trip;
}

/* -------------------------------------------------------------------------- */
/* Add flight segment                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Body for `POST /trips/{tripId}/segments` adding a flight. Carries the
 * booking data only; live enrichment is fetched server-side afterward.
 */
export interface AddFlightSegmentRequest {
  type: "flight";
  flight: FlightSegment;
}

/**
 * Response for adding a segment — returns the created {@link Segment} and the
 * updated parent {@link Trip} so the client can refresh in one round trip.
 */
export interface AddFlightSegmentResponse {
  segment: Segment;
  trip: Trip;
}

/* -------------------------------------------------------------------------- */
/* Flight lookup (autocomplete the add-flight form)                           */
/* -------------------------------------------------------------------------- */

/**
 * Response for `GET /flights/lookup?number={flightNumber}&date={YYYY-MM-DD}`.
 * Best-effort booking/schedule details resolved from the flight-data provider
 * (airline, airports, scheduled times), used to PREFILL the add-flight form.
 * The user can edit every field before saving, so the server returns the full
 * {@link FlightSegment} booking shape. A 404 means no matching flight was found.
 */
export interface FlightLookupResponse {
  flight: FlightSegment;
}
