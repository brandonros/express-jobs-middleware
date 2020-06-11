const fs = require('fs')
const glob = require('glob')
const readline = require('readline')

const doesLinePassFilters = (log, filters) => {
  if (!filters.length) {
    return true
  }
  return filters.every(filter => {
    const { key, operation, value, values } = filter
    if (operation === '==') {
      return log[key] === value
    } else if (operation === '!=') {
      return log[key] !== value
    } else if (operation === '<') {
      return log[key] < value
    } else if (operation === '>') {
      return log[key] > value
    } else if (operation === '<=') {
      return log[key] <= value
    } else if (operation === '>=') {
      return log[key] >= value
    } else if (operation === 'exists') {
      return log[key] !== undefined
    } else if (operation === 'doesNotExist') {
      return log[key] === undefined
    } else if (operation === 'contains') {
      return log[key].indexOf(value) !== -1
    } else if (operation === 'doesNotContain') {
      return log[key].indexOf(value) === -1
    } else if (operation === 'oneOf') {
      return values.some(value => value === log[key])
    } else if (operation === 'notOneOf') {
      return !(values.some(value => value === log[key]))
    } else {
      throw new Error('Unknown operation')
    }
  })
}

const sort = (results, sortKey, sortDirection) => results.sort((a, b) => {
  if (sortDirection === 'asc') {
    if (a[sortKey] < b[sortKey]) {
      return -1
    } else if (a[sortKey] > b[sortKey]) {
      return 1
    }
  } else {
    if (a[sortKey] < b[sortKey]) {
      return 1
    } else if (a[sortKey] > b[sortKey]) {
      return -1
    }
  }
  return 0
})

const searchFile = async (filename, filters) => {
  const stream = fs.createReadStream(filename)
  const interface = readline.createInterface({
    input: stream,
    terminal: false
  })
  let lineNumber = 0
  const results = []
  interface.on('line', (line) => {
    const parsedLine = JSON.parse(line)
    const passes = doesLinePassFilters(parsedLine, filters)
    if (passes) {
      results.push(Object.assign({}, parsedLine, { filename, lineNumber }))
    }
    lineNumber += 1
  })
  await new Promise((resolve) => interface.on('close', resolve))
  return results
}

const run = async (input) => {
  const {
    pattern,
    filters,
    sortKey,
    sortDirection,
    offset,
    limit
  } = input
  let results = []
  const filenames = glob.sync(pattern)
  for (let i = 0; i < filenames.length; ++i) {
    const filename = filenames[i]
    results = results.concat(await searchFile(filename, filters))
  }
  const sortedResults = sort(results, sortKey, sortDirection)
  const slicedResults = results.slice(offset, offset + limit)
  console.log(JSON.stringify({
    results: slicedResults,
    numResults: results.length
  }))
}

if (!process.argv[2]) {
  console.error('usage: run-task input')
  process.exit(1)
}
run(JSON.parse(process.argv[2]))
.then(() => process.exit(0))
.catch((err) => {
  console.error(err.stack)
  process.exit(1)
})
