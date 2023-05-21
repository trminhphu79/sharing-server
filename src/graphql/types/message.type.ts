export const EXPERIENCE_TYPES = `
    type Experience {
        _id: ID
        companyName: String
        title: String
    }
`

export type TExperienceBody = {
  _id?: string,
  companyName: string,
  title: string
}