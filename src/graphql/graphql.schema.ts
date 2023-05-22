import { buildSchema } from "graphql";
import { EXPERIENCE_TYPES, TExperienceBody } from "./types";
import { EXPERIENCE_QUERY } from "./queries";
import { EXPERIENCE_MUTATION } from "./mutations";
import { getExperienceList, getExperience, createExperience, updateExperience, deleteExperience } from './resolvers';
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
  getExperienceList: async (args: any) => {
    const result = await getExperienceList(args)
    return result
  },
  getExperience: async (args: { _id: string }) => {
    const result = await getExperience(args._id)
    return result
  },
  createExperience: async (args: TExperienceBody) => {
    const result = await createExperience(args)
    return result
  },
  updateExperience: async (args: TExperienceBody) => {
    const result = await updateExperience(args)
    return result
  },
  deleteExperience: async (args: TExperienceBody) => {
    const result = await deleteExperience(args)
    return result
  }
}
