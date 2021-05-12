export type Person = {
  results: [{
      gender: String,
      name: {
          title: String,
          first: String,
          last: String
      },
      location: {
          street: {
              number: Number,
              name: String
          },
          city: String,
          state: String,
          country: String,
          postcode: Number,
          coordinates: {
              latitude: Number,
              longitude: Number
          },
          timezone: {
              offset: Number,
              description: String
          }
      },
      email: String,
      login: {
          uuid: String,
          username: String,
          password: String,
          salt: String,
          md5: String,
          sha1: String,
          sha256: String
      },
      dob: {
          date: String,
          age: Number
      },
      registered: {
          date: String,
          age: Number
      },
      phone: String,
      cell: String,
      id: {
          name: String,
          value: String
      },
      picture: {
          large: String,
          medium: String,
          thumbnail: String
      },
      nat: String
  }],
  info: {
      seed: String,
      results: Number,
      page: Number,
      version: Number
  }
}