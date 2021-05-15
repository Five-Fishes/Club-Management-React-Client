/**
 * Appends REQUEST async action type
 */
export function REQUEST(actionType: string): string {
  return `${actionType}_PENDING`;
}

/**
 * Appends SUCCESS async action type
 */
export function SUCCESS(actionType: string): string {
  return `${actionType}_FULFILLED`;
}

/**
 * Appends FAILURE async action type
 */
export function FAILURE(actionType: string): string {
  return `${actionType}_REJECTED`;
}
