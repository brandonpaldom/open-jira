import { db } from '@/database'
import { Entry, EntryInterface } from '@/models'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string } | EntryInterface

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: `Invalid id: ${id}` })
  }
  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res)
    case 'GET':
      return getEntry(req, res)
    default:
      return res.status(400).json({ message: 'Method not allowed' })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  await db.connect()
  const entryToUpdate = await Entry.findById(id)
  if (!entryToUpdate) {
    await db.disconnect()
    return res.status(404).json({ message: `Entry not found: ${id}` })
  }
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { new: true, runValidators: true }
    )
    await db.disconnect()
    return res.status(200).json(updatedEntry!)
  } catch (error: any) {
    await db.disconnect()
    console.log(error)
    return res.status(400).json({ message: error.message })
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query
  await db.connect()
  const entryInDB = await Entry.findById(id)

  if (!entryInDB) {
    await db.disconnect()

    return res.status(404).json({ message: `Entry not found: ${id}` })
  }

  return res.status(200).json(entryInDB)
}
