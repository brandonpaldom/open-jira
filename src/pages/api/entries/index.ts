import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database'
import { Entry, EntryInterface } from '@/models'

type Data = { message: string } | EntryInterface[] | EntryInterface

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getEntries(res)
    case 'POST':
      return createEntry(req, res)
    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect()
  const entries = await Entry.find().sort({ createdAt: 'ascending' })
  await db.disconnect()

  res.status(200).json(entries)
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = '' } = req.body
  const newEntry = new Entry({ description, createdAt: Date.now() })

  try {
    await db.connect()
    await newEntry.save()
    await db.disconnect()

    return res.status(201).json(newEntry)
  } catch (error) {
    await db.disconnect()
    console.log(error)

    return res.status(500).json({ message: 'Internal server error' })
  }
}
