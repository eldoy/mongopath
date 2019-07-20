const { clear, connection } = require('../setup.jest.js')
let $db

describe('Find', () => {
  beforeAll(async () => $db = await connection())
  beforeEach(clear)

  it('should return an empty array with no data in db', async () => {
    const find = await $db('projects/find')()
    expect(find).toEqual([])
    expect(find.length).toBe(0)
  })

  it('should return a document if it exists in the db', async () => {
    await $db('projects/insert')({ name: 'hello' })
    const find = await $db('projects/find')()
    expect(find.length).toEqual(1)
    expect(find[0].name).toEqual('hello')
  })

  it('should work with fields', async () => {
    const insert = await $db('projects/insert')({ name: 'hello' })
    const find = await $db('projects/find')({}, { fields: { name: 0 }})
    expect(find.length).toEqual(1)
    expect(find[0]._id).toEqual(insert._id)
    expect(find[0].name).toBeUndefined()
  })

  it('should work with sorting', async () => {
    await $db('projects/insert')({ position: 1 })
    await $db('projects/insert')({ position: 2 })
    const find = await $db('projects/find')({}, { sort: { position: -1 }})
    expect(find.length).toEqual(2)
    expect(find[0].position).toBe(2)
    expect(find[1].position).toBe(1)
  })

  it('should work with limit', async () => {
    await $db('projects/insert')()
    await $db('projects/insert')()
    let find = await $db('projects/find')()
    expect(find.length).toEqual(2)
    find = await $db('projects/find')({}, { limit: 1 })
    expect(find.length).toEqual(1)
  })

  it('should work with skip', async () => {
    await $db('projects/insert')()
    await $db('projects/insert')()
    let find = await $db('projects/find')()
    expect(find.length).toEqual(2)
    find = await $db('projects/find')({}, { skip: 1 })
    expect(find.length).toEqual(1)
  })
})
