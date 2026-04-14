/**
 * Sanitize a string by stripping HTML tags and trimming whitespace.
 * Use on all user-provided text before displaying or storing.
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/[<>"'&]/g, (char) => {
      const entities: Record<string, string> = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "&": "&amp;",
      };
      return entities[char] || char;
    })
    .trim();
}

/**
 * Sanitize for display — decodes entities back for safe text rendering.
 * React auto-escapes JSX so this is mainly for non-JSX contexts.
 */
export function sanitizeForDisplay(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}
