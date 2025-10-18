"use client";
import "client-only";

import {
  type InferDataFromTag,
  type MutationFunctionContext,
  type QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { handleClientError, handleSuccess } from "@zap/errors/client";
import { useEffect, useMemo, useRef } from "react";
import type {
  RollbackFn,
  UseZapOptimisticMutationOptions,
  ZapMutationOptions,
  ZapQueryOptions,
} from "./types";

/**
 * A wrapper around `useQuery` that provides optional success/error handling and toast support.
 */
export function useZapQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = readonly unknown[],
>(options: ZapQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const {
    showSuccessToast = false,
    skipErrorHandling = true,
    ...restOptions
  } = options;

  const queryResult = useQuery(restOptions);

  const hasHandledSuccess = useRef(false);
  const hasHandledError = useRef(false);

  const stableQueryKey = useMemo(
    () => restOptions.queryKey,
    [restOptions.queryKey]
  );

  useEffect(() => {
    if (stableQueryKey) {
      hasHandledSuccess.current = false;
      hasHandledError.current = false;
    }
  }, [stableQueryKey]);

  useEffect(() => {
    if (queryResult.isSuccess && !hasHandledSuccess.current) {
      hasHandledSuccess.current = true;

      if (showSuccessToast && options?.successMessage) {
        handleSuccess({ message: options.successMessage, title: "Success" });
      }

      options?.onSuccess?.(queryResult.data);
    }
  }, [options, queryResult.data, queryResult.isSuccess, showSuccessToast]);

  useEffect(() => {
    if (queryResult.isError && !hasHandledError.current) {
      hasHandledError.current = true;

      if (!skipErrorHandling) {
        handleClientError(queryResult.error);
      }

      options?.onError?.(queryResult.error);
    }
  }, [options, queryResult.error, queryResult.isError, skipErrorHandling]);

  return queryResult;
}

/**
 * A variant of `useZapQuery` that never refetches, suitable for immutable data.
 */
export function useZapImmutable<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = readonly unknown[],
>(options: ZapQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  return useZapQuery<TQueryFnData, TError, TData, TQueryKey>({
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
  });
}

/**
 * A wrapper around `useMutation` that provides optional success/error handling and toast support.
 */
export function useZapMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TOnMutateResult = unknown,
>(options: ZapMutationOptions<TData, TError, TVariables, TOnMutateResult>) {
  const {
    showSuccessToast = true,
    skipErrorHandling = false,
    ...restOptions
  } = options;

  return useMutation({
    ...restOptions,
    // biome-ignore lint/nursery/useMaxParams: We need all these parameters becaue it's a wrapper around Tanstack's useMutation
    onSettled: (
      data: TData | undefined,
      error: TError | null,
      variables: TVariables,
      onMutateResult: TOnMutateResult | undefined,
      context: MutationFunctionContext
    ) => {
      if (!error && showSuccessToast && options?.successMessage) {
        handleSuccess({ title: options.successMessage });
      }
      options?.onSettled?.(data, error, variables, onMutateResult, context);
    },
    onError: (
      error: TError,
      variables: TVariables,
      onMutateResult: TOnMutateResult | undefined,
      context: MutationFunctionContext
    ) => {
      if (!skipErrorHandling) {
        handleClientError(error);
      }
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
}

/**
 * A hook for performing optimistic mutations.
 *
 * Applies an optimistic update to the cache, rolls back on error, and optionally invalidates queries.
 */
export function useZapOptimisticMutation<
  TData extends NoInfer<InferDataFromTag<unknown, TQueryKey>> | undefined,
  TError,
  TVariables,
  TQueryKey extends QueryKey = readonly unknown[],
>({
  mutationFn,
  queryKey,
  updater,
  invalidates,
  ...restOptions
}: UseZapOptimisticMutationOptions<TData, TError, TVariables, TQueryKey>) {
  const queryClient = useQueryClient();

  return useZapMutation<TData, TError, TVariables, RollbackFn>({
    ...restOptions,
    mutationFn,
    onMutate: async (variables: TVariables) => {
      await queryClient.cancelQueries({ queryKey });

      const snapshot = queryClient.getQueryData(queryKey);

      queryClient.setQueryData<TData>(queryKey, (currentData) =>
        updater(currentData, variables)
      );

      return () => {
        queryClient.setQueryData(queryKey, snapshot);
      };
    },
    // biome-ignore lint/nursery/useMaxParams: We need all these parameters becaue it's a wrapper around Tanstack's useMutation
    onSettled: (data, error, variables, onMutateResult, rollback) => {
      restOptions.onSettled?.(data, error, variables, onMutateResult, rollback);

      if (!error && invalidates) {
        queryClient.invalidateQueries({ queryKey: invalidates });
      }
    },
    onError: (error, variables, onMutateResult, context) => {
      onMutateResult?.();
      restOptions.onError?.(error, variables, onMutateResult, context);
    },
  });
}
