export default {
  name: 'events',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      description: 'Drives the filter tabs in the Speaking & Community section',
      type: 'string',
      options: {
        list: [
          { title: 'Talk', value: 'talk' },
          { title: 'Event', value: 'event' },
          { title: 'Hackathon', value: 'hackathon' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'role',
      title: 'Role',
      description: 'e.g. Speaker, Organizer, Mentor',
      type: 'string',
    },
    {
      name: 'eventName',
      title: 'Event Name',
      description: 'Host conference / meetup / hackathon',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'link',
      title: 'Link',
      description: 'Recording, slides, or event page',
      type: 'url',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
  ],
}
