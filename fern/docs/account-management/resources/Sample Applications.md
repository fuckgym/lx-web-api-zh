# 申请示例

### 个人

## 个人 | 美国 | 完整集成

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "salutation": "Mr.",
              "first": "John",
              "last": "Does",
              "middle": "F"
            },
            "dateOfBirth": "1990-01-25",
            "countryOfBirth": "USA",
            "maritalStatus": "M",
            "numDependents": 0,
            "residenceAddress": {
              "street1": "1 Tester Street",
              "city": "Test City",
              "state": "CT",
              "country": "United States",
              "postalCode": "85755"
            },
            "phones": [
              {
                "type": "Mobile",
                "number": "2034228988",
                "country": "United States",
                "verified": false
              }
            ],
            "email": "test@gmail.com.com",
            "identification": {
              "citizenship": "United States",
              "ssn": "11223399",
              "issuingCountry": "USA",
              "legalResidenceCountry": "USA",
              "legalResidenceState": "AZ",
              "expire": false
            },
            "employmentType": "EMPLOYED",
            "employmentDetails": {
              "employer": "Test Employer Name Here",
              "occupation": "Analyst",
              "employerBusiness": "Computer/Information Technology",
              "employerAddress": {
                "street1": "22 Tester Road",
                "city": "Test City",
                "state": "CT",
                "country": "USA",
                "postalCode": "93929"
              }
            },
            "taxResidencies": [
              {
                "country": "United States",
                "tin": "11223399",
                "tinType": "SSN"
              }
            ],
            "w9": {
              "name": "John F Does",
              "customerType": "Individual",
              "tin": "11223399",
              "tinType": "SSN",
              "cert1": true,
              "cert2": true,
              "cert3": true,
              "cert4": true,
              "signatureType": "Electronic",
              "blankForm": true,
              "taxFormFile": "Form5002.pdf",
              "proprietaryFormNumber": 5002
            },
            "externalId": "testexternalId1234AH",
            "sameMailAddress": true,
            "ownershipPercentage": 100,
            "titles": [
              {
                "code": "Account Holder"
              }
            ],
            "authorizedPerson": false
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "BOND",
                "yearsTrading": 0,
                "tradesPerYear": 0,
                "knowledgeLevel": "Limited"
              },
              {
                "assetClass": "FUND",
                "yearsTrading": 4,
                "tradesPerYear": 5,
                "knowledgeLevel": "Good"
              },
              {
                "assetClass": "OPT",
                "yearsTrading": 0,
                "tradesPerYear": 0,
                "knowledgeLevel": "None"
              },
              {
                "assetClass": "STK",
                "yearsTrading": 7,
                "tradesPerYear": 5,
                "knowledgeLevel": "Good"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 100,
                "usedForFunds": true
              }
            ],
            "netWorth": 750000,
            "liquidNetWorth": 375000,
            "annualNetIncome": 75000,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "testexternalId1234",
      "type": "INDIVIDUAL",
      "prefix": "tess",
      "email": "test@gmail.com.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Growth",
          "Trading",
          "Hedging"
        ],
        "tradingPermissions": [
          {
            "country": "UNITED STATES",
            "product": "OPTIONS"
          },
          {
            "country": "UNITED STATES",
            "product": "STOCKS"
          },
          {
            "country": "UNITED STATES",
            "product": "MUTUAL FUNDS"
          },
          {
            "country": "UNITED STATES",
            "product": "BONDS"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE",
          "chargeAdvisor": false,
          "chargeOtherFeesToAdvisor": false
        },
        "externalId": "testexternalId1234",
        "baseCurrency": "USD",
        "multiCurrency": true,
        "margin": "RegT",
        "stockYieldProgram": true,
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "testexternalId1234USR",
        "externalIndividualId": "testexternalId1234AH",
        "prefix": "tess"
      }
    ],
    "documents": [
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form5002.pdf",
          "fileLength": 119331,
          "sha1Checksum": "06c13ef0c01e831c1b9f0c2c0550812a4c242b3a"
        },
        "formNumber": 5002,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436,
   	"payload": {
          "mimeType": "application/pdf",
          "data": pm.collectionVariables.get('form5002')
        }
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form1005.pdf",
          "fileLength": 170163,
          "sha1Checksum": "76bd4f17da8c8ed0d9ff752b5ffc0a1e38c16bd1"
        },
        "formNumber": 1005,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form2109.pdf",
          "fileLength": 15697,
          "sha1Checksum": "bf01d3c5b2b7bc6ca90a4051636051a828fd735f"
        },
        "formNumber": 2109,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form2192.pdf",
          "fileLength": 280855,
          "sha1Checksum": "53b136320042b76d0e589252c637dbd6ec88eef2"
        },
        "formNumber": 2192,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3024.pdf",
          "fileLength": 407487,
          "sha1Checksum": "e6a7f178e9aae1fdebe469365f24c49fa6ae04cd"
        },
        "formNumber": 3024,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3044.pdf",
          "fileLength": 564118,
          "sha1Checksum": "ccb239208b4d467ceaf79149274330497af4fb77"
        },
        "formNumber": 3044,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3070.pdf",
          "fileLength": 58156,
          "sha1Checksum": "97346bbb84c99e367fc66cfdf15c1e597af6d07c"
        },
        "formNumber": 3070,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3071.pdf",
          "fileLength": 71516,
          "sha1Checksum": "bea92f0a1f38607789ae6a62ff52e452d4c93a55"
        },
        "formNumber": 3071,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3074.pdf",
          "fileLength": 73340,
          "sha1Checksum": "3ec3e989d28f650bd6db3fab01327d90636acc31"
        },
        "formNumber": 3074,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3077.pdf",
          "fileLength": 214857,
          "sha1Checksum": "45bcf44bb66f4ef2d33d6bce1a567fd324998de6"
        },
        "formNumber": 3077,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3094.pdf",
          "fileLength": 216002,
          "sha1Checksum": "7aedd4e80e10ccaf6224bbe77e42f59d82aa1d3f"
        },
        "formNumber": 3094,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3230.pdf",
          "fileLength": 32483,
          "sha1Checksum": "294716d58d530fcc8da37074341b35f1850e12fa"
        },
        "formNumber": 3230,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4009.pdf",
          "fileLength": 60572,
          "sha1Checksum": "e5cc3f40464a25125b5095e6e66d0b3ffb65cdf5"
        },
        "formNumber": 4009,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4016.pdf",
          "fileLength": 39738,
          "sha1Checksum": "352edc6e973041c07b979819aec723d79b5fb6d1"
        },
        "formNumber": 4016,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4035.pdf",
          "fileLength": 160290,
          "sha1Checksum": "159b6fe0857275100f126a4df441e260ea6bb7f6"
        },
        "formNumber": 4035,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4036.pdf",
          "fileLength": 221862,
          "sha1Checksum": "6dee3536015318203ba52b63c49519c96874354d"
        },
        "formNumber": 4036,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form6112.pdf",
          "fileLength": 61662,
          "sha1Checksum": "169ce3381a61df47eb5e56a9d5a704714ee62e29"
        },
        "formNumber": 6112,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form6108.pdf",
          "fileLength": 72598,
          "sha1Checksum": "4bc30e9ff855dea9a957099507410a46f0eb6259"
        },
        "formNumber": 6108,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form9130.pdf",
          "fileLength": 163891,
          "sha1Checksum": "6636769fe45ab48908880cf29293bfb77b488767"
        },
        "formNumber": 9130,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form9490.pdf",
          "fileLength": 35089,
          "sha1Checksum": "2510e965d006011d1212f01fdf6fd7441013cd44"
        },
        "formNumber": 9490,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3076.pdf",
          "fileLength": 159700,
          "sha1Checksum": "3dd9aeb41d4166f6869d60a82af62b9e6b6338ff"
        },
        "formNumber": 3076,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4003.pdf",
          "fileLength": 93003,
          "sha1Checksum": "34787dd4cfbe2ba879776e6d4b4ed64c385acd91"
        },
        "formNumber": 4003,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form5013.pdf",
          "fileLength": 221029,
          "sha1Checksum": "4d695bbfc4c57fc7f4f639aa941e5aca1d32aa78"
        },
        "formNumber": 5013,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4059.pdf",
          "fileLength": 89346,
          "sha1Checksum": "c049df38c0eeee83f9a8c0f1126dcadf67cb25d8"
        },
        "formNumber": 4059,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4060.pdf",
          "fileLength": 111000,
          "sha1Checksum": "0f4a3cffc129fe370e803498c384a12a795bceaf"
        },
        "formNumber": 4060,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form6109.pdf",
          "fileLength": 56646,
          "sha1Checksum": "3bf0373691372865236830ff2e9dffe7600cf5e0"
        },
        "formNumber": 6109,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3089.pdf",
          "fileLength": 96294,
          "sha1Checksum": "4277e88904d8787339f000eb51566bad50c33076"
        },
        "formNumber": 3089,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3203.pdf",
          "fileLength": 241316,
          "sha1Checksum": "7793a2d7b990a5a3f6fd2b53f3ee7c1fc0bb359e"
        },
        "formNumber": 3203,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4024.pdf",
          "fileLength": 413238,
          "sha1Checksum": "0e615e51d2fa872b32373e944d24efc346421870"
        },
        "formNumber": 4024,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3081.pdf",
          "fileLength": 162236,
          "sha1Checksum": "5c9acb8e87c208df1995f0010781427ebb4f86ad"
        },
        "formNumber": 3081,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4010.pdf",
          "fileLength": 169702,
          "sha1Checksum": "62cc5de4255b429e54670ccc51672a2ea13a5abd"
        },
        "formNumber": 4010,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4215.pdf",
          "fileLength": 154627,
          "sha1Checksum": "82479c2070dbfaf17fe779c66bc5bf860c71a72e"
        },
        "formNumber": 4215,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4216.pdf",
          "fileLength": 95119,
          "sha1Checksum": "4f38a83cf86f394fbf8cde70d86a4fd687427309"
        },
        "formNumber": 4216,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4217.pdf",
          "fileLength": 93742,
          "sha1Checksum": "ecc23717af234613df14bce91703ed99ffe5b3b7"
        },
        "formNumber": 4217,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4212.pdf",
          "fileLength": 509033,
          "sha1Checksum": "9b7d10ed4023b31139163e1cbcfa4a1b5b54df03"
        },
        "formNumber": 4212,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4304.pdf",
          "fileLength": 391481,
          "sha1Checksum": "70a2a2806fa76aae2881da353966ace24bb8ffb2"
        },
        "formNumber": 4304,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4404.pdf",
          "fileLength": 20547,
          "sha1Checksum": "1ce663d10512d4a85d25fad12734c36e496c5f1d"
        },
        "formNumber": 4404,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4402.pdf",
          "fileLength": 32359,
          "sha1Checksum": "24509dd479c1b551e544d1cd24de7b15c139286e"
        },
        "formNumber": 4402,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3354.pdf",
          "fileLength": 415582,
          "sha1Checksum": "b6d27e47b233d053115904d497577b9999d12afc"
        },
        "formNumber": 3354,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4399.pdf",
          "fileLength": 65693,
          "sha1Checksum": "4dadfe7ac41ae2463a4d2c3164e559ee8ba1cf65"
        },
        "formNumber": 4399,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4587.pdf",
          "fileLength": 307426,
          "sha1Checksum": "17d109a79a3024243c6cf578d988d43cff31a51b"
        },
        "formNumber": 4587,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      }
    ],
    "translation": false
  }
}
```

## 个人 | 美国 | 混合 - 最少信息

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "John",
              "last": "Smith",
            },
            "residenceAddress": {
              "country": "United States"
            },
            "phones": [
            ],
            "email": "tester@gmail.com",
    
            "externalId": "TestIndividual1234AH",
            "titles": [
              {
                "code": "Account Holder"
              }
            ],
          }
        ],
       
      },
      "externalId": "TestIndividual1234",
      "type": "INDIVIDUAL",
      "prefix": "ibkrte",
      "email": "tester@gmail.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "tradingPermissions": [
          {
            "exchangeGroup": "US-Sec"
          }
        ],
"advisorWrapFees": { 
"strategy": "NO_FEE",         
},    
        "externalId": "TestIndividual1234",
        "baseCurrency": "USD",
        "multiCurrency": true
      }
    ],
    "users": [
      {
        "externalUserId": "TestIndividual1234USR",
        "externalIndividualId": "TestIndividual1234AH",
        "prefix": "ibkrte"
      }
    ],
  }
}
```

