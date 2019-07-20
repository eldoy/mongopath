const { clear, connection } = require('../setup.jest.js')
let $db

describe('Remove', () => {
  beforeAll(async () => $db = await connection())
  beforeEach(clear)

  it('should delete a document', async () => {
    await $db('projects/insert')({ name: 'hello' })
    const remove = await $db('projects/remove')({ name: 'hello' })
    expect(remove.n).toBe(1)
    const first = await $db('projects/get')({ name: 'hello' })
    expect(first).toBeNull()
  })

  it('should delete multiple documents', async () => {
    await $db('projects/insert')({ name: 'hello' })
    await $db('projects/insert')({ name: 'hello' })
    const remove = await $db('projects/remove')({ name: 'hello' })
    expect(remove.n).toBe(2)
    const find = await $db('projects/find')({ name: 'hello' })
    expect(find).toEqual([])
  })
})
