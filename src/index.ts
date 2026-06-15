/**
 * trippie-shared — single source of shared domain types and API contracts
 * for the Trippie vacation planner. Consumed by trippie-api and trippie-web.
 *
 * Everything exported here is a TYPE (no runtime values), so the emitted
 * `dist/index.js` is effectively empty and importing it has zero runtime cost.
 */

// Shared primitives
export type {
  IanaTimeZone,
  IataCode,
  IsoDate,
  IsoUtcDateTime,
  LocalizedDateTime,
} from "./common.js";

// User domain
export type { User } from "./user.js";

// Flight domain
export type {
  FlightEnrichment,
  FlightSegment,
  FlightStatus,
} from "./flight.js";

// Trip domain
export type {
  FlightTripSegment,
  Segment,
  SegmentBase,
  SegmentType,
  Trip,
  TripStatus,
} from "./trip.js";

// API contracts (DTOs)
export type {
  AddFlightSegmentRequest,
  AddFlightSegmentResponse,
  CreateTripRequest,
  CreateTripResponse,
  GetTripResponse,
  ListTripsResponse,
  TripSummary,
} from "./api.js";