## 个人 | 美国 | 混合 - 全部信息

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "salutation": "Mr.",
              "first": "John",
              "last": "Smith",
              "middle": "F"
            },
            "dateOfBirth": "1948-07-25",
            "countryOfBirth": "USA",
            "maritalStatus": "D",
            "numDependents": 0,
            "residenceAddress": {
              "street1": "1 Tester Streer",
              "city": "Tester City",
              "state": "AZ",
              "country": "United States",
              "postalCode": "85755"
            },
            "phones": [
              {
                "type": "Mobile",
                "number": "2034228988",
                "country": "United States",
                "verified": false
              }
            ],
            "email": "tester@gmail.com",
            "identification": {
              "citizenship": "United States",
              "ssn": "132112233",
              "issuingCountry": "USA",
              "expire": false
            },
            "employmentType": "RETIRED",
            "taxResidencies": [
              {
                "country": "United States",
                "tin": "132112233",
                "tinType": "SSN"
              }
            ],
            "w9": {
              "name": "John F Smith",
              "customerType": "Individual",
              "tin": "132112233",
              "tinType": "SSN",
              "cert1": true,
              "cert2": true,
              "cert3": true,
              "cert4": true
            },
            "externalId": "TestIndividual1234AH",
            "sameMailAddress": true,
            "ownershipPercentage": 100,
            "titles": [
              {
                "code": "Account Holder"
              }
            ],
            "authorizedPerson": false
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "BOND",
                "yearsTrading": 0,
                "tradesPerYear": 0,
                "knowledgeLevel": "Limited"
              },
              {
                "assetClass": "FUND",
                "yearsTrading": 4,
                "tradesPerYear": 5,
                "knowledgeLevel": "Good"
              },
              {
                "assetClass": "OPT",
                "yearsTrading": 0,
                "tradesPerYear": 0,
                "knowledgeLevel": "None"
              },
              {
                "assetClass": "STK",
                "yearsTrading": 7,
                "tradesPerYear": 5,
                "knowledgeLevel": "Good"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Pension",
                "percentage": 100,
                "usedForFunds": true,
                "description": "None"
              }
            ],
            "soiQuestionnaire": {
              "details": "Pension"
            },
            "netWorth": 750000,
            "liquidNetWorth": 375000,
            "annualNetIncome": 75000,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "TestIndividual1234",
      "type": "INDIVIDUAL",
      "prefix": "ibkrte",
      "email": "tester@gmail.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Growth",
          "Trading",
          "Hedging"
        ],
        "tradingPermissions": [
          {
            "exchangeGroup": "US-Sec"
          },
          {
            "exchangeGroup": "US-BOND"
          },
          {
            "exchangeGroup": "US-MUNIES"
          },
          {
            "exchangeGroup": "US-Funds"
          },
          {
            "exchangeGroup": "US-Penny"
          },
          {
            "exchangeGroup": "US-SecOpt"
          }
        ],
"advisorWrapFees": { 
"strategy": "NO_FEE",         
},    
        "externalId": "TestIndividual1234",
        "baseCurrency": "USD",
        "multiCurrency": true,
        "margin": "RegT",
        "ira": false,
        "stockYieldProgram": true,
        "drip": false,
        "limitedOptions": false
      }
    ],
    "users": [
      {
        "externalUserId": "TestIndividual1234USR",
        "externalIndividualId": "TestIndividual1234AH",
        "prefix": "ibkrte"
      }
    ],

    "translation": false  }
}
```

## 个人 | 澳大利亚 | 混合 - 全部信息

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "salutation": "Mr.",
              "first": "Jane",
              "last": "Tester",
              "middle": "F"
            },
            "dateOfBirth": "1948-07-25",
            "countryOfBirth": "AUS",
            "maritalStatus": "D",
            "numDependents": 0,
            "residenceAddress": {
              "street1": "1 tester Street",
              "city": "ORO VALLEY",
              "state": "AU-QLD",
              "country": "AUS",
              "postalCode": "85755"
            },
            "phones": [
              {
                "type": "Mobile",
                "number": "+61292662000",
                "country": "AUS",
              }
            ],
            "email": "tester@gmail.com",
            "identification": {
            "citizenship": "AUS", 
            "driversLicense": "989444798", 
            "issuingCountry": "AUS", 
            "expire": true, 
            "expirationDate": 
            "2029-03-22", 
            "rta":"9999999", 
            "issuingState":"AU-QLD"
            },
            "employmentType": "RETIRED",
            "taxResidencies": [
              {
                "country": "AUS",
                "tin": "132121212",
                "tinType": "NonUS_NationalId"
              }
            ],
            "externalId": "TestIndividual20250922",
            "sameMailAddress": true,
            "ownershipPercentage": 100,
            "titles": [
              {
                "code": "Account Holder"
              }
            ],
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 7,
                "tradesPerYear": 5,
                "knowledgeLevel": "Good"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Pension",
                "percentage": 100,
                "usedForFunds": true,
                "description": "None"
              }
            ],
            "soiQuestionnaire": {
              "details": "Pension"
            },
            "netWorth": 750000,
            "liquidNetWorth": 375000,
            "annualNetIncome": 75000
}
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "CONTROLLER",
                "status": false
              },
              {
                "code": "POLITICALMILITARYDIPLOMATIC",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "TestIndividual20250922",
      "type": "INDIVIDUAL",
      "prefix": "lewipg",
      "email": "tester@gmail.com",
      "mdStatusNonPro": false
      },
    "accounts": [
      {
        "investmentObjectives": [
          "Growth",
          "Trading",
          "Hedging"
        ],
        "tradingPermissions": [
          {
            "exchangeGroup": "US-Sec"
          },
        ],
        "externalId": "TestIndividual20250922",
        "baseCurrency": "AUD",
        "multiCurrency": true,
        "accountType":"Trading",
        "margin": "Cash",
        "stockYieldProgram": true,
        "drip": false,
      }
    ],
    "users": [
      {
        "externalUserId": "TestIndividual20250922",
        "externalIndividualId": "TestIndividual20250922",
        "prefix": "lewipg"
      }
    ],
    "documents": [],
    "translation": false,
    "paperAccount": false
  }
}
```

