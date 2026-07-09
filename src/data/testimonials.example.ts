import type { Testimonial } from './types';

/**
 * DEVELOPMENT FIXTURE — NOT IMPORTED IN PRODUCTION.
 *
 * This file demonstrates the shape of a real testimonial entry.
 * Do not invent quotes, names, or titles. Only copy an entry from here
 * into testimonials.ts after you have obtained genuine written
 * permission from the person quoted (e.g. a LinkedIn recommendation
 * they wrote themselves, or a direct written quote from a colleague
 * or manager who has agreed to be named).
 *
 * See CONTENT_EDITING.md for the full process.
 */
export const exampleTestimonials: Testimonial[] = [
  {
    quote:
      'Example only — replace with a real, permissioned quote before use. Never publish a fabricated testimonial.',
    name: 'Example Name',
    title: 'Example Title',
    company: 'Example Company',
    relationship: 'Example: Former engineering manager',
  },
];
