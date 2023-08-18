# EcommerceAssignment

## To set up the project
1.From command prompt enter into the main folder where the code resides
2.Type : npm i
3.In the main folder create a file named .env
4.Define a PORT like PORT=1200 in the .env file
5.Enter your MongoDB link along with a Data Base name
6.Run the file using the command : npm start


### Input for user Registration : 
{
    "name" : "<Name of user>",
    "email":"<Email ID of user>",
    "password":"<Any Password>"
}

### Input for user Login :
{
    "email":"<Email ID of user>",
    "password":"<Any Password>"
}

### For viewing all categories available :
No input required

### For viewing all products under each category :
No input required

### Input for viewing a particular product :
{
    "productId":"<copy the _id of the product from productlist route>"
}

### Input for adding a product to the cart : 
Enter 'token' value either in query params or in headers or in body
Inside Body:
{
"userId":"<Enter value of userId which is _id of the user from user schema>",
"productId":"<Enter value of productId which is _id of the product from product schema>",
"qty":<Enter a value>
}

### Input for updating the quantity of a product to the cart : 
Enter 'token' value either in query params or in headers or in body
In the params enter the productId which is _id of the product from product schema
Inside Body:
{
"userId":"<Enter value of userId which is _id of the user from user schema>",
"qty":<Enter a value>
}

### Input for viewing the cart details : 
Enter 'token' value either in query params or in headers or in body
Inside Body:
{
"userId":"<Enter value of userId which is _id of the user from user schema>",
}

### Input for placing the order from the cart : 
Enter 'token' value either in query params or in headers or in body
Inside Body:
{
"userId":"<Enter value of userId which is _id of the user from user schema>",
"cartId":"<Enter value of cartId (in array form if you want to place order for multiple cart Ids) which is _id of the cart from cart schema>"
}

### Input for displaying the order history : 
Enter 'token' value either in query params or in headers or in body
In the params : Enter the userId which is _id of the user from user schema

### Input for displaying the details of a particular order : 
Enter 'token' value either in query params or in headers or in body
In the params : Enter the orderId which is _id of the order from order schema