## 个人 | 澳大利亚 | 完整集成

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "salutation": "Mr.",
              "first": "John",
              "last": "Does",
              "middle": "F"
            },
            "dateOfBirth": "1990-01-25",
            "countryOfBirth": "AUS",
            "maritalStatus": "M",
            "numDependents": 0,
            "residenceAddress": {
              "street1": "1 Tester Street",
              "city": "Test City",
              "state": "AU-QLD",
              "country": "AUS",
              "postalCode": "85755"
            },
            "phones": [
              {
                "type": "Mobile",
                "number": "2034228988",
                "country": "AUS",
                "verified": false
              }
            ],
            "email": "test@gmail.com.com",
            "identification": {"citizenship": "AUS", "driversLicense": "989444798", "issuingCountry": "AUS", "expire": true, "expirationDate": "2029-03-22", "rta":"9999999", "issuingState":"AU-QLD"},

            "employmentType": "EMPLOYED",
            "employmentDetails": {
              "employer": "Test Employer Name Here",
              "occupation": "Analyst",
              "employerBusiness": "Computer/Information Technology",
              "employerAddress": {
                "street1": "22 Tester Road",
                "city": "Test City",
                "state": "AU-QLD",
                "country": "AUS",
                "postalCode": "93929"
              }
            },
            "taxResidencies": [
              {
                "country": "AUS",
                "tin": "11223399",
                "tinType": "NonUS_NationalId"
              }
            ],
  "w8Ben": {
"name": "John Smith",
"foreignTaxId": "11223399",
"tinOrExplanationRequired": true,
"part29ACountry": "AUS",
"cert": true,
"blankForm": true,
"taxFormFile": "Form5001.pdf",
"proprietaryFormNumber": 5001,
"electronicFormat": true
}
            "externalId": "testexternalId1234AH",
            "sameMailAddress": true,
            "ownershipPercentage": 100,
            "titles": [
              {
                "code": "Account Holder"
              }
            ],
            "authorizedPerson": false
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "BOND",
                "yearsTrading": 0,
                "tradesPerYear": 0,
                "knowledgeLevel": "Limited"
              },
              {
                "assetClass": "FUND",
                "yearsTrading": 4,
                "tradesPerYear": 5,
                "knowledgeLevel": "Good"
              },
              {
                "assetClass": "OPT",
                "yearsTrading": 0,
                "tradesPerYear": 0,
                "knowledgeLevel": "None"
              },
              {
                "assetClass": "STK",
                "yearsTrading": 7,
                "tradesPerYear": 5,
                "knowledgeLevel": "Good"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 100,
                "usedForFunds": true
              }
            ],
            "netWorth": 750000,
            "liquidNetWorth": 375000,
            "annualNetIncome": 75000,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "testexternalId1234",
      "type": "INDIVIDUAL",
      "prefix": "tess",
      "email": "test@gmail.com.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Growth",
          "Trading",
          "Hedging"
        ],
        "tradingPermissions": [
          {
            "country": "UNITED STATES",
            "product": "OPTIONS"
          },
          {
            "country": "UNITED STATES",
            "product": "STOCKS"
          },
          {
            "country": "UNITED STATES",
            "product": "MUTUAL FUNDS"
          },
          {
            "country": "UNITED STATES",
            "product": "BONDS"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE",
          "chargeAdvisor": false,
          "chargeOtherFeesToAdvisor": false
        },
        "externalId": "testexternalId1234",
        "baseCurrency": "USD",
        "multiCurrency": true,
        "margin": "Cash",
       "accountType":"Trading",
        "stockYieldProgram": true,
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "testexternalId1234USR",
        "externalIndividualId": "testexternalId1234AH",
        "prefix": "tess"
      }
    ],
    "documents": [
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form5001.pdf",
          "fileLength": 119331,
          "sha1Checksum": "06c13ef0c01e831c1b9f0c2c0550812a4c242b3a"
        },
        "formNumber": 5001,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436,
   	"payload": {
          "mimeType": "application/pdf",
          "data": pm.collectionVariables.get('form5001')
        }
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form1005.pdf",
          "fileLength": 170163,
          "sha1Checksum": "76bd4f17da8c8ed0d9ff752b5ffc0a1e38c16bd1"
        },
        "formNumber": 1005,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form2109.pdf",
          "fileLength": 15697,
          "sha1Checksum": "bf01d3c5b2b7bc6ca90a4051636051a828fd735f"
        },
        "formNumber": 2109,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form2192.pdf",
          "fileLength": 280855,
          "sha1Checksum": "53b136320042b76d0e589252c637dbd6ec88eef2"
        },
        "formNumber": 2192,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3024.pdf",
          "fileLength": 407487,
          "sha1Checksum": "e6a7f178e9aae1fdebe469365f24c49fa6ae04cd"
        },
        "formNumber": 3024,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3044.pdf",
          "fileLength": 564118,
          "sha1Checksum": "ccb239208b4d467ceaf79149274330497af4fb77"
        },
        "formNumber": 3044,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3070.pdf",
          "fileLength": 58156,
          "sha1Checksum": "97346bbb84c99e367fc66cfdf15c1e597af6d07c"
        },
        "formNumber": 3070,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3071.pdf",
          "fileLength": 71516,
          "sha1Checksum": "bea92f0a1f38607789ae6a62ff52e452d4c93a55"
        },
        "formNumber": 3071,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3074.pdf",
          "fileLength": 73340,
          "sha1Checksum": "3ec3e989d28f650bd6db3fab01327d90636acc31"
        },
        "formNumber": 3074,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3077.pdf",
          "fileLength": 214857,
          "sha1Checksum": "45bcf44bb66f4ef2d33d6bce1a567fd324998de6"
        },
        "formNumber": 3077,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3094.pdf",
          "fileLength": 216002,
          "sha1Checksum": "7aedd4e80e10ccaf6224bbe77e42f59d82aa1d3f"
        },
        "formNumber": 3094,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3230.pdf",
          "fileLength": 32483,
          "sha1Checksum": "294716d58d530fcc8da37074341b35f1850e12fa"
        },
        "formNumber": 3230,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4009.pdf",
          "fileLength": 60572,
          "sha1Checksum": "e5cc3f40464a25125b5095e6e66d0b3ffb65cdf5"
        },
        "formNumber": 4009,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4016.pdf",
          "fileLength": 39738,
          "sha1Checksum": "352edc6e973041c07b979819aec723d79b5fb6d1"
        },
        "formNumber": 4016,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4035.pdf",
          "fileLength": 160290,
          "sha1Checksum": "159b6fe0857275100f126a4df441e260ea6bb7f6"
        },
        "formNumber": 4035,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4036.pdf",
          "fileLength": 221862,
          "sha1Checksum": "6dee3536015318203ba52b63c49519c96874354d"
        },
        "formNumber": 4036,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form6112.pdf",
          "fileLength": 61662,
          "sha1Checksum": "169ce3381a61df47eb5e56a9d5a704714ee62e29"
        },
        "formNumber": 6112,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form6108.pdf",
          "fileLength": 72598,
          "sha1Checksum": "4bc30e9ff855dea9a957099507410a46f0eb6259"
        },
        "formNumber": 6108,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form9130.pdf",
          "fileLength": 163891,
          "sha1Checksum": "6636769fe45ab48908880cf29293bfb77b488767"
        },
        "formNumber": 9130,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form9490.pdf",
          "fileLength": 35089,
          "sha1Checksum": "2510e965d006011d1212f01fdf6fd7441013cd44"
        },
        "formNumber": 9490,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3076.pdf",
          "fileLength": 159700,
          "sha1Checksum": "3dd9aeb41d4166f6869d60a82af62b9e6b6338ff"
        },
        "formNumber": 3076,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4003.pdf",
          "fileLength": 93003,
          "sha1Checksum": "34787dd4cfbe2ba879776e6d4b4ed64c385acd91"
        },
        "formNumber": 4003,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form5013.pdf",
          "fileLength": 221029,
          "sha1Checksum": "4d695bbfc4c57fc7f4f639aa941e5aca1d32aa78"
        },
        "formNumber": 5013,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4059.pdf",
          "fileLength": 89346,
          "sha1Checksum": "c049df38c0eeee83f9a8c0f1126dcadf67cb25d8"
        },
        "formNumber": 4059,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4060.pdf",
          "fileLength": 111000,
          "sha1Checksum": "0f4a3cffc129fe370e803498c384a12a795bceaf"
        },
        "formNumber": 4060,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form6109.pdf",
          "fileLength": 56646,
          "sha1Checksum": "3bf0373691372865236830ff2e9dffe7600cf5e0"
        },
        "formNumber": 6109,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3089.pdf",
          "fileLength": 96294,
          "sha1Checksum": "4277e88904d8787339f000eb51566bad50c33076"
        },
        "formNumber": 3089,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3203.pdf",
          "fileLength": 241316,
          "sha1Checksum": "7793a2d7b990a5a3f6fd2b53f3ee7c1fc0bb359e"
        },
        "formNumber": 3203,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4024.pdf",
          "fileLength": 413238,
          "sha1Checksum": "0e615e51d2fa872b32373e944d24efc346421870"
        },
        "formNumber": 4024,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3081.pdf",
          "fileLength": 162236,
          "sha1Checksum": "5c9acb8e87c208df1995f0010781427ebb4f86ad"
        },
        "formNumber": 3081,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4010.pdf",
          "fileLength": 169702,
          "sha1Checksum": "62cc5de4255b429e54670ccc51672a2ea13a5abd"
        },
        "formNumber": 4010,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4215.pdf",
          "fileLength": 154627,
          "sha1Checksum": "82479c2070dbfaf17fe779c66bc5bf860c71a72e"
        },
        "formNumber": 4215,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4216.pdf",
          "fileLength": 95119,
          "sha1Checksum": "4f38a83cf86f394fbf8cde70d86a4fd687427309"
        },
        "formNumber": 4216,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4217.pdf",
          "fileLength": 93742,
          "sha1Checksum": "ecc23717af234613df14bce91703ed99ffe5b3b7"
        },
        "formNumber": 4217,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4212.pdf",
          "fileLength": 509033,
          "sha1Checksum": "9b7d10ed4023b31139163e1cbcfa4a1b5b54df03"
        },
        "formNumber": 4212,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4304.pdf",
          "fileLength": 391481,
          "sha1Checksum": "70a2a2806fa76aae2881da353966ace24bb8ffb2"
        },
        "formNumber": 4304,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4404.pdf",
          "fileLength": 20547,
          "sha1Checksum": "1ce663d10512d4a85d25fad12734c36e496c5f1d"
        },
        "formNumber": 4404,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4402.pdf",
          "fileLength": 32359,
          "sha1Checksum": "24509dd479c1b551e544d1cd24de7b15c139286e"
        },
        "formNumber": 4402,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form3354.pdf",
          "fileLength": 415582,
          "sha1Checksum": "b6d27e47b233d053115904d497577b9999d12afc"
        },
        "formNumber": 3354,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4399.pdf",
          "fileLength": 65693,
          "sha1Checksum": "4dadfe7ac41ae2463a4d2c3164e559ee8ba1cf65"
        },
        "formNumber": 4399,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      },
      {
        "signedBy": [
          "John F Does"
        ],
        "attachedFile": {
          "fileName": "Form4587.pdf",
          "fileLength": 307426,
          "sha1Checksum": "17d109a79a3024243c6cf578d988d43cff31a51b"
        },
        "formNumber": 4587,
       
        "execLoginTimestamp": 20240307114436,
        "execTimestamp": 20240307114436
      }
    ],
    "translation": false
  }
}
```

### 联名

## 联名 | 美国 | 完整集成

## 联名 | 美国 | 混合 - 全部信息

## 联名 | 非美国 | 完整集成

## 联名 | 非美国 | 混合 - 全部信息

### 信托账户

## 信托 | 非美国 | 混合 - 最多信息

```
{
  "application": {
    "customer": {
      "trust": {
        "identification": [
          {
            "address": {
              "street1": "2 Pickwick Plaza",
              "city": "Greenwich",
              "state": "SA-08",
              "country": "SAU",
              "postalCode": "53072"
            },
            "name": "Test Truster",
            "typeOfTrust": "REVOCABLE",
            "dateFormed": "2020-08-19",
            "formationCountry": "SAU",
            "formationState": "SA-08",
            "registrationNumber": "111555",
            "registrationType": "EIN",
            "registrationCountry": "SAU",
            "sameMailAddress": true,
            "translated": false
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 8,
                "tradesPerYear": 100,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-ORG-RetainedEarnings",
                "percentage": 50,
                "usedForFunds": true
              },
              {
                "sourceType": "SOW-ORG-Other",
                "percentage": 50,
                "usedForFunds": true,
                "description": "Income"
              }
            ],
            "netWorth": 9,
            "liquidNetWorth": 7,
            "annualNetIncome": 7,
            "translated": false
          }
        ],
        "trustees": {
          "individuals": [
            {
              "name": {
                "first": "Jane",
                "last": "Doe"
              },
              "dateOfBirth": "1985-03-09",
              "residenceAddress": {
                "street1": "2 Pickwick Plaza",
                "city": "Greenwich",
                "state": "SA-08",
                "country": "SAU",
                "postalCode": "53072"
              },
              "email": "dam@ibkr.com",
              "identification": {
                "citizenship": "SAU",
                "nationalCard": "11122334",
                "issuingCountry": "SAU",
                "expire": false
              },
              "employmentType": "EMPLOYED",
              "employmentDetails": {
                "employer": "Interactive Brokers",
                "occupation": "Engineer",
                "employerBusiness": "Business_NonFinance",
                "employerAddress": {
                  "country": "SAU"
                }
              },
              "externalId": "TestTrust2022TASP1",
              "sameMailAddress": true,
              "authorizedToSignOnBehalfOfOwner": true,
              "authorizedTrader": true,
              "primaryTrustee": true
            }
          ]
        },
        "beneficiaries": {
          "individual": [
            {
              "name": {
                "first": "Jane",
                "last": "Doe"
              },
              "externalId": "TestTrust2022TASP3",
              "sameMailAddress": true
            },
            {
              "name": {
                "first": "John",
                "last": "Doe"
              },
              "externalId": "TestTrust2022TASP4",
              "sameMailAddress": true
            }
          ]
        },
        "grantors": {
          "individual": [
            {
              "name": {
                "first": "Jane",
                "last": "Doe"
              },
              "dateOfBirth": "1985-03-09",
              "residenceAddress": {
                "street1": "2 Pickwick Plaza",
                "city": "Greenwich",
                "state": "SA-08",
                "country": "SAU",
                "postalCode": "53072"
              },
              "email": "dam@ibkr.com",
              "identification": {
                "citizenship": "SAU",
                "nationalCard": "11122334",
                "issuingCountry": "SAU",
                "expire": false
              },
              "employeeTitle": "Dermatologist",
              "externalId": "TestTrust2022TASP5",
              "sameMailAddress": true,
              "authorizedToSignOnBehalfOfOwner": false,
              "authorizedTrader": false,
              "ownershipPercentage": 50,
              "titles": [
                {
                  "value": "Grantor"
                }
              ],
              "authorizedPerson": false
            }
          ]
        },
        "thirdPartyManagement": false
      },
      "externalId": "TestTrust2022",
      "type": "TRUST",
      "prefix": "testr",
      "email": "dam@ibkr.com",
      "mdStatusNonPro": true
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Trading",
          "Growth"
        ],
        "tradingPermissions": [
          {
            "exchangeGroup": "US-Sec"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE",
          "chargeAdvisor": false,
          "chargeOtherFeesToAdvisor": false
        },
        "externalId": "TestTrust2022AC",
        "baseCurrency": "USD",
        "multiCurrency": true,
        "margin": "REGT",
        "stockYieldProgram": true,
        "alias": "Test Trust",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "TestTrust2022USR",
        "externalIndividualId": "TestTrust2022TASP1",
        "prefix": "testr"
      }
    ],
    "translation": false
  }
}
```

## 信托 | 非美国 | 混合 - 最少信息

```
{
  "application": {
    "customer": {
      "trust": {
        "identification": [
          {
            "address": {
              "street1": "2 Pickwick Plaza",
              "city": "Greenwich",
              "state": "SA-08",
              "country": "SAU",
              "postalCode": "53072"
            },
            "name": "Test Truster",
            "typeOfTrust": "REVOCABLE",
            "dateFormed": "2020-08-19",
            "formationCountry": "SAU",
            "formationState": "SA-08",
            "sameMailAddress": true
          }
        ],
        "financialInformation": [
          {
            "translated": false
          }
        ],
        "trustees": {
          "individuals": [
            {
              "name": {
                "first": "Jane",
                "last": "Doe"
              },
              "email": "dam@ibkr.com",
              "identification": {
                "citizenship": "SAU",
                "issuingCountry": "SAU",
                "expire": false
              },
              "externalId": "TestTrust2022TASP1",
              "sameMailAddress": true,
              "authorizedToSignOnBehalfOfOwner": true,
              "authorizedTrader": true,
              "usTaxResident": true,
              "primaryTrustee": true
            }
          ]
        },
        "thirdPartyManagement": false
      },
      "externalId": "TestTrust2022",
      "type": "TRUST",
      "prefix": "testr",
      "email": "dam@ibkr.com",
      "mdStatusNonPro": true
    },
    "accounts": [
      {
        "tradingPermissions": [
          {
            "exchangeGroup": "US-Sec"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE",
          "chargeAdvisor": false,
          "chargeOtherFeesToAdvisor": false
        },
        "externalId": "TestTrust2022AC",
        "baseCurrency": "USD",
        "multiCurrency": true,
        "margin": "REGT",
        "ira": false,
        "alias": "Test Trust",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "TestTrust2022USR",
        "externalIndividualId": "TestTrust2022TASP1",
        "prefix": "testr"
      }
    ],
    "translation": false
  }
}
```

### 机构账户

## 机构 | 美国 | 混合 - 最多信息

```
{
  "application": {
    "customer": {
      "organization": {
        "identifications": [
          {
            "placeOfBusinessAddress": {
              "street1": "1 Tester Road",
              "city": "Tester",
              "state": "CT",
              "country": "USA",
              "postalCode": "29209"
            },
            "phones": [
              {
                "type": "Business",
                "number": "2034228988",
                "country": "USA",
                "verified": false
              }
            ],
            "name": "Test Org USA",
            "businessDescription": "Yes",
            "identification": "1111222",
            "identificationCountry": "USA",
            "formationCountry": "USA",
            "sameMailAddress": true,
            "translated": false
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 10,
                "tradesPerYear": 60,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-ORG-OwnerEquity",
                "percentage": 100,
                "usedForFunds": true
              }
            ],
            "netWorth": 8,
            "liquidNetWorth": 8,
            "annualNetIncome": 4,
            "translated": false
          }
        ],
        "associatedEntities": {
          "associatedIndividuals": [
            {
              "name": {
                "first": "Joe",
                "last": "Doe"
              },
              "dateOfBirth": "1940-08-09",
              "countryOfBirth": "USA",
              "residenceAddress": {
                "street1": "1 Tester Road",
                "city": "Tester",
                "state": "CT",
                "country": "USA",
                "postalCode": "29209"
              },
              "phones": [
                {
                  "type": "Mobile",
                  "number": "2034228988",
                  "country": "USA",
                  "verified": false
                }
              ],
              "email": "tester@ibkr.com",
              "identification": {
                "citizenship": "USA",
                "ssn": "111221111",
                "issuingCountry": "USA",
                "expire": false
              },
              "employmentType": "EMPLOYED",
              "employmentDetails": {
                "employer": "IBKR",
                "occupation": "Financial Managers",
                "employerBusiness": "Investment Advisory",
                "employerAddress": {
                  "street1": "2 Pickwick Plaza",
                  "city": "Greenwich",
                  "state": "CT",
                  "country": "USA",
                  "postalCode": "06905"
                }
              },
              "taxResidencies": [
                {
                  "country": "USA",
                  "tin": "111221111",
                  "tinType": "SSN"
                }
              ],
              "externalId": "OrgTesterOASP12",
              "sameMailAddress": true,
              "authorizedToSignOnBehalfOfOwner": false,
              "authorizedTrader": false,
              "titles": [
                {
                  "code": "DIRECTOR"
                }
              ],
              "authorizedPerson": true
            },
            {
              "name": {
                "first": "Jane",
                "last": "Doe"
              },
              "dateOfBirth": "1972-07-27",
              "countryOfBirth": "USA",
              "residenceAddress": {
                "street1": "1 Tester Road",
                "city": "Tester",
                "state": "CT",
                "country": "USA",
                "postalCode": "29209"
              },
              "phones": [
                {
                  "type": "Mobile",
                  "number": "2034228988",
                  "country": "USA",
                  "verified": false
                }
              ],
              "identification": {
                "citizenship": "USA",
                "ssn": "111221111",
                "issuingCountry": "USA",
                "expire": false
              },
              "employmentType": "RETIRED",
              "taxResidencies": [
                {
                  "country": "USA",
                  "tin": "1112222",
                  "tinType": "SSN"
                }
              ],
              "externalId": "OrgTesterOASP1",
              "sameMailAddress": true,
              "authorizedToSignOnBehalfOfOwner": false,
              "authorizedTrader": false,
              "ownershipPercentage": 50,
              "titles": [
                {
                  "code": "OWNER"
                }
              ],
              "authorizedPerson": false
            }
          ]
        },
        "taxResidencies": [
          {
            "country": "USA",
            "tin": "1111222"
          }
        ],
        "typeOfTrading": "FIRM",
        "type": "LLC",
        "usTaxPurposeType": "C"
      },
      "externalId": "OrgTester",
      "type": "ORG",
      "prefix": "testt",
      "email": "tester@ibkr.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Income",
          "Growth"
        ],
        "tradingPermissions": [
          {
            "country": "UNITED STATES",
            "product": "STOCKS"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE",
          "chargeAdvisor": false,
          "chargeOtherFeesToAdvisor": false
        },
        "externalId": "OrgTesterAC",
        "baseCurrency": "USD",
        "multiCurrency": true,
        "margin": "MARGIN",
        "ira": false,
        "stockYieldProgram": true,
        "alias": "Tester Org",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "OrgTesterUSR",
        "externalIndividualId": "OrgTesterAH",
        "prefix": "testt"
      }
    ],
  }
}
```

## 机构 | 美国 | 混合 - 最少信息

```
{
  "application": {
    "customer": {
      "organization": {
        "identifications": [
          {
            "placeOfBusinessAddress": {
              "street1": "Pickwick Plaza",
              "city": "Greewnich City",
              "state": "CT",
              "country": "USA",
              "postalCode": "06905"
            },
            "name": "Test Org",
            "identification": "11122333",
            "identificationCountry": "USA",
            "formationCountry": "USA",
            "sameMailAddress": true }
        ],
        "associatedEntities": {
          "associatedIndividuals": [
            {
              "name": {
                "salutation": "Mrs.",
                "first": "Tester",
                "last": "Test"
              },
              "dateOfBirth": "1990-05-21",
              "residenceAddress": {
                "street1": "Pickwick Plaza",
                "city": "Greewnich City",
                "state": "CT",
                "country": "USA",
                "postalCode": "06905"
              },
              "email": "tester@gmail.com",
              "identification": {
                "citizenship": "USA",
                "ssn": "11122333",
                "issuingCountry": "USA"
              },
              "taxResidencies": [
                {
                  "country": "USA",
                  "tin": "11122333",
                  "tinType": "SSN"
                }
              ],
              "externalId": "OrgTester123ap",
              "sameMailAddress": true,
              "authorizedToSignOnBehalfOfOwner": false,
              "authorizedTrader": false,
              "titles": [
                {
                  "code": "SECRETARY"
                }
              ],
              "authorizedPerson": true
            }
          ]
        },
        "taxResidencies": [
          {
            "country": "USA",
            "tin": "11122333"
          }
        ],
        "type": "PARTNERSHIP",
        "usTaxPurposeType": "C"
      },
      "externalId": "OrgTester123",
      "type": "ORG",
      "prefix": "teste",
      "email": "tester@gmail.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "tradingPermissions": [
          {
            "exchangeGroup": "US-Sec"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE",
          "chargeAdvisor": false,
          "chargeOtherFeesToAdvisor": false
        },
        "externalId": "OrgTester123",
        "baseCurrency": "USD",
        "multiCurrency": true,
        "margin": "Cash",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "OrgTester123usr",
        "externalIndividualId": "OrgTester123ind",
        "prefix": "teste"
      }
    ],
  }
}
```

### 美国退休账户

## 传统 IRA | 美国 | 完整集成

## Roth IRA | 美国 | 混合 - 全部信息

### 加拿大退休账户

## SRRSP | 加拿大 | 完整集成

## SRRSP | 加拿大 | 混合 - 全部信息

## RRSP | 加拿大 | 完整集成

## RRSP | 加拿大 | 混合 - 全部信息

## TSFA | 加拿大 | 完整集成

## TSFA | 加拿大 | 混合 - 全部信息

### 英国储蓄计划

## ISA | 英国 | 完整集成

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "Jane",
              "last": "Doe"
            },
            "dateOfBirth": "1995-04-28",
            "countryOfBirth": "GBR",
            "maritalStatus": "S",
            "numDependents": 0,
            "residenceAddress": {
              "street1": "1 Tester Lane",
              "city": "London",
              "state": "GB-ENG",
              "country": "GBR",
              "postalCode": "SW9 9NY"
            },
            "phones": [
              {
                "type": "Mobile",
                "number": "+4407584089999",
                "country": "GBR"
              }
            ],
            "email": "janedoe@tester.com",
            "identification": {
              "citizenship": "GBR",
              "nationalCard": "PA123456D",
              "issuingCountry": "GBR",
              "expire": false
            },
            "employmentType": "EMPLOYED",
            "employmentDetails": {
              "employer": "CHIPOTLE",
              "occupation": "EXECUTIVE",
              "employerBusiness": "FOOD AND BEVERAGE",
              "employerAddress": {
                "street1": "1 TESTER Square",
                "city": "London",
                "state": "GB-ENG",
                "country": "GBR",
                "postalCode": "W1G 0PW"
              }
            },
            "taxResidencies": [
              {
                "country": "GBR",
                "tin": "PA123456D",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "name": "Jane Doe",
              "foreignTaxId": "PA141807D",
              "tinOrExplanationRequired": true,
              "part29ACountry": "GBR",
              "cert": true,
              "blankForm": true,
              "taxFormFile": "Form5001.pdf",
              "electronicFormat": true
            },
            "externalId": "testapp1234",
            "sameMailAddress": true,
            "translated": false
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 5,
                "tradesPerYear": 4,
                "knowledgeLevel": "Extensive"
              },
              {
                "assetClass": "OPT",
                "yearsTrading": 5,
                "tradesPerYear": 4,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 100,
                "usedForFunds": true
              }
            ],
            "netWorth": 500000,
            "liquidNetWorth": 500000,
            "annualNetIncome": 250000,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "testapp1234",
      "type": "INDIVIDUAL",
      "prefix": "nvest",
      "email": "janedoe@tester.com",
      "mdStatusNonPro": true
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Speculation"
        ],
        "tradingPermissions": [
          {
            "country": "ALL",
            "product": "STOCKS"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE"
        },
        "externalId": "testapp1234",
        "baseCurrency": "GBP",
        "multiCurrency": false,
        "margin": "Cash",
        "ira": true,
        "iraType": "ISA"
      }
    ],
    "users": [
      {
        "externalUserId": "testapp1234",
        "externalIndividualId": "testapp1234",
        "prefix": "nvest"
      }
    ],
    "documents": [
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form5001.pdf",
          "fileLength": 67700,
          "sha1Checksum": "D8AA699678D12DE6AC468A864D4FAE7999AA904B"
        },
        "formNumber": 5001,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form2109.pdf",
          "fileLength": 15697,
          "sha1Checksum": "BF01D3C5B2B7BC6CA90A4051636051A828FD735F"
        },
        "formNumber": 2109,
        "validAddress": false,
        "execLoginTimestamp": 20240117041717,
        "execTimestamp": 20240117041717
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form3024.pdf",
          "fileLength": 67600,
          "sha1Checksum": "274FA053D7E4080F0AD429787B9F94ABDF5498D7"
        },
        "formNumber": 3024,
        "validAddress": false,
        "execLoginTimestamp": 20150716015642,
        "execTimestamp": 20150716152843
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form4319.pdf",
          "fileLength": 472704,
          "sha1Checksum": "485e44e6bc1e969ee1888fbf12bc957d7d41a182"
        },
        "formNumber": 4319,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form4376.pdf",
          "fileLength": 118429,
          "sha1Checksum": "67D8506963789C3A2DA7B68F134D8F3F2515AFBC"
        },
        "formNumber": 4376,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form4547.pdf",
          "fileLength": 409788,
          "sha1Checksum": "C7A601FD4C746EFC8767FCE886B03782A5C89A1C"
        },
        "formNumber": 4547,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form4548.pdf",
          "fileLength": 416100,
          "sha1Checksum": "5FFF4BFEDD2F75A63EF493BB9F6ADEA63EBAF2A6"
        },
        "formNumber": 4548,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      }
    ],
    "translation": false
  }
}
```

