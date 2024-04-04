# Library Management System

## Description
The Library Management System is a web application designed to facilitate the management of books, members, and borrowing operations in a library. It allows librarians to add, remove, and update books, manage member information, and track borrowing and returning of books by library members.

## Features
1. **Borrowing Operations:**
   - Allow members to borrow books from the library.
   - Track borrowed books and their due dates.
   - Enable members to return borrowed books.

2. **Availability Tracking:**
   - Display the availability status of each book in real-time.
   - Ensure accurate tracking of borrowed books to prevent overbooking.

3. **Penalty System:**
   - Implement a penalty system for late returns.
   - Apply penalties to members who exceed the due date for returning books.

## Technologies Used
- **Backend:** Node.js with Express.js framework
- **Database:** MongoDB for data storage
- **API Documentation:** OpenAPI (formerly known as Swagger) for documenting APIs
- **Testing:** Mocha and Chai for unit and integration testing

## API Endpoints
- `/api/member-borrow`: Submit a new loan request
- `/api/member/all`: List all members
- `/api/return`: Return a borrowed book
- `/api/books`: Show all existing books and quantities

## Documentation
The project includes comprehensive documentation for APIs using the OpenAPI specification. API endpoints, request/response schemas, and example payloads are documented to ensure clarity and ease of integration for developers.
You can view the API documentation in the [docs.json](docs/docs.json) file.

## Future Enhancements
- Implement user authentication and authorization for secure access.
- Add search and filtering capabilities for books and members.
- Integrate email notifications for overdue books and penalty reminders.

## Contributing
Contributions to the project are welcome! Developers can contribute by adding new features, fixing bugs, or improving documentation. Please refer to the project's contribution guidelines for more information.

## License
This project is licensed under the MIT License, allowing for open-source collaboration and use.
