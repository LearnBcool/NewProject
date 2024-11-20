# -*- coding: utf-8 -*-

from mnemonic import Mnemonic
from bitcoinlib.keys import HDKey

# Gerar uma seed BIP39 usando 128 bits de entropia
mnemo = Mnemonic("english")
seed_phrase = mnemo.generate(strength=128)
print("Seed Phrase:", seed_phrase)

# Gerar chave HD a partir da seed
seed = mnemo.to_seed(seed_phrase)
key = HDKey.from_seed(seed, network='bitcoin')

# Exibir chave privada, chave publica e endereco
print("Chave Privada:", key.private_hex)
print("Chave Publica:", key.public_hex)
print("Endereco Bitcoin:", key.address())
