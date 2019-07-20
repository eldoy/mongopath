const { clear, connection } = require('../setup.jest.js')
let $db

describe('Update', () => {
  beforeAll(async () => $db = await connection())
  beforeEach(clear)

  it('should update a document', async () => {
    await $db('projects/insert')({ name: 'hello' })
    const update = await $db('projects/update')(
      { name: 'hello' }, { name: 'bye' }
    )
    expect(update.n).toBe(1)
    const first = await $db('projects/get')()
    expect(first.name).toEqual('bye')
  })

  it('should update multiple documents', async () => {
    await $db('projects/insert')({ name: 'hello' })
    await $db('projects/insert')({ name: 'hello' })
    const update = await $db('projects/update')(
      { name: 'hello' }, { name: 'bye' }
    )
    expect(update.n).toBe(2)
    const find = await $db('projects/find')()
    expect(find[0].name).toEqual('bye')
    expect(find[1].name).toEqual('bye')
  })
})
