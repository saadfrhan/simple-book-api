# Simple Book API #

## Books

### List of books ###

GET `/books`
Returns a list of books.
Optional query parameters:
- type: fiction or non-fiction
- limit: a number between 1 and 20.

#### Example Response ####
```json
[
  {
    "id": 2,
    "name": "To Kill a Mockingbird",
    "type": "Fiction",
    "available": true
  },
  [...more entries]
]
```

### Get a single book ###

GET `/books/:id`
Retrieve detailed information about a book.

#### Example Response ####
```json
[
  {
    "id": 1,
    "name": "The Great Gatsby",
    "type": "Fiction",
    "available": true,
    "author": "F. Scott Fitzgerald",
    "isbn": "978-1-234-56789-7",
    "price": 19.99,
    "current_stock": 98
  }
]
```

## Orders

### Submit an order ###

POST `/orders`
Allows you to submit a new order. Requires authentication.
The request body needs to be in JSON format and include the following properties:

 - `book_id` - Integer - Required
 - `customer_name` - String - Required

#### Example Request ####
```
POST /orders/
Authorization: Bearer <YOUR TOKEN>

{
  "book_id": 1,
  "customer_name": "John"
}
```

#### Example Response ####
```json
[
  {
    "created": true,
    "order_id": 4
  }
]
```

### Get all orders ###

GET `/orders`
Allows you to view all orders. Requires authentication.

#### Example Response ####

```json
[
  {
    "book_id": 1,
    "customer_name": "Saad",
    "quantity": 1,
    "created_by": "<accessToken>",
    "timestamp": "<ISODate>"
  }
]
```

### Get an order ###

GET `/orders/:id`
Allows you to view an existing order. Requires authentication.

#### Example Response ####

```json
[
  {
    "book_id": 1,
    "customer_name": "Saad",
    "quantity": 1,
    "created_by": "<accessToken>",
    "timestamp": "<ISODate>"
  }
]
```

### Update an order ###

PATCH `/orders/:id`
Update an existing order. Requires authentication.
The request body needs to be in JSON format and allows you to update the following properties:

 - `customer_name` - String

#### Example Request ####
```
PATCH /orders/PF6MflPDcuhWobZcgmJy5
Authorization: Bearer <YOUR TOKEN>

{
  "customer_name": "John"
}
```

### Delete an order ###

DELETE `/orders/:orderId`
Delete an existing order. Requires authentication.
The request body needs to be empty.

#### Example Request ####
```
DELETE /orders/PF6MflPDcuhWobZcgmJy5
Authorization: Bearer <YOUR TOKEN>
```

## API Authentication ##

To submit or view an order, you need to register your API client.

POST `/api-clients/`
The request body needs to be in JSON format and include the following properties:

 - `client_name` - String
 - `client_email` - String

#### Example Request ####
```json
{
  "client_name": "Postman",
  "client_email": "valentin@example.com"
}
```

#### Example Response ####
The response body will contain the access token. The access token is valid for 7 days.
```json
[
  {
    "accessToken": "<accessToken>"
  }
]
```
