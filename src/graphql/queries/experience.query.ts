const experienceList = `getExperienceList(companyName:String, title:String): [Experience]`

const experience = `getExperience(_id: String!): Experience`

export const EXPERIENCE_QUERY = `
    ${experienceList}
    ${experience}
`

