import type { IsoDate, IsoUtcDateTime } from "./common.js";
import type { FlightEnrichment, FlightSegment } from "./flight.js";

/**
 * The kind of a {@link Segment}. Currently only `"flight"`; `"cruise"`,
 * `"stay"`, and `"transport"` are planned. The {@link Segment} union is keyed
 * on this field so new segment types slot in without breaking existing ones.
 */
export type SegmentType = "flight";

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
 * Discriminated union of all itinerary segments. Switch on `type` to narrow.
 * Add future variants (`CruiseTripSegment`, `StayTripSegment`,
 * `TransportTripSegment`) here as they are introduced.
 */
export type Segment = FlightTripSegment;

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
