const { PrismaClient } = require('@prisma/client')
const csv = require('csvtojson')

const prisma = new PrismaClient()
const productFileName = './data/product.csv'

;(async () => {
  const results = await csv().fromFile(productFileName)
  const products = [
    ...new Set(results.map((result) => [result['제품명'], result['업체명']])),
  ]

  Promise.all(
    products.map(async ([productName, organizationName]) => {
      const organization = await prisma.organization.findUnique({
        where: {
          name: organizationName,
        },
      })

      return prisma.product
        .create({
          data: {
            name: productName,
            organizationIdx: organization ? organization.idx : null,
          },
        })
        .catch(() => {})
    })
  ).then(async (products) => {
    for (const result of results) {
      const keys = Object.keys(result)
      const values = Object.values(result)

      const product = products.find(
        (product) => (product ? product.name : null) === result['제품명']
      )

      for (const [i, value] of values.entries()) {
        if (value.includes('부적합')) {
          await prisma.unsuitableItem.create({
            data: {
              name: keys[i],
              checkYear: parseInt(result['검사시기(년도)']),
              checkQuarter: result['검사시기(분기-반기)'],
              productIdx: product.idx,
            },
          })
        }
      }
    }
  })
})()
