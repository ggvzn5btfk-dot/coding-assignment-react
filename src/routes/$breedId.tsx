import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$breedId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$breedId"!</div>
}
