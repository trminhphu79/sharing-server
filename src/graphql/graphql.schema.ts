import { buildSchema } from "graphql";
import { EXPERIENCE_TYPES, TExperienceBody } from "./types";
import { EXPERIENCE_QUERY } from "./queries";
import { EXPERIENCE_MUTATION } from "./mutations";
import { getExperience, createExperience, updateExperience } from './resolvers/experience.resolver';
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
  // getExperienceList: async (args: any) => {
  //   const result = await getExperience(args)
  //   return result
  // },

  // getExperience: async (args: any) => {
  //   console.log('...getExperience',)
  //   const result = await getExperience(args)
  //   return result
  // },
  createExperience: async (args: TExperienceBody) => {
    const result = await createExperience(args)
    return result
  }
  // updateExperience: async (args: any) => {
  //   const result = await updateExperience(args)
  //   return result
  // }
}