## JISA | 英国 | 完整集成

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "Junior",
              "last": "Contact"
            },
            "dateOfBirth": "2022-12-20",
            "countryOfBirth": "GBR",
            "residenceAddress": {
              "street1": "24 TESTER LANE",
              "city": "LONDON",
              "state": "GB-LND",
              "country": "GB",
              "postalCode": "BR2 9FR"
            },
            "identification": {
              "citizenship": "GBR",
              "nationalCard": "NB123456C",
              "issuingCountry": "GBR",
              "expire": false
            },
            "taxResidencies": [
              {
                "country": "GBR",
                "tin": "NB123456C",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "localTaxForms": [
                {
                  "taxAuthority": "CANADA_TA",
                  "qualified": true,
                  "treatyCountry": "GBR"
                },
                {
                  "taxAuthority": "AUSTRALIA_TA",
                  "qualified": true,
                  "treatyCountry": "GBR"
                }
              ],
              "name": "Junior Contact",
              "foreignTaxId": "NB400056C",
              "tinOrExplanationRequired": true,
              "part29ACountry": "GBR",
              "cert": true,
              "signatureType": "Electronic",
              "blankForm": true,
              "taxFormFile": "Form5001.pdf",
              "electronicFormat": true
            },
            "externalId": "tester123",
            "sameMailAddress": false,
            "titles": [
              {
                "code": "Account Holder"
              }
            ],
            "authorizedPerson": false
          }
        ],
        "associatedIndividual": {
          "name": {
            "first": "Registered",
            "last": "Contact"
          },
          "dateOfBirth": "1963-12-20",
          "countryOfBirth": "GBR",
          "residenceAddress": {
            "street1": "24 TESTER LANE",
            "city": "LONDON",
            "state": "GB-LND",
            "country": "GB",
            "postalCode": "BR2 9FR"
          },
          "phones": [
            {
              "type": "Mobile",
              "number": "447483849999",
              "country": "GBR",
              "verified": false
            }
          ],
          "email": "DAM41832012@aol.com",
          "identification": {
            "citizenship": "GBR",
            "nationalCard": "NB400056A",
            "issuingCountry": "GBR",
            "expire": false
          },
          "employmentType": "EMPLOYED",
          "employmentDetails": {
            "employer": "Crown Prosecution Service ",
            "occupation": "Other",
            "description": "CIVIL",
            "employerBusiness": "Community/Social Service",
            "employerAddress": {
              "country": "GBR"
            }
          },
          "externalId": "tester123_rc",
          "sameMailAddress": true,
          "titles": [
            {
              "code": "Registered Contact"
            }
          ],
          "authorizedPerson": false
        },
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 11,
                "tradesPerYear": 27,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 10,
                "usedForFunds": true
              },
              {
                "sourceType": "SOW-IND-Pension",
                "percentage": 90,
                "usedForFunds": true
              }
            ],
            "netWorth": 375000,
            "liquidNetWorth": 70000,
            "annualNetIncome": 41600,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "tester123",
      "type": "INDIVIDUAL",
      "prefix": "skm",
      "email": "DAM41832012@aol.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Growth"
        ],
        "tradingPermissions": [
          {
            "exchangeGroup": "US-SEC"
          },
          {
            "exchangeGroup": "EURONEXT-FUND"
          }
        ],
        "externalId": "tester123",
        "baseCurrency": "GBP",
        "multiCurrency": true,
        "margin": "Cash",
        "ira": true,
        "iraType": "JISA",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "tester123",
        "externalIndividualId": "tester123",
        "prefix": "skm"
      }
    ],
    "documents": [
      {
        "signedBy": [
          "Registered Contact"
        ],
        "attachedFile": {
          "fileName": "Form5001.pdf",
          "fileLength": 67700,
          "sha1Checksum": "d8aa699678d12de6ac468a864d4fae7999aa904b"
        },
        "formNumber": 5001,
        "validAddress": false,
        "execLoginTimestamp": 20250511201657
      },
      {
        "signedBy": [
          "Registered Contact"
        ],
        "attachedFile": {
          "fileName": "Form3083.pdf",
          "fileLength": 557790,
          "sha1Checksum": "9C79DB3DF0925D126541817F2BBC7418BBD3EC4E"
        },
        "formNumber": 3083,
        "validAddress": false,
        "execLoginTimestamp": 20250511201657
      },
      {
        "signedBy": [
          "Registered Contact"
        ],
        "attachedFile": {
          "fileName": "Form4070.pdf",
          "fileLength": 27117,
          "sha1Checksum": "3BF982D0D81F0F6B1BBD37E9789EE6585F46F8DC"
        },
        "formNumber": 4070,
        "validAddress": false,
        "execLoginTimestamp": 20250511201657
      },
      {
        "signedBy": [
          "Registered Contact"
        ],
        "attachedFile": {
          "fileName": "Form9130.pdf",
          "fileLength": 252630,
          "sha1Checksum": "3F6E0751854D0BB7717AB4E954D97EDF31FEE6EA"
        },
        "formNumber": 9130,
        "validAddress": false,
        "execLoginTimestamp": 20250511201657
      }
    ],
    "translation": false
  }
}
```

## ISA | 英国 | 混合 - 全部信息

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "Jane",
              "last": "Doe"
            },
            "dateOfBirth": "1995-04-28",
            "countryOfBirth": "GBR",
            "maritalStatus": "S",
            "numDependents": 0,
            "residenceAddress": {
              "street1": "1 Tester Lane",
              "city": "London",
              "state": "GB-ENG",
              "country": "GBR",
              "postalCode": "SW9 9NY"
            },
            "phones": [
              {
                "type": "Mobile",
                "number": "+4407584089999",
                "country": "GBR"
              }
            ],
            "email": "janedoe@tester.com",
            "identification": {
              "citizenship": "GBR",
              "nationalCard": "PA123456D",
              "issuingCountry": "GBR",
              "expire": false
            },
            "employmentType": "EMPLOYED",
            "employmentDetails": {
              "employer": "CHIPOTLE",
              "occupation": "EXECUTIVE",
              "employerBusiness": "FOOD AND BEVERAGE",
              "employerAddress": {
                "street1": "1 TESTER Square",
                "city": "London",
                "state": "GB-ENG",
                "country": "GBR",
                "postalCode": "W1G 0PW"
              }
            },
            "taxResidencies": [
              {
                "country": "GBR",
                "tin": "PA123456D",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "name": "Jane Doe",
              "foreignTaxId": "PA141807D",
              "tinOrExplanationRequired": true,
              "part29ACountry": "GBR",
              "cert": true,
              "blankForm": true,
              "taxFormFile": "Form5001.pdf",
              "electronicFormat": true
            },
            "externalId": "testapp1234",
            "sameMailAddress": true,
            "translated": false
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 5,
                "tradesPerYear": 4,
                "knowledgeLevel": "Extensive"
              },
              {
                "assetClass": "OPT",
                "yearsTrading": 5,
                "tradesPerYear": 4,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 100,
                "usedForFunds": true
              }
            ],
            "netWorth": 500000,
            "liquidNetWorth": 500000,
            "annualNetIncome": 250000,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "testapp1234",
      "type": "INDIVIDUAL",
      "prefix": "nvest",
      "email": "janedoe@tester.com",
      "mdStatusNonPro": true
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Speculation"
        ],
        "tradingPermissions": [
          {
            "country": "ALL",
            "product": "STOCKS"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE"
        },
        "externalId": "testapp1234",
        "baseCurrency": "GBP",
        "multiCurrency": false,
        "margin": "Cash",
        "ira": true,
        "iraType": "ISA"
      }
    ],
    "users": [
      {
        "externalUserId": "testapp1234",
        "externalIndividualId": "testapp1234",
        "prefix": "nvest"
      }
    ],
    "translation": false
  }
}
```

