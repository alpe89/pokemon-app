import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection, slice } from "../functions";
import { Connection } from "../types";
import Pokemon from "./Ipokemon";

export function query(args: {
  type?: string;
}): Connection<Pokemon> {
  // Get the requested type from query parameters
  const { type } = args;
  const limit = 10;

  const capitalizeType = (type: string): string => type.charAt(0).toUpperCase() + type.slice(1);

  const filterPokemonsByType: (as: Pokemon[]) => Pokemon[] =
    type === undefined
      ? identity
      : A.filter(pokemon => pokemon.types.includes(capitalizeType(type)));

  const results: Pokemon[] = pipe(
    data,
    filterPokemonsByType,
    slice(0, limit + 1)
  );

  return toConnection(results, limit);
};