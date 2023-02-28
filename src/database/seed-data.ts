interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  status: string
  createdAt: number
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Publish website on hosting platform',
      status: 'to-do',
      createdAt: Date.now(),
    },
    {
      description: 'Design logo for website',
      status: 'done',
      createdAt: Date.now() - 1000 * 60 * 10,
    },
    {
      description: 'Develop landing page layout',
      status: 'in-progress',
      createdAt: Date.now() - 1000 * 60 * 5,
    },
  ],
}
