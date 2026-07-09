export default {
  name: 'workExperience',
  title: 'Work Experience',
  // object (not document): this type is embedded inline inside `experiences.works`.
  // v3 requires array-of items to be object types, not documents.
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Desc',
      type: 'string',
    },
  ],
}
