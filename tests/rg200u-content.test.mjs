import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
// eslint-disable-next-line test/no-import-node-test -- Use the built-in runner without another test dependency.
import { test } from 'node:test'

const articlePath = 'src/content/posts/rg200u-5g-debug.md'
const read = path => fs.readFileSync(path, 'utf8').replaceAll('\r\n', '\n')
const digest = value => createHash('sha256').update(value.trim()).digest('hex')
const blocks = () => [...read(articlePath).matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map(match => match[1])

// Source docs are local and gitignored; keep their command fingerprints portable.
const deploymentHashes = [
    '2cc2c6a1ea72c657b08d4080b0930339a64c05713f6476c5771162e8184adc67',
    'b73563b1e4c1f7657926759de09a92bd8c65c6da957a38afc0fcdc1c2b31a99b',
    'ca57dd732f9c83be28e6846413ae277896f761b80119acc8a9580e57ba40b782',
    'b67e80aa82027e92c1b03debe68d8fd80e7529c3c509557c4513b124da626413',
    '1b4f90325769ddb4e20b43f0228f9d7e477fa6f782f63ef5a8db76995f8f38eb',
    'd52c5c80adae2fa92cc4b22f9a87d034dedcf9f5a4601d0d75f9f781112aabd9',
    'ca8cb4054e1b070f251a9c33ad19711b1716d15c2c577b9ca8d7ebf2f39493f5',
    'e3fd50d5946f35cd793e7c40839aa5544c1373bbf5191d463475767c8710b753',
    '1f4973d72a2c389a9cba8631e1fd61e51253cab254f401f40f24423ca60aa2f4',
    '282763dc8bad90e485cf207dd8802861f8e29d2128ea4d860aa7457794d13e76',
    'e56f4af81a2a7e8089b93c715b172a1baf181fe2bb5b8cc30bf1f49f3ad5034f',
    '847c28ebab991785a2e9b491ff2eebe4a6c51fa226e24ab6563fbff92b244131',
    'ab71b732ff21b9c83cda7f9c85fd41dcf206c29843f16dd904ba3fb550ac5384',
    'fa52e638aabb8eeb3208fd36770b436d123147eac2a992672c16a2c1ace9f940',
    '5f781c6f72a02f6763ac1f035a912847fe5cd67ed9903d62f635e83e156e0853',
    'ea9753754908aa78aa642a74479f6832be46c9d82da4c18b9a1ab9fc4c834117',
    '901440ef5f74701d1edfd07133c40878e2fb27d82a7e013b50109aa1fbdc3af6',
    '22eaaf42040fab2db4311d8d71b99efbd7ea0a9f8dd69f22d7dfe14554505152',
    'c9cd0a8e3f5613407979dea3b407a5fe488bdc0be8a340d0c120647978c893e5',
    '904f3688b2ed906755be8c4aad7281445cfeeccd5adc560a4dbf2a4fb6bf54c4',
    'eb0e7357c12b81c299ea5735e56770503caf3137730565f0c7cec0526d32bfe4',
    'f91e2c2154d76191367465ddd6d27617e2aa00e4bb7d173d473205798591de34',
]

test('RG200U article retains every deployment command block', () => {
    assert.ok(fs.existsSync(articlePath), 'The agreed RG200U article must exist')
    const actual = new Set(blocks().map(digest))
    for (const expected of deploymentHashes) {
        assert.ok(actual.has(expected), `Missing or changed deployment block: ${expected}`)
    }
})

test('raw notes remain traceable and unique device identifiers are masked', () => {
    assert.ok(fs.existsSync(articlePath), 'The agreed RG200U article must exist')
    const article = read(articlePath)
    assert.ok(blocks().some(block => digest(block) === 'd281cc20fbeede3992936f206054b88376dfba40f37322641064215f390fe239'), 'The complete masked raw notes appendix must remain available')
    assert.ok(!/^\d{15}$/m.test(article), 'Do not expose the original device IMEI')
    assert.match(article, /EC20F.*(?:旧|历史|其他型号)/)
    assert.match(article, /(?:尚未|未)验证/)
})

test('published illustrations do not restore the unmasked source images', () => {
    const originalHashes = {
        'rg200u-5g-cover.png': '430167bec207bfb92bdcc0d1607040325f5a15aabe205bc77f670fcd73b520ce',
        'rg200u-rk3588-ecm-guide.png': '9eb27c6c04801c3590294fdffe9286246bf4be3c2fa8c434a7b3fbe9ba6aec81',
    }
    for (const [name, original] of Object.entries(originalHashes)) {
        const actual = createHash('sha256').update(fs.readFileSync(`src/images/posts/rg200u-5g/${name}`)).digest('hex')
        assert.notEqual(actual, original, `${name} still contains the original device labels; inspect IMEI, SN and QR areas before publishing`)
    }
})
