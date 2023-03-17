import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    product: process.env.LAST_DATA_UPDATED_PRODUCT,
    org: process.env.LAST_DATA_UPDATED_ORG,
  })
}
