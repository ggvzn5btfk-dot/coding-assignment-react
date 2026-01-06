export function ErrorScreen() {
	return (
		<div className="flex min-h-screen flex-col justify-center">
			<h3 className="mb-2 text-center font-bold text-red-800">
				Something went wrong
			</h3>
			<button
				type="button"
				onClick={() => window.location.reload()}
				className="rounded-lg bg-red-600 px-4 py-2 text-white"
			>
				Try Again
			</button>
		</div>
	);
}
