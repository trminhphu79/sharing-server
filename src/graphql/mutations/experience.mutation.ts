const createExperience = `createExperience(companyName:String!, title:String!): Experience`

const updateExperience = `updateExperience(_id: String!, companyName: String!, title: String!): Experience`

const deleteExperience = `deleteExperience(_id: String): Experience`

export const EXPERIENCE_MUTATION = `
    ${createExperience}
    ${updateExperience}
    ${deleteExperience}
`

