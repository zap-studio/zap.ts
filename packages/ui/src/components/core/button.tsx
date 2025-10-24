import { Button } from "@zap/shadcn/ui/button";
import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Button>;

type ZapButtonProps = ButtonProps & {
	loading?: boolean;
	loadingText?: string;
};

/**
 * A button component that shows a loading spinner when loading is true. Built on top of the base shadcn/ui `Button` component.
 */
export function ZapButton({
	children,
	loading,
	loadingText,
	...props
}: ZapButtonProps) {
	if (loading) {
		return (
			<Button {...props} disabled>
				<Loader2 className="animate-spin" size={16} />
				{loadingText || children}
			</Button>
		);
	}

	return <Button {...props}>{children}</Button>;
}
