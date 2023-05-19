const crypto = require('crypto')

const algorithm = 'aes-256-ctr'
const secretKey = 'c4477bef9bd624c1cf198a0321a3bf4cbcaee98771a315dc0e9222434f4b3da7c3036d913e6114aa46fbc651f86287de5494d97b03342f52f09f83148abaf04e2019a80dc9cf58d459c6b426944798542d20e2a6a1257cabb344fe825b7aa836697c8d56b071d4af51a173c6854c15ac1d9e2fc4d45572944b5a0c93f62f348fb22ef40d93de537fd5f56f407f17d7b62cbe68431e42c1c2d9c9f2816e6368c46b445ca37400081c143153a16e0687435c6b26a757544b7eedb83412fac56b5b732de5feb5f34d8cf1b378fdab5bdd28be2a84c35b422193ba57216025496a503600f5c6d47f3bcdaaccac58aa2d8037e5634aca036472a25eb473f82446bf14'
const iv = crypto.randomBytes(16)

const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv)
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    }
}

const decrypt = (hash) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])
    return decrpyted.toString()
}

module.exports = {
    encrypt,
    decrypt
}