## JISA | 英国 | 混合 - 全部信息

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "Junior",
              "last": "Contact"
            },
            "dateOfBirth": "2022-12-20",
            "countryOfBirth": "GBR",
            "residenceAddress": {
              "street1": "24 TESTER LANE",
              "city": "LONDON",
              "state": "GB-LND",
              "country": "GB",
              "postalCode": "BR2 9FR"
            },
            "identification": {
              "citizenship": "GBR",
              "nationalCard": "NB123456C",
              "issuingCountry": "GBR",
              "expire": false
            },
            "taxResidencies": [
              {
                "country": "GBR",
                "tin": "NB123456C",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "localTaxForms": [
                {
                  "taxAuthority": "CANADA_TA",
                  "qualified": true,
                  "treatyCountry": "GBR"
                },
                {
                  "taxAuthority": "AUSTRALIA_TA",
                  "qualified": true,
                  "treatyCountry": "GBR"
                }
              ],
              "name": "Junior Contact",
              "foreignTaxId": "NB400056C",
              "tinOrExplanationRequired": true,
              "part29ACountry": "GBR",
              "cert": true,
              "signatureType": "Electronic",
              "blankForm": true,
              "taxFormFile": "Form5001.pdf",
              "electronicFormat": true
            },
            "externalId": "tester123",
            "sameMailAddress": false,
            "titles": [
              {
                "code": "Account Holder"
              }
            ],
            "authorizedPerson": false
          }
        ],
        "associatedIndividual": {
          "name": {
            "first": "Registered",
            "last": "Contact"
          },
          "dateOfBirth": "1963-12-20",
          "countryOfBirth": "GBR",
          "residenceAddress": {
            "street1": "24 TESTER LANE",
            "city": "LONDON",
            "state": "GB-LND",
            "country": "GB",
            "postalCode": "BR2 9FR"
          },
          "phones": [
            {
              "type": "Mobile",
              "number": "447483849999",
              "country": "GBR",
              "verified": false
            }
          ],
          "email": "DAM41832012@aol.com",
          "identification": {
            "citizenship": "GBR",
            "nationalCard": "NB400056A",
            "issuingCountry": "GBR",
            "expire": false
          },
          "employmentType": "EMPLOYED",
          "employmentDetails": {
            "employer": "Crown Prosecution Service ",
            "occupation": "Other",
            "description": "CIVIL",
            "employerBusiness": "Community/Social Service",
            "employerAddress": {
              "country": "GBR"
            }
          },
          "externalId": "tester123_rc",
          "sameMailAddress": true,
          "titles": [
            {
              "code": "Registered Contact"
            }
          ],
          "authorizedPerson": false
        },
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 11,
                "tradesPerYear": 27,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 10,
                "usedForFunds": true
              },
              {
                "sourceType": "SOW-IND-Pension",
                "percentage": 90,
                "usedForFunds": true
              }
            ],
            "netWorth": 375000,
            "liquidNetWorth": 70000,
            "annualNetIncome": 41600,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "tester123",
      "type": "INDIVIDUAL",
      "prefix": "skm",
      "email": "DAM41832012@aol.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Growth"
        ],
        "tradingPermissions": [
          {
            "exchangeGroup": "US-SEC"
          },
          {
            "exchangeGroup": "EURONEXT-FUND"
          }
        ],
        "externalId": "tester123",
        "baseCurrency": "GBP",
        "multiCurrency": true,
        "margin": "Cash",
        "ira": true,
        "iraType": "JISA",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "tester123",
        "externalIndividualId": "tester123",
        "prefix": "skm"
      }
    ],
       "translation": false
  }
}
```

## 个人 | 捷克 | 完整集成

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "Jane",
              "last": "Doe"
            },
            "dateOfBirth": "1990-01-29",
            "countryOfBirth": "CZE",
            "residenceAddress": {
              "street1": "1 Test Street",
              "city": "Praha",
              "state": "CZ-10",
              "country": "CZE",
              "postalCode": "100001"
            },
            "email": Doe.Jane@hotmail.com,
            "identification": {
              "citizenship": "CZE",
              "nationalCard": "910829/5009",
              "issuingCountry": "CZE",
              "expire": false
            },
            "taxResidencies": [
              {
                "country": "CZE"
              }
            ],
            "w8Ben": {
              "name": "Jane Doe",
              "tinOrExplanationRequired": true,
              "explanation": "TIN_NOT_DISCLOSED",
              "part29ACountry": "CZE",
              "cert": true,
              "signatureType": "Electronic",
              "blankForm": false,
              "taxFormFile": "Form5001.pdf",
              "electronicFormat": true,
            },
            "externalId": "CZE_NonQI_Indi_Nov2024",
            "sameMailAddress": true
          }
        ]
      },
      "externalId": "CZE_NonQI_Indi_Nov2024",
      "type": "INDIVIDUAL",
      "prefix": "testr",
      "email": "Doe.Jane@hotmail.com",
      "mdStatusNonPro": false,
      "meetAmlStandard": "true",
      "directTradingAccess": true,
      "paperAccount": false
    },
    "accounts": [
      {
        "tradingPermissions": [
          {
            "country": "UNITED STATES",
            "product": "STOCKS"
          },
          {
            "country": "UNITED KINGDOM",
            "product": "STOCKS"
          },
          {
            "country": "GERMANY",
            "product": "STOCKS"
          }
        ],
        "externalId": "CZE_NonQI_Indi_Nov2024",
        "baseCurrency": "CZK",
        "multiCurrency": true,
        "margin": "Cash",
      }
    ],
    "users": [
      {
        "externalUserId": "CZE_NonQI_Indi_Nov2024",
        "externalIndividualId": "CZE_NonQI_Indi_Nov2024",
        "prefix": "testr"
      }
    ],
    "documents": [
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form5001.pdf",
          "fileLength": 199261,
          "sha1Checksum": "bd60f461d19b9b052bb67a67f8e8a2eeaeb644f8"
        },
        "formNumber": 5001,
        "validAddress": false,
        "execLoginTimestamp": 20231108103920,
        "execTimestamp": 20231108103941
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "ProofOfAddressDocd.pdf",
          "fileLength": 329,
          "sha1Checksum": "118416bebc7373939b74d848cb072119e6c0fd5f"
        },
        "formNumber": 8002,
        "validAddress": false,
        "execLoginTimestamp": 20231108103913,
        "execTimestamp": 20231108104004,
        "proofOfAddressType": "Government Issued Letters"
      }
    ],
    "translation": false,
    "paperAccount": false
  }
}
```

