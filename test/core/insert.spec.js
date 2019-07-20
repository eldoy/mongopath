const { clear, connection } = require('../setup.jest.js')
let $db

describe('Insert', () => {
  beforeAll(async () => $db = await connection())
  beforeEach(clear)

  // Test that we can insert a document
  it('should insert a document', async () => {
    const insert = await $db('projects/insert')({ name: 'hello'})
    expect(insert._id).toBeDefined()
    expect(typeof insert._id).toEqual('string')
    expect(insert._id.length).toBe(24)
  })

  // Test that date is saved as a date object
  it('should save a date as a date object', async () => {
    const date = new Date()
    const insert = await $db('projects/insert')({ date })
    expect(insert._id).toBeDefined()
    const get = await $db('projects/get')({ _id: insert._id })
    expect(typeof get.date).toBe('object')
    expect(get.date.constructor === Date).toBe(true)
  })
})
