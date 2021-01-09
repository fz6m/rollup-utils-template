const { print, select } = require('./utils')

const execa = require('execa')

const stdio = { stdio: 'inherit' }

const publish = async () => {
  print('[Publish] ---------- publish start ---------- ')

  const versionType = await select(['patch', 'minor', 'major'])

  print(`[Publish: release] ---------- start release ${versionType} ----------`)

  await execa('yarn', ['standard-version', '--release-as', versionType], stdio)

  print(
    `[Publish: release] ---------- package.json automatic commit ----------`
  )
  print(`[Publish: release] ---------- release end ----------`)

  print(`[Publish: build] ---------- build start ----------`)

  await execa('yarn build', stdio)

  print(`[Publish: build] ---------- build end ----------`)
  print(`[Publish: build commit] ---------- automatic commit start ----------`)

  await execa('git add -A', stdio)

  const pkg = require('../package.json')
  await execa('git', ['commit', '-m', `release: version ${pkg.version}`])

  print(`[Publish: build commit] ---------- automatic commit end ----------`)
}

publish()
