/**
 * Booking form event types — single source of truth so the Book page's
 * <select> options and any prose that lists event types can't drift.
 */
export const eventTypes = ['Birthday', 'Festival', 'Malanka', 'Zabava', 'Other'] as const;

export type EventType = (typeof eventTypes)[number];
