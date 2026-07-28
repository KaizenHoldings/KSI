/** Every operation that can fail returns this shape. */
export type ServiceResult<TData, TError extends ServiceError = ServiceError> =
  | { readonly success: true; readonly data: TData }
  | { readonly success: false; readonly error: TError };

export interface ServiceError {
  /** Stable, machine-readable identifier. Never shown to the visitor. */
  readonly code: string;
  /** Message written for the visitor: names the problem and the way out. */
  readonly message: string;
}

export function ok<TData, TError extends ServiceError = ServiceError>(
  data: TData,
): ServiceResult<TData, TError> {
  return { success: true, data };
}

export function fail<TData, TError extends ServiceError>(
  error: TError,
): ServiceResult<TData, TError> {
  return { success: false, error };
}
