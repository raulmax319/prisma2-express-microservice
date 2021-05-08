/**
 * A simple sleep statement.
 *
 * @param ms The number to wait in milliseconds.
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
