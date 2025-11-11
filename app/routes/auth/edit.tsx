import type { Route } from "./+types/edit";
import { useAuthFindOne } from "~/hooks/auth-hook";
import Loading from "~/components/Loading";

export async function loader({ params }: Route.LoaderArgs) {
  return params.id;
}

export default function AuthEditPage({ loaderData: id }: Route.ComponentProps) {
  const { data, isLoading } = useAuthFindOne(id);
  if (isLoading) {
    return <Loading fullScreen />;
  }
  return <div>AuthEditPage</div>;
}
