export const meetupPaths = {
  '/meetups': {
    get: {
      summary: 'Returns the list of meetups',
      tags: ['Meetups'],
      responses: {
        200: {
          description: 'The list of meetups was successfully received',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Meetups'
              }
            }
          }
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/meetup': {
    post: {
      summary: 'Create a new meetup',
      tags: ['Meetups'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Meetup'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Meetup was successfully created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MeetupObject'
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  },
  '/meetup/{id}': {
    get: {
      summary: 'Get the meetup by id',
      tags: ['Meetups'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          shema: {
            type: 'number'
          },
          description: 'Id of the meetup',
          required: true
        }
      ],
      responses: {
        200: {
          description: 'Meetup was successfully received',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MeetupObject'
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Internal server error'
        }
      }
    },
    put: {
      summary: 'Update the meetup by id',
      tags: ['Meetups'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          shema: {
            type: 'number'
          },
          description: 'Id of the meetup',
          required: true
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Meetup'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Meetup was successfully updated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MeetupObject'
              }
            }
          }
        },
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Internal server error'
        }
      }
    },
    delete: {
      summary: 'Delete the meetup by id',
      tags: ['Meetups'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          shema: {
            type: 'number'
          },
          description: 'Id of the meetup'
        }
      ],
      responses: {
        400: {
          description: 'Bad request'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  }
};
