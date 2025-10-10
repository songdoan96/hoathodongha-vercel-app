import TvComponent from "~/components/Line/TvComponent";
import { linesList } from "~/lib/variables";
// import type { Route } from "./+types/tv-info";
import type { Route } from "./+types/tv-info";

export async function loader({ params: { line } }: Route.LoaderArgs) {
  return line;
}

export function meta({ params: { line } }: Route.MetaArgs) {
  return [
    { title: "TV " + (linesList.find((l) => l.value === line)?.name || "") },
    { name: "description", content: "TV " + (linesList.find((l) => l.value === line)?.name || "") },
  ];
}

export default function ProduceTVInfoPage({ loaderData: line }: Route.ComponentProps) {
  if (!line) return null;
  return <TvComponent line={line} />;
}
