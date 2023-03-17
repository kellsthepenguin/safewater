import prisma from '@/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query

  if (!query) {
    return res.json({ error: 'query not provided', result: null, ok: false })
  }

  const result = await prisma.product.findMany({
    where: {
      name: {
        contains: query as string,
        mode: 'insensitive',
      },
    },
    include: {
      unsuitableItems: {
        select: {
          idx: true,
          name: true,
          checkYear: true,
          checkQuarter: true,
        },
      },
      organization: {
        select: {
          name: true,
          unsuitableItems: {
            select: {
              idx: true,
              lineName: true,
              name: true,
              checkYear: true,
              checkQuarter: true,
            },
          },
        },
      },
    },
  })

  res.json(result)
}
