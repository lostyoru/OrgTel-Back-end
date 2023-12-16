# Backend API - OrgTel

This repository contains the backend code for a project focused on managing reservations, users, rooms, and categories through RESTful APIs.

## Table of Contents

- Description
- API Documentation
- Installation
- Usage
- Dependencies
- Contributing
- License

## Description

The Backend API is built using Node.js and Express, providing endpoints for various functionalities including user management, reservation handling, category management, and more. It utilizes MongoDB for data storage and JWT for authentication.

## API Documentation

The API endpoints and their functionalities are documented using Swagger 2.0. You can find the detailed API documentation in the Swagger Specification File (/swagger.yaml) included in this repository.

Additionally, you can visualize and interact with the API documentation using the Swagger UI. To access it locally, run the following command:

npm run swagger

This will start a local server, and you can view the documentation by navigating to http://localhost:3000/api-docs in your browser.

## Installation

To set up the project locally, follow these steps:

1. Clone this repository.
2. Install dependencies using npm:

npm install

3. Set up environment variables by creating a .env file based on the provided .env.example file.

## Usage

To start the server in development mode, run:

npm run dev

This will start the server on http://localhost:3000.

## Dependencies

- Express: Web framework for Node.js
- MongoDB & Mongoose: Database and ODM for interacting with MongoDB
- JWT: Authentication mechanism using JSON Web Tokens
- Swagger: API documentation and specification tool
- Other dependencies listed in the package.json file

For a complete list of dependencies and their versions, refer to the package.json file in this repository.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the ISC License.
