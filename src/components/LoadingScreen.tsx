export function LoadingScreen() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
				<div className="animate-pulse">
					<div className="mb-4 h-64 rounded-xl bg-gray-200"></div>
					<div className="mb-2 h-8 rounded bg-gray-200"></div>
					<div className="mb-2 h-4 rounded bg-gray-200"></div>
					<div className="h-4 w-3/4 rounded bg-gray-200"></div>
				</div>
			</div>
		</div>
	);
}
