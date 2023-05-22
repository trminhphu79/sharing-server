import { buildSchema } from "graphql";
import { EXPERIENCE_TYPES, TExperienceBody } from "./types";
import { EXPERIENCE_QUERY } from "./queries";
import { EXPERIENCE_MUTATION } from "./mutations";
import { EXPERIENCE_RESOLVER } from './resolvers';
import { EXPERIENCE_INPUT } from "./inputs";

export const schema = buildSchema(`
    ${EXPERIENCE_TYPES}

    type Query {
      ${EXPERIENCE_QUERY}
    }

    type Mutation  {
      ${EXPERIENCE_MUTATION}
    }

    ${EXPERIENCE_INPUT}
`)

export const root = {
  ...EXPERIENCE_RESOLVER
}
