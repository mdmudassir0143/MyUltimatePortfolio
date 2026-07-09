export default {
  name: 'stats',
  title: 'Stats',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
    },
    {
      name: 'value',
      title: 'Value',
      description: 'Numeric target the counter animates up to (e.g. 10000)',
      type: 'number',
    },
    {
      name: 'suffix',
      title: 'Suffix',
      description: 'Shown after the number, e.g. "+" or "k+"',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
