# Mongopath MongoDB Client
The client used the `model/action` syntax. All commands return promises (async functions), so remember to use await. Ids are stored as strings unless overridden.

Each function takes query, values and options arguments depending on the action. Most mongodb options and query parameters are supported.

### Install
`npm i mongopath`

### Usage
```javascript
// Connect to database
const connection = require('mongopath')

// Default options
const db = await connection({ url: 'mongodb://localhost:27017', name: 'mongopath' })

// Insert document
// Returns the inserted id: { _id: '507f191e810c19729de860ea' }
// Takes only 1 argument: query
const result = await db('projects/insert')({ name: 'hello' })

// Update document (updates multiple if query matches)
// Returns the number of updated documents: { n: 1 }
// Takes 2 arguments: query, values
const result = await db('projects/update')({ _id: '507f191e810c19729de860ea' }, { name: 'bye' })

// Remove document (removes multiple if query matches)
// Returns the number of removed documents: { n: 1 }
// Takes 1 argument: query
const result = await db('projects/remove')({ _id: '507f191e810c19729de860ea' })

// Find document
// Returns an array of matching documents
// Takes 2 arguments: query, options
const result = await db('projects/find')({ name: 'bye' })

// Get document
// Returns the first matching document
// Takes 2 arguments: query, options
const result = await db('projects/get')({ name: 'bye' })

// Count documents
// Returns the count of the matching query
// Takes 2 arguments: query, options
const result = await db('projects/count')({ name: 'bye' })
```

The source code and tests contain more examples of use.

MIT Licensed. Enjoy!
