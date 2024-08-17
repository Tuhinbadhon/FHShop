# STYLE ROOM

## Overview
STYLE ROOM is a full-stack single-page web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to search, filter, categorize, and sort products. The application includes authentication via Google and Email/Password using Firebase, ensuring a secure and personalized user experience.

## Features

1. **MERN Stack Architecture**
   - Built using MongoDB, Express.js, React.js, and Node.js.
   - Mongoose ORM is used to manage MongoDB data models.

2. **Product Listing with Pagination**
   - Efficient product listing with backend pagination.
   - Page numbers and navigation buttons (Next, Previous) for seamless browsing.

3. **Search Functionality**
   - Users can search for products by name.
   - Real-time search results display as users type in the search bar.

4. **Categorization Filters**
   - Products are categorized into:
     - **Brand Name**
     - **Category Name**
     - **Price Range**
   - Users can apply single or multiple filters simultaneously.

5. **Sorting Options**
   - Products can be sorted by:
     - **Price:** Low to High, High to Low
     - **Date Added:** Newest first
   - Users can easily find products based on their preferences.

6. **Product Details**
   - Each product includes:
     - **Name**
     - **Image**
     - **Description**
     - **Price**
     - **Category**
     - **Ratings**
     - **Creation Date and Time**

7. **Authentication**
   - **Google Authentication**: Users can sign in using their Google account via Firebase.
   - **Email and Password Authentication**: Secure email and password-based sign-up and login.

8. **Responsive Design**
   - Mobile-first design ensures the website is fully responsive.
   - Optimized for various screen sizes and devices.

9. **Admin Interface**
   - Admin can insert, update, or delete product data.
   - Data management through secure admin routes.

10. **Dummy Data Setup**
    - At least 40 products pre-populated in the MongoDB database.
    - API provided to add new products or manage existing data.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/mrbalok019/style-room.git
   cd style-room