## 个人 | 沙特阿拉伯 | 完整集成

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "John",
              "last": "Doe",
              "middle": "S"
            },
            "dateOfBirth": "2002-10-25",
            "countryOfBirth": "SAU",
            "residenceAddress": {
              "street1": "1 Tester",
              "city": "aleala",
              "state": "SA-03",
              "country": "SAU",
              "postalCode": "93929"
            },
            "email": "tester@gmail.com",
            "identification": {
              "citizenship": "SAU",
              "nationalCard": "11225554",
              "issuingCountry": "SAU",
              "expire": false
            },
            "employmentType": "EMPLOYED",
            "employmentDetails": {
              "employer": "Test Employer Name Here",
              "occupation": "Analyst",
              "employerBusiness": "Computer/Information Technology",
              "employerAddress": {
                "street1": "22 Tester Road",
                "city": "Aleala",
                "state": "SA-03",
                "country": "SAU",
                "postalCode": "93929"
              }
            },
            "taxResidencies": [
              {
                "country": "SAU",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "name": "John S Doe",
              "tinOrExplanationRequired": true,
              "explanation": "TIN_NOT_ISSUED",
              "part29ACountry": "N/A",
              "cert": true,
              "signatureType": "Electronic",
              "blankForm": false,
              "taxFormFile": "5001.pdf",
              "electronicFormat": true
            },
            "externalId": "testExternalId3",
            "sameMailAddress": true,
            "titles": [
              {
                "value": "Account Holder"
              }
            ],
          }
        ],
        "financialInformation": [
          {
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 100,
                "usedForFunds": true
              }
            ],
            "netWorth": 103,
            "liquidNetWorth": 101,
            "annualNetIncome": 300000,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "EmployeePubTrade",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "testExternalId3",
      "type": "INDIVIDUAL",
      "prefix": "tesss",
      "email": "tester@gmail.com",
      "mdStatusNonPro": true,
      "legalResidenceCountry": "SAU",
      "meetAmlStandard": "true",
      "meetsAmlStandard": "true",
    },
    "accounts": [
      {
        "capabilities": [
          "CLP"
        ],
        "tradingPermissions": [
          {
            "country": "UNITED STATES",
            "product": "OPTIONS"
          },
          {
            "country": "UNITED STATES",
            "product": "STOCKS"
          }
        ],
        "externalId": "testExternalId3",
        "baseCurrency": "USD",
        "multiCurrency": true,
        "margin": "Margin",
        "stockYieldProgram": true,
        "alias": "John S Doe Indvidual",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "testExternalId3",
        "externalIndividualId": "testExternalId3",
        "prefix": "xneecg"
      }
    ],
    "documents": [
      {
        "signedBy": [
          "John S Doe"
        ],
        "attachedFile": {
          "fileName": "5001.pdf",
          "fileLength": 93167,
          "sha1Checksum": "3D45EBC208CB6782C4512876C4E9ECD205E6F4F0"
        },
        "formNumber": 5001,
        "validAddress": false,
        "execLoginTimestamp": 20240418000000,
        "execTimestamp": 20240418000020,
        "payload": {
          "mimeType": "application/pdf",
           "data": pm.collectionVariables.get('form5001')
        }
      },
      {
        "signedBy": [
          "John S Doe"
        ],
        "attachedFile": {
          "fileName": "Form8001.pdf",
          "fileLength": 93167,
          "sha1Checksum": "3D45EBC208CB6782C4512876C4E9ECD205E6F4F0"
        },
        "formNumber": 8001,
        "validAddress": false,
        "execLoginTimestamp": 20240418000300,
        "execTimestamp": 20240418000315,
        "payload": {
          "mimeType": "application/pdf",
           "data": pm.collectionVariables.get('form8001')
        },
        "proofOfIdentityType": "National ID Card"
      },
      {
        "signedBy": [
          "John S Doe"
        ],
        "attachedFile": {
          "fileName": "Form8002.pdf",
          "fileLength": 93167,
          "sha1Checksum": "3D45EBC208CB6782C4512876C4E9ECD205E6F4F0"
        },
        "formNumber": 8002,
        "validAddress": false,
        "execLoginTimestamp": 20240418000800,
        "execTimestamp": 20240418000840,
         "payload": {
          "mimeType": "application/pdf",
           "data": pm.collectionVariables.get('form8002')
        }   ,
        "proofOfAddressType": "Other Document"

      }
    ],
    "translation": false,
    "paperAccount": false
  }
}
```

## 个人 | 沙特阿拉伯 | 混合

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "John",
              "last": "Doe",
              "middle": "S"
            },
            "dateOfBirth": "2002-10-25",
            "countryOfBirth": "SAU",
            "residenceAddress": {
              "street1": "1 Tester",
              "city": "aleala",
              "state": "SA-03",
              "country": "SAU",
              "postalCode": "93929"
            },
            "email": "tester@gmail.com",
            "identification": {
              "citizenship": "SAU",
              "nationalCard": "11225554",
              "issuingCountry": "SAU",
              "expire": false
            },
            "employmentType": "EMPLOYED",
            "employmentDetails": {
              "employer": "Test Employer Name Here",
              "occupation": "Analyst",
              "employerBusiness": "Computer/Information Technology",
              "employerAddress": {
                "street1": "22 Tester Road",
                "city": "Aleala",
                "state": "SA-03",
                "country": "SAU",
                "postalCode": "93929"
              }
            },
            "taxResidencies": [
              {
                "country": "SAU",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "name": "John S Doe",
              "tinOrExplanationRequired": true,
              "explanation": "TIN_NOT_ISSUED",
              "part29ACountry": "N/A",
              "cert": true
            },
            "externalId": "testExternalId123999",
            "sameMailAddress": true,
            "titles": [
              {
                "value": "Account Holder"
              }
            ],
          }
        ],
        "financialInformation": [
          {
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 100,
                "usedForFunds": true
              }
            ],
            "netWorth": 103,
            "liquidNetWorth": 101,
            "annualNetIncome": 300000,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "EmployeePubTrade",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "testExternalId123999",
      "type": "INDIVIDUAL",
      "prefix": "tesss",
      "email": "tester@gmail.com",
      "mdStatusNonPro": true,
      "legalResidenceCountry": "SAU",
      "meetAmlStandard": "true",
      "meetsAmlStandard": "true",
    },
    "accounts": [
      {
        "capabilities": [
          "CLP"
        ],
        "tradingPermissions": [
          {
            "country": "UNITED STATES",
            "product": "OPTIONS"
          },
          {
            "country": "UNITED STATES",
            "product": "STOCKS"
          }
        ],
        "externalId": "testExternalId123999",
        "baseCurrency": "USD",
        "multiCurrency": true,
        "margin": "Margin",
        "stockYieldProgram": true,
        "alias": "John S Doe Indvidual",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "testExternalId123999",
        "externalIndividualId": "testExternalId123999",
        "prefix": "xneecg"
      }
    ],
    
    "translation": false,
    "paperAccount": false
  }
}
```

