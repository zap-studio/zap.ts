import { cn } from "@zap/shadcn/lib/utils";
import Link from "next/link";
import { LEGAL_CONFIG } from "..";

export function PolicyLinks({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"text-balance text-center text-muted-foreground text-xs [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary [&_a]:active:text-primary",
				className,
			)}
		>
			By clicking continue, you agree to our{" "}
			<Link href={{ pathname: LEGAL_CONFIG.URLS.TERMS_OF_SERVICE }}>
				Terms of Service
			</Link>{" "}
			and{" "}
			<Link href={{ pathname: LEGAL_CONFIG.URLS.PRIVACY_POLICY }}>
				Privacy Policy
			</Link>
			.
		</div>
	);
}
