# Nutrition Log Server

Welcome to our Eleven Fifty Academy Blue Badge Project. As part of the course we built a PERN stack web application that integrates with the Edamam API to allow users to track their meals' calories.

## Endpoints

There are a handful of endpoints in the server side of this application. For each endpoint below are the type of requests they should receive, the format of the request (if applicable) and the responses they return (if applicable).

## '/user/register'

### POST request

```json
{
	"email": "test@email.com",
	"username": "testuser1",
	"password": "testPassword123"
}
```

## '/user/login'

### POST request

```json
{
	"username": "testuser1",
	"password": "testPassword123"
}
```

## '/food'

### GET response

```json
{
  "result" : [
		{
			"name": "cheeseburger",
			"description": "A hamburger with some cheese on it",
			"servings": 1,
			"calories": 500,
			"date_eaten": "2020-06-03",
			"meal": "dinner",
			"owner_id": 1,
			"createdAt": "2020-06-03T10:37:45.402Z",
			"updatedAt": "2020-06-03T10:37:45.402Z"
		},
		{...},
		.
		.
		.
	]
}
```

### POST request

```json
{
	"headers": {
		"authorization": token,
		"Content-Type": "application/json"
	},
	"body": {
		"name": "carrot",
		"description": "It's small and orange",
		"servings": 1,
		"calories": 24,
		"date_eaten": "2020-10-05",
		"meal": "snack"
	}
}
```

## '/food/:id'

### PUT request

```json
{
	"name": "Protein Shake",
	"description": "Liquid full of protein",
	"servings": 1,
	"calories": 300,
	"date_eaten": "2020-10-05",
	"meal": "lunch"
}
```
