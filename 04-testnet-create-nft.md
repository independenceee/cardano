##############1. Check so du vi ##################### cd ~ address=$(cat payment.addr) cardano-cli query utxo --address $address --testnet-magic $CARDANO_NODE_MAGIC

##############2. Export cau hinh ##################### cardano-cli query protocol-parameters --testnet-magic $CARDANO_NODE_MAGIC --out-file protocol.json

##############3. Post picture to IPFS #####################

sign up an account at https://app.pinata.cloud/
ipfs_hash="QmZtoHySkNPrtWDwoXBySZTeujaDA9Uaz5VhggMB4CdK4M"

##############4.tao Policy key pair ##################### mkdir policy cardano-cli address key-gen
--verification-key-file policy/policy.vkey
--signing-key-file policy/policy.skey

##############5.tao file policy/policy.script #####################

policy/policy.script echo "{" >> policy/policy.script echo " "type": "all"," >> policy/policy.script echo " "scripts":" >> policy/policy.script echo " [" >> policy/policy.script echo " {" >> policy/policy.script echo " "type": "before"," >> policy/policy.script echo " "slot": (cardano-cli query tip --testnet-magic $CARDANO_NODE_MAGIC | jq .slot?) + 10000)" >> policy/policy.script echo " }," >> policy/policy.script echo " {" >> policy/policy.script echo " "type": "sig"," >> policy/policy.script echo " "keyHash": "$(cardano-cli address key-hash --payment-verification-key-file policy/policy.vkey)"" >> policy/policy.script echo " }" >> policy/policy.script echo " ]" >> policy/policy.script echo "}" >> policy/policy.script

cardano-cli transaction policyid --script-file ./policy/policy.script > policy/policyID

##############6. khai bao bien NFT ###########

chuyen ten token sang Hexadecimal at https://www.online-toolz.com/tools/text-hex-convertor.php
tokenname1=4445475245453031 tokenname2=4445475245453032

##############7. gan cac bien can thiet ########### cardano-cli query utxo --address $address --testnet-magic $CARDANO_NODE_MAGIC txhash="6970b65532bc39492f4358963386f728c8a84ce6133a9fae80fb5bbdb012d795" txix="0" funds="7633358" policyid=$(cat policy/policyID) output=3551440 slotnumber=80479354 script="policy/policy.script"

##############8. Soan giao dich ########### cardano-cli transaction build
--testnet-magic $CARDANO_NODE_MAGIC
--tx-in $txhash#$txix
--tx-out $address+$output+"1 $policyid.$tokenname1"+"1 $policyid.$tokenname2"+"10000000 c26c547048e95a3ebe5db788967def771fc69025c03e63459a06d905.48414e4f49"
--change-address $address
--mint="1 $policyid.$tokenname1"+"1 $policyid.$tokenname2"
--minting-script-file $script
--metadata-json-file metadata.json
--invalid-hereafter $slotnumber
--witness-override 2
--out-file matx.raw

#############9 Ky giao dich ################### cardano-cli transaction sign
--signing-key-file my_address.skey
--signing-key-file policy/policy.skey
--testnet-magic $CARDANO_NODE_MAGIC
--tx-body-file matx.raw
--out-file matx.signed

#############10. submit giao dich ################### cardano-cli transaction submit --tx-file matx.signed --testnet-magic $CARDANO_NODE_MAGIC

#############11 check NFT ################### Congratulations, we have now successfully minted your NFT. After a couple of seconds, we can check the output address

cardano-cli query utxo --address $MY_ADDRESS --testnet-magic $CARDANO_NODE_MAGIC
View online at https://preprod.cexplorer.io/address/addr_test1vqhxegj29uxvx6gw6yy5ljsf3ly6kss7fs4jjsynpynyvfs5sd6sv/asset#data

metadata

```json
{
  "721": {
    "2ada81ed42a4e591e3b93ef02552b09f32b770ed7f05aabcb55170b8": {
      "NFT-1": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-1",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-2": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-2",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-3": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-3",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-4": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-4",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-5": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-5",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-6": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-6",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-7": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-7",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-8": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-8",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-9": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-9",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-10": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-10",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-11": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-11",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-12": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-12",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-13": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-13",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-14": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-14",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-15": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-15",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-16": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-16",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-17": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-17",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-18": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-18",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-19": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-19",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-20": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-20",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-21": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-21",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-22": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-22",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-23": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-23",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-24": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-24",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-25": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-25",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-26": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-26",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-27": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-27",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-28": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-28",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-29": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-29",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      },
      "NFT-30": {
        "description": "This is an NFT certificate to record your Participation.",
        "name": "WMTViet-Cardano2vn NFT-30",
        "website": "cardano2vn.io",
        "Telegram": "t.me/wmtviet",
        "Telegram": "t.me/cardano2vn",
        "image": "ipfs://QmXisLBU9BRj2N4ujHiME5WQP2PeqbvkxhZQ8mYutFny5g"
      }
    }
  }
}
```
