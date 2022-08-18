export const Meetup = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
      description: 'Meetup title',
      required: true
    },
    description: {
      type: 'string',
      description: 'Meetup description'
    },
    tags: {
      type: 'array',
      description: 'Meetup tags',
      items: {
        type: 'string'
      }
    },
    date: {
      type: 'string',
      format: 'date',
      description: 'Meetup date',
      required: true
    },
    location: {
      type: 'string',
      description: 'Meetup location',
      required: true
    },
  },
  example: {
    title: 'Docker features',
    description: 'Explanation of Docker features',
    tags: ['docker', 'it'],
    date: '2022-11-12, 15:00',
    location: 'Kirova st., 123/2, Gomel'
  }
};

export const MeetupObject = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      description: 'Auto-generated meetup id',
    }
  },
  allOf: [{ $ref: '#components/schemas/Meetup' }],
  example: {
    id: 1,
    title: 'Docker features',
    description: 'Explanation of Docker features',
    tags: ['docker', 'it'],
    date: '2022-11-12, 15:00',
    location: 'Kirova st., 123/2, Gomel'
  }
};

export const Meetups = {
  type: 'array',
  items: {
    $ref: '#/components/schemas/MeetupObject',
  }
};
