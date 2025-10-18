import type {
  MutationFunctionContext,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

/**
 * Options for a Zap query, extending `UseQueryOptions` with additional flags for UI handling.
 */
export interface ZapQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey,
> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  /** Whether to show a success toast when the query succeeds */
  showSuccessToast?: boolean;
  /** Optional success message to display */
  successMessage?: string;
  /** Skip the built-in client error handling if true */
  skipErrorHandling?: boolean;
  /** Callback invoked on query success */
  onSuccess?: (data: TData) => void;
  /** Callback invoked on query error */
  onError?: (error: TError) => void;
}

/**
 * Options for a Zap mutation, extending `UseMutationOptions` with additional flags for UI handling.
 */
export interface ZapMutationOptions<TData, TError, TVariables, TOnMutateResult>
  extends UseMutationOptions<TData, TError, TVariables, TOnMutateResult> {
  showSuccessToast?: boolean;
  successMessage?: string;
  skipErrorHandling?: boolean;

  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    onMutateResult: TOnMutateResult | undefined,
    context: MutationFunctionContext
  ) => void;
  onError?: (
    error: TError,
    variables: TVariables,
    onMutateResult: TOnMutateResult | undefined,
    context: MutationFunctionContext
  ) => void;
}

/** Function type for rolling back optimistic updates */
export type RollbackFn = () => void;

/**
 * Options for an optimistic mutation, extending ZapMutationOptions with a cache updater.
 */
export interface UseZapOptimisticMutationOptions<
  TData,
  TError,
  TVariables,
  TQueryKey extends QueryKey = readonly unknown[],
> extends ZapMutationOptions<TData, TError, TVariables, RollbackFn> {
  /** The query key identifying the cached query to update */
  queryKey: TQueryKey;
  /** Function that computes the optimistic update */
  updater: (currentData: TData | undefined, variables: TVariables) => TData;
  /** Queries to invalidate after mutation succeeds */
  invalidates?: TQueryKey | TQueryKey[];
}
