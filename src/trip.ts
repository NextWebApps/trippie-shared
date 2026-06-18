import type { IsoDate, IsoUtcDateTime } from "./common.js";
import type { FlightEnrichment, FlightSegment } from "./flight.js";
import type { StaySegment } from "./stay.js";

/**
 * The kind of a {@link Segment}. `"flight"` and `"stay"` are supported;
 * `"cruise"` and `"transport"` are planned. The {@link Segment} union is keyed
 * on this field so new segment types slot in without breaking existing ones.
 */
export type SegmentType = "flight" | "stay";

/**
 * High-level lifecycle state of a trip, derived from its dates.
 */
export type TripStatus = "upcoming" | "past";

/**
 * Fields common to every segment, regardless of {@link SegmentType}.
 */
export interface SegmentBase {
  /** Stable unique identifier for this segment within a trip. */
  id: string;
  /** Discriminant for the {@link Segment} union. */
  type: SegmentType;
  /** Ordering within the trip itinerary (ascending). */
  order: number;
  /** When the segment was created, UTC. */
  createdAt: IsoUtcDateTime;
  /** When the segment was last modified, UTC. */
  updatedAt: IsoUtcDateTime;
}

/**
 * A flight leg within a trip. Bundles the user-entered booking
 * ({@link FlightSegment}) with its optional, separately-refreshed live
 * {@link FlightEnrichment}. Enrichment is optional because it may not have
 * been fetched yet.
 */
export interface FlightTripSegment extends SegmentBase {
  type: "flight";
  flight: FlightSegment;
  enrichment?: FlightEnrichment;
}

/**
 * A lodging stay within a trip (hotel, rental, etc.). Holds the user-entered
 * {@link StaySegment} booking. Unlike a flight, a stay has no live enrichment —
 * it is stable, manually-entered, date-centric data.
 */
export interface StayTripSegment extends SegmentBase {
  type: "stay";
  stay: StaySegment;
}

/**
 * Discriminated union of all itinerary segments. Switch on `type` to narrow.
 * Add future variants (`CruiseTripSegment`, `TransportTripSegment`) here as they
 * are introduced.
 */
export type Segment = FlightTripSegment | StayTripSegment;

/**
 * A vacation, owned by a single user (collaborators may come later), holding
 * an ordered list of itinerary {@link Segment}s.
 */
export interface Trip {
  /** Stable unique identifier. */
  id: string;
  /** {@link User.id} of the sole owner. */
  ownerId: string;
  /** Human title, e.g. `"Summer in Sicily"`. */
  title: string;
  /** Free-text destination, e.g. `"Palermo, Italy"`. */
  destination: string;
  /** First day of the trip (date only). */
  startDate: IsoDate;
  /** Last day of the trip (date only). */
  endDate: IsoDate;
  /** Derived lifecycle status. */
  status: TripStatus;
  /** Ordered itinerary segments. */
  segments: Segment[];
  /** When the trip was created, UTC. */
  createdAt: IsoUtcDateTime;
  /** When the trip was last modified, UTC. */
  updatedAt: IsoUtcDateTime;
}
