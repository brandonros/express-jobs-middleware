const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

const run = async (input) => {
  await delay(1000 * 60 * 5)
}

if (!process.argv[2]) {
  console.error('usage: run-task input')
  process.exit(1)
}

run(JSON.parse(process.argv[2]))
.then(() => process.exit(0))
.catch((err) => {
  console.err(err.stack)
  process.exit(1)
})
