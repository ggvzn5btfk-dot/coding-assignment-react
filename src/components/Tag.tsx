import type { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export function Tag({ children }: Props) {
	return (
		<span className="rounded-full bg-blue-100 px-2 py-1 text-xs">
			{children}
		</span>
	);
}
