import type { ReactNode } from "react";

interface Props {
	title: string;
	children: ReactNode;
}

export function StatCard({ title, children }: Props) {
	return (
		<div className="rounded-lg bg-gray-100 p-4">
			<h3 className="mb-1 font-medium text-sm">{title}</h3>
			<p className="font-bold text-lg">{children}</p>
		</div>
	);
}
