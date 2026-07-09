export default {
    name: 'works',
    title: 'Works',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
    
      {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'projectLink',
        title: 'Project Link',
        type: 'string',
      },
      {
        name: 'codeLink',
        title: 'Code Link',
        type: 'string',
      },
      {
        name: 'imgUrl',
        title: 'ImageUrl',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
   
      {
        name: 'tags',
        title: 'Tags',
        description: 'Pick one or more categories — these drive the filter buttons on the site.',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          list: [
            { title: 'Blockchain', value: 'Blockchain' },
            { title: 'Developer Tools', value: 'Developer Tools' },
            { title: 'AI', value: 'AI' },
            { title: 'Community', value: 'Community' },
            { title: 'Content', value: 'Content' },
          ],
        },
      },
     
    ],
  };