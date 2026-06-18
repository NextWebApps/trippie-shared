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
  FlightSchedulePrefill,
  FlightSegment,
  FlightStatus,
} from "./flight.js";

// Stay (lodging) domain
export type { StaySegment, WallClockTime } from "./stay.js";

// Trip domain
export type {
  FlightTripSegment,
  Segment,
  SegmentBase,
  SegmentType,
  StayTripSegment,
  Trip,
  TripStatus,
} from "./trip.js";

// API contracts (DTOs)
export type {
  AddFlightSegmentRequest,
  AddFlightSegmentResponse,
  AddStaySegmentRequest,
  AddStaySegmentResponse,
  CreateTripRequest,
  CreateTripResponse,
  DeleteSegmentResponse,
  FlightLookupResponse,
  GetTripResponse,
  ListTripsResponse,
  TripSummary,
} from "./api.js";