## 个人 | 英国 | 完整集成 QI(含交易)

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "John",
              "last": "Smith"
            },
            "dateOfBirth": "1973-08-14",
            "countryOfBirth": "GBR",
            "residenceAddress": {
              "street1": "1 Tester Street",
              "city": "London",
              "state": "GB-ENG",
              "country": "GBR",
              "postalCode": "SW10 9QL"
            },
            "phones": [],
            "email": "tester@ibkr.com",
            "identification": {
              "citizenship": "GBR",
              "nationalCard": "AB123456C",
              "issuingCountry": "GBR",
              "expire": false
            },
        "withholdingStatement": {
          "effectiveDate": "2024-11-01",
          "fatcaCompliantType": "FATCA_COMPLIANT",
          "treatyCountry": "GBR"
        }
      },
      "externalId": "MyExternalId1234",
      "type": "INDIVIDUAL",
      "prefix": "damtes",
      "email": "tester@ibkr.com",
      "mdStatusNonPro": true,
      "meetAmlStandard": "true",
      "directTradingAccess": true,
      "legalResidenceCountry": "GBR"
    },
    "accounts": [
      {
        "tradingPermissions": [
          {
            "country": "UNITED KINGDOM",
            "product": "STOCKS"
          },
          {
            "country": "UNITED STATES",
            "product": "OPTIONS"
          }
        ],
        "externalId": "MyExternalId1234",
        "baseCurrency": "GBP",
        "multiCurrency": true,
        "margin": "Cash",
      }
    ],
    "users": [
      {
        "externalUserId": "MyExternalId1234",
        "externalIndividualId": "MyExternalId1234",
        "prefix": "damtes"
      }
    ],
  },
}
```

## 个人 | 英国 | 完整集成 QI(不含交易)

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "John",
              "last": "Smith"
            },
            "residenceAddress": {
              "country": "GBR"

            },
            "phones": [],
            "email": "tester@ibkr.com",
            "externalId": "MyExternalId12345",
            "sameMailAddress": true
          }
        ],
   
        "withholdingStatement": {
          "effectiveDate": "2024-11-01",
          "fatcaCompliantType": "FATCA_COMPLIANT",
          "treatyCountry": "GBR"
        }
      },
      "externalId": "MyExternalId12345",
      "type": "INDIVIDUAL",
      "prefix": "damtes",
      "email": "tester@ibkr.com",
      "mdStatusNonPro": true,
      "meetAmlStandard": "true",
      "directTradingAccess": false,
      "legalResidenceCountry": "GBR"
    },
    "accounts": [
      {
        "tradingPermissions": [
          {
            "country": "UNITED KINGDOM",
            "product": "STOCKS"
          },
          {
            "country": "UNITED STATES",
            "product": "OPTIONS"
          }
        ],
        "externalId": "MyExternalId12345",
        "baseCurrency": "GBP",
        "multiCurrency": true,
        "margin": "Cash",
      }
    ],
    "users": [
      {
        "externalUserId": "MyExternalId12345",
        "externalIndividualId": "MyExternalId12345",
        "prefix": "damtes"
      }
    ],
  },
}
```