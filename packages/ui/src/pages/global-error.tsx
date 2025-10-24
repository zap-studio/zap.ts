"use client";
import "client-only";

import { BaseError } from "@zap/errors";
import type { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { ZapButton } from "../components/core/button";

type ErrorBoundaryProps = {
	reset: () => void;
	error: Error & { digest?: string };
	font?: NextFontWithVariable;
};

export function _GlobalError({ reset, error, font }: ErrorBoundaryProps) {
	const isBaseError = error instanceof BaseError;

	const title = isBaseError ? error.name : "Error";
	const message = isBaseError ? error.message : "An unexpected error occurred.";

	return (
		<html lang="en">
			<body
				className={
					font?.variable ? `${font.variable} antialiased` : "antialiased"
				}
			>
				<main className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
					<section className="w-full max-w-md space-y-6 text-center">
						<header className="space-y-3">
							<h1 className="animate-bounce font-bold text-4xl text-primary tracking-tighter sm:text-5xl">
								{title}
							</h1>
							<p className="text-muted-foreground">{message}</p>
						</header>
						<ZapButton onClick={reset} variant="ghost">
							Try again
						</ZapButton>
					</section>
				</main>
			</body>
		</html>
	);
}
