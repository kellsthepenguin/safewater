const { PrismaClient } = require('@prisma/client')
const csv = require('csvtojson')

const prisma = new PrismaClient()
const orgFileName = './data/org.csv'
// todo: product도 추가해야됨
;(async () => {
  const results = await csv().fromFile(orgFileName)
  const organizations = [
    ...new Set(results.map((result) => result['제조업체명'])),
  ]

  Promise.all(
    organizations.map((organization) => {
      return prisma.organization
        .create({
          data: {
            name: organization,
          },
        })
        .catch(() => {})
    })
  ).then(async (organizations) => {
    for (const result of results) {
      const keys = Object.keys(result)
      const values = Object.values(result)

      const organization = organizations.find(
        (organization) => organization.name === result['제조업체명']
      )

      const unsuitableIndexes = []
      for (const [i, value] of values.entries()) {
        console.log(organization)

        if (value.includes('부적합')) {
          await prisma.unsuitableItem.create({
            data: {
              name: keys[i],
              lineName: result['호정명'],
              checkYear: parseInt(result['검사시기(년도)']),
              checkQuarter: result['검사시기(분기-반기)'],
              organizationIdx: organization.idx,
            },
          })
          unsuitableIndexes.push(i)
        }
      }
    }
  })
})()
