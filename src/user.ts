import type { IsoUtcDateTime } from "./common.js";

/**
 * A registered Trippie user. Auth is email/password with email verification;
 * social login may be added later. Secrets (password hashes, tokens) live in
 * the API/auth layer and are intentionally NOT part of this shared shape.
 */
export interface User {
  /** Stable unique identifier (e.g. UUID or Cognito sub). */
  id: string;
  /** Login + contact email. Unique across users. */
  email: string;
  /** Display name shown in the UI. */
  displayName: string;
  /**
   * Whether the user has completed email verification. Unverified users may
   * have restricted access until they confirm ownership of the address.
   */
  emailVerified: boolean;
  /** When the account was created, UTC. */
  createdAt: IsoUtcDateTime;
  /** When the account record was last modified, UTC. */
  updatedAt: IsoUtcDateTime;
}
