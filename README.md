Design and develop web API/ microservice for booking a table in a cruise ship restaurant.

**##Considerations**

**Database**:
Currently, in the Database, we have the following tables:
1. **Booking**: All details regarding a booking.
2. **Customer**: All details regarding a Customer
3. **Table**: All details regarding a Table.
4. **Sequence**: This table can be used for general purposes when we are using a sequence number that needs to be generated every time (increasing the sequence no by 1). In our code, we have used it to generate a unique BookingReference Number.

![2024-01-16 12_40_43-Alfred Maritime Assignment - Microsoft Visual Studio](https://github.com/srijanighosh87/CruiseBookingService/assets/35540694/d770d443-25a7-415b-9829-774239a0177c)


**Functionality:**

1. A booking can be made only for future dates
2. All bookings have a duration of 2 hours.
3. Max capacity of a booking: 10 persons, Min capacity of a booking: 1 person.
4. The user can book only with a valid Start time. Departure time will be automatically calculated by adding 2hours to the start time
5. If the booking is successful, the user will receive a unique **Booking Reference number** which she can use for further processing of the booking(update).
6. If a slot is not available while creating a new booking, the user will be informed.
7. If a slot is available + booking is possible + user details do not exist in the Customer Database: The user will be added to the database.
8. After booking is completed, the booking will be added to the list of bookings of the user and the table.
9. The user can update an existing booking with the booking reference number
10. While updating the booking, the user can not use a past date.
11. If a slot is not available while updating an existing booking, the user will be informed and the old booking will not be deleted.
12. If a slot is available while updating an existing booking, the user will be informed and the old booking will not be updated.
13. If while updating, the user changes the capacity of the booking, there is a possibility to change the table number (based on availability).
14. The user can delete a booking using the booking ID.
15. BookingAPI Swagger URL (local): https://localhost:7000/swagger/index.html. Azure URL: grabaseatbookingservice.azurewebsites.net
16. Front URL: https://black-sand-09021e30f.4.azurestaticapps.net
17. For the frontend, CD for Git workflow with Azure has been implemented.
18. For the Backend code, manual deployment is needed as of now (CD will be implemented later).
19. For this project, a shared database has been used and all APIs are written in one single project. But later for customer-related information, a separate customer database can be used.

**## Improvements / to do**
1. Authentication is not added for the user.
2. Currently all bookings have a duration of 2 hours. The user should be able to book for 1 hour or 2 hours based on her requirements.
3. Adding multiple tables together for a larger group is not supported.
4. There is no scope to update/delete existing users.
5. There is no scope to add/update/delete existing tables.
6. Currently, all the tables mentioned above are in one single Database.
7. Booking confirmation could be sent to the user later by email. This can be implemented by using SendGrid (Working on it)
8. Unit test cases not implemented yet (will be implemented using NUnit later)
10. Health check for APIs, and circuit breakers can be implemented for Reliability.
11. Gateway not implemented yet.


**Techstack**-
1. **Database**: Entity Framework core InMemory database (Data is seeded in Program.cs).
2. **ORM**: EF Core
5. **Documentation of APIs:** Swagger Open API

