#! /bin/bash -e

# Array of customers
customers=("John" "Peter" "Derek" "Michael")

# Array of Pay methods
paymethods=("Cash" "Credit Card")

# Array of products
products=("Geeko" "Cup" "T-shirt")

# Array of pricing
pricing=(50 100 150)

# Seed random generator
RANDOM=$$$(date +%s)

# Loop forever
while [ 1 ]
do
  # Get random expression...
  customer=${customers[$RANDOM % ${#customers[@]} ]}
  paymethod=${paymethods[$RANDOM % ${#paymethods[@]} ]}
  pid=$[RANDOM % ${#products[@]}]
  product=${products[$pid]}
  price=${pricing[$pid]}

  # submit order
  curl -X POST \
    -H "Content-Type: application/json" \
    -d "{\"customer\":\"${customer}\", \"product\":\"${product}\", \"paymethod\":\"${paymethod}\", \"price\":\"${price}\", \"timestamp\":\"2019-30-31 03:30:18\"}" \
    http://suse-order-processor.open-cloud.net/api/order

done

exit
