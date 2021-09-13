### Installing dependencies

    npm install

### To start the json server:

    npm run json:server

### Running React Application

    npm start

### About the project

It is an assignment for Charter communications, where we have to calculate the reward points of a customer on the basis of the transaction amount. The reward points is calculated using a certain formula as described below.

A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction

1. If transaction amount > 100
   then reward point = (2\*(transaction amount-100) + 50)
2. If transaction amount > 50 and amount < 100
   then reward point = transaction amount-50
3. If transaction amount < 50
   then reward point = 0

Ex: When Transaction Amount = $120,
Total Rewards Points = 2x$20 + 1x$50 = 90 points
