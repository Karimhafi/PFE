const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors'); // Require the CORS package
const bcrypt = require('bcrypt'); // Import bcrypt here
const multer = require('multer');
const axios = require('axios');
const mysql = require('mysql2');

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' });
const app = express();
const port = 3001;

// Use CORS with default options (allows all origins)
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
const morgan = require('morgan');
app.use(morgan('dev'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Movie'
});

app.use(session({
    secret: 'your_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Note: secure:true only works with HTTPS
}));

connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});
app.post('/api/users/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Hash the password using bcrypt


    // Insert the new user into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [username, password], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Error registering user');
        }
        res.send('User registered successfully');

    });
});
// Node.js/Express code to handle user login
app.post('/api/users/login', (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    // Assuming you have a way to validate users, e.g., querying a database
    const query = 'SELECT * FROM users WHERE username = ?';

    connection.query(query, [username], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            res.status(500).send('Internal server error');
            return;
        }

        if (results.length > 0) {
            const user = results[0];
            // Compare plaintext passwords directly
            if (password === user.password) {
                // Passwords match
                res.send({ message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } });
            } else {
                // Passwords do not match
                res.status(401).send('Incorrect username or password');
            }
        } else {
            // No user found with the provided username
            res.status(401).send('Incorrect username or password');
        }
    });
});

app.put('/api/users/update/:id', (req, res) => {
    const userId = req.params.id;
    const { username, phone_number, country } = req.body;

    // Validate input
    if (!username || !phone_number || !country) {
        return res.status(400).send('All fields are required');
    }

    // Update the user in the database using parameterized query to prevent SQL injection
    const query = 'UPDATE users SET username = ?, phone_number = ?, country = ? WHERE id = ?';
    connection.query(query, [username, phone_number, country, userId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Error updating user');
        }

        res.send('User updated successfully');
    });
});
// GET user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    // Query the database to retrieve user information
    const query = 'SELECT * FROM users WHERE id = ?';
    connection.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Error retrieving user information');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = results[0]; // Assuming user ID is unique, so there should be only one result
        res.json(user); // Send user information as JSON response
    });
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/add-movie', (req, res) => {
    const { userId, movieortvId, Title } = req.body;

    // Check if any required fields are missing
    if (!userId || !movieortvId || !Title) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // SQL query to check if the movie already exists for the user
    const checkQuery = 'SELECT * FROM ListMovie WHERE user_id = ? AND movie_id = ?';

    // First, execute the checkQuery to see if the entry already exists
    connection.query(checkQuery, [userId, movieortvId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Internal server error');
        }

        // If the movie already exists, return an appropriate message
        if (results.length > 0) {
            return res.status(409).json({ message: 'This movie already exists in your list.' });
        }

        // If no entry exists, insert the new movie
        const insertQuery = 'INSERT INTO ListMovie (user_id, movie_id, movie_title, added_on) VALUES (?, ?, ?, NOW())';
        connection.query(insertQuery, [userId, movieortvId, Title], (error, result) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).send('Internal server error');
            }
            res.status(201).json({ message: 'Movie added successfully', movieId: result.insertId });
        });
    });
});

app.post('/add-tv', (req, res) => {
    const { userId, movieortvId, Title } = req.body;

    // Check if any required fields are missing
    if (!userId || !movieortvId || !Title) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    // SQL query to check if the TV show already exists for the user
    const checkQuery = 'SELECT * FROM ListTV WHERE user_id = ? AND tv_id = ?';

    // First, execute the checkQuery to see if the entry already exists
    connection.query(checkQuery, [userId, movieortvId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Internal server error');
        }

        // If the TV show already exists, return an appropriate message
        if (results.length > 0) {
            return res.status(409).json({ message: 'This TV show already exists in your list.' });
        }

        // If no entry exists, insert the new TV show
        const insertQuery = 'INSERT INTO ListTV (user_id, tv_id, tv_title, added_on) VALUES (?, ?, ?, NOW())';
        connection.query(insertQuery, [userId, movieortvId, Title], (error, result) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).send('Internal server error');
            }
            res.status(201).json({ message: 'TV show added successfully', movieortvId: result.insertId });
        });
    });
});

app.get('/user-movies/:userId', async(req, res) => {
    const userId = req.params.userId;
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID provided' });
    }

    const dbQuery = 'SELECT movie_id FROM ListMovie WHERE user_id = ?';
    connection.query(dbQuery, [userId], async(error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Error fetching movies from database' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No movies found for the given user ID' });
        }
        try {

            const movieDetailsPromises = results.map(({ movie_id }) =>
                axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`, {
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTY5M2NmNTFhYTFkMjI3ZDNmMTM3NmRiMmNjY2Y3ZCIsInN1YiI6IjY1OTU1ZTYyNTkwN2RlMmNmNzYzYmVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.081mtreNm2pj0iZBu4cLmhAUQQaq3eHNZYm2nUly6Mo`
                    }
                })
                .then(response => response.data)
            );
            const moviesDetails = await Promise.all(movieDetailsPromises);
            res.json(moviesDetails);
        } catch (fetchError) {
            console.error('Error fetching movie details:', fetchError);
            res.status(500).json({ message: 'Failed to fetch movie details from TMDb' });
        }
    });
});
app.get('/user-tvshows/:userId', async(req, res) => {
    const userId = req.params.userId;
    if (isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid user ID provided' });
    }

    const dbQuery = 'SELECT tv_id FROM listtv WHERE user_id = ?';
    connection.query(dbQuery, [userId], async(error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Error fetching TV shows from database' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No TV shows found for the given user ID' });
        }

        try {
            const tvShowDetailsPromises = results.map(({ tv_id }) =>
                axios.get(`https://api.themoviedb.org/3/tv/${tv_id}`, {
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTY5M2NmNTFhYTFkMjI3ZDNmMTM3NmRiMmNjY2Y3ZCIsInN1YiI6IjY1OTU1ZTYyNTkwN2RlMmNmNzYzYmVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.081mtreNm2pj0iZBu4cLmhAUQQaq3eHNZYm2nUly6Mo`
                    }
                })
                .then(response => response.data)
            );
            const tvShowsDetails = await Promise.all(tvShowDetailsPromises);
            res.json(tvShowsDetails);
        } catch (fetchError) {
            console.error('Error fetching TV show details:', fetchError);
            res.status(500).json({ message: 'Failed to fetch TV show details from TMDb' });
        }
    });
});


//////Admin
// GET all users with role 'User'
app.get('/api/Users', (req, res) => {
    const query = `
        SELECT
            users.*,
            (SELECT COUNT(*) FROM listtv WHERE user_id = users.id) AS tv_count,
            (SELECT COUNT(*) FROM listmovie WHERE user_id = users.id) AS movie_count
        FROM
            users`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(404).send('No users found');
        }

        res.json(results);
    });
});

// GET all users with role 'User'
app.get('/api/Admin', (req, res) => {
    const query = 'SELECT * FROM users WHERE role = "Admin"';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(404).send('No users found with role User');
        }

        res.json(results);
    });
});

app.put('/api/update/:id', (req, res) => {
    const userId = req.params.id;
    const updates = req.body;
    const allowedFields = ['username', 'password', 'phone_number', 'country', 'role'];
    const updateFields = Object.keys(updates).filter(key => allowedFields.includes(key));

    if (updateFields.length === 0) {
        return res.status(400).send('No valid fields provided for update.');
    }

    let query = 'UPDATE users SET ';
    const queryParams = [];

    // Constructing the query based on the fields provided
    updateFields.forEach((field, index) => {
        query += `${field} = ?`;
        queryParams.push(updates[field]);
        if (index < updateFields.length - 1) query += ', ';
    });

    query += ' WHERE id = ?';
    queryParams.push(userId);

    // Execute the query
    connection.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Error updating user');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.send('User updated successfully');
    });
});
app.delete('/api/Delete/:id', (req, res) => {
    const { id } = req.params; // Extract the user ID from the URL parameters

    // SQL query to delete the user
    const query = 'DELETE FROM users WHERE id = ?';

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send('Error deleting user');
        }

        if (results.affectedRows === 0) {
            // No rows affected means no user was found with that ID
            return res.status(404).send('User not found');
        }

        // If everything went well, send a success response
        res.send('User deleted successfully');
    });
});

app.post('/api/admins', (req, res) => {
    const { username, password, phone_number, country } = req.body; // Removed 'role' if you're setting it directly

    // Fixed validation: Removed 'email' since it's not in the destructured variables
    if (!username || !password || !phone_number || !country) {
        return res.status(400).send({ message: 'Please provide username, password, phone number, and country' });
    }

    const query = 'INSERT INTO users (username, password, role, phone_number, country) VALUES (?, ?, ?, ?, ?)';

    // Since 'role' is not coming from the body, I'm directly inserting 'Admin'
    connection.query(query, [username, password, 'Admin', phone_number, country], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).send({ message: 'Error adding new admin' });
        }
        res.status(201).send({ message: 'New admin added successfully' });
    });
});

app.post('/api/tickets', (req, res) => {
    const { userId, movie_id, cinemaName, seatNumber, showtime, cinemaAddress, showtimeId } = req.body;
    console.log(movie_id);
    // Start a transaction
    connection.beginTransaction(err => {
        if (err) { return res.status(500).send('Database transaction start failed.'); }

        // Query to insert a new ticket
        const insertTicketQuery = `
            INSERT INTO Tickets (user_id, movie_id, cinema_name, seat_number, showtime, cinema_address)
            VALUES (?, ?, ?, ?, ?, ?);
        `;

        connection.query(insertTicketQuery, [userId, movie_id, cinemaName, seatNumber, showtime, cinemaAddress], (err, results) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error inserting ticket:', err);
                    res.status(500).send('Error inserting ticket');
                });
            }

            // Query to update the seat as booked
            const updateSeatQuery = `
                UPDATE Seats SET is_booked = true WHERE seat_id = ? AND showtime_id = ?;
            `;

            connection.query(updateSeatQuery, [seatNumber, showtimeId], (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error updating seat:', err);
                        res.status(500).send('Error booking seat');
                    });
                }
                // Commit the transaction
                connection.commit(err => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error committing transaction:', err);
                            res.status(500).send('Transaction commit failed');
                        });
                    }

                    res.send('Ticket booked and seat updated successfully');
                });
            });
        });
    });
});




app.get('/api/tickets/user/:userId', async(req, res) => {
    const { userId } = req.params; // Extract the user ID from the URL parameters

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    const query = `
        SELECT * FROM tickets WHERE user_id = ?
    `;

    try {
        const [tickets] = await connection.promise().query(query, [userId]);
        if (tickets.length === 0) {
            return res.status(404).send('No tickets found for this user');
        }
        res.json(tickets);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Failed to retrieve tickets');
    }
});
app.get('/info/movies/:id', async(req, res) => {
    const { id } = req.params;
    const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTY5M2NmNTFhYTFkMjI3ZDNmMTM3NmRiMmNjY2Y3ZCIsInN1YiI6IjY1OTU1ZTYyNTkwN2RlMmNmNzYzYmVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.081mtreNm2pj0iZBu4cLmhAUQQaq3eHNZYm2nUly6Mo';

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            headers: {
                Authorization: `Bearer ${BEARER_TOKEN}`
            }
        });
        const movieData = response.data;
        res.json(movieData);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({ error: 'Failed to fetch movie details' });
    }
});
app.post('/api/showtimes', (req, res) => {
    const { movie_id, show_datetime } = req.body; // Adjusted to use a single datetime field
    const showtimeQuery = `INSERT INTO Showtimes (movie_id, show_datetime) VALUES (?, ?)`;

    connection.query(showtimeQuery, [movie_id, show_datetime], (err, result) => {
        if (err) {
            res.status(500).send('Error adding showtime');
            return;
        }

        // If the showtime is successfully added, generate 100 seats for this showtime
        const showtimeId = result.insertId;
        const seats = [];
        for (let i = 1; i <= 100; i++) {
            seats.push([showtimeId, i, false]);
        }

        const seatsQuery = 'INSERT INTO Seats (showtime_id, seat_number, is_booked) VALUES ?';
        connection.query(seatsQuery, [seats], (err, result) => {
            if (err) {
                res.status(500).send('Error adding seats');
            } else {
                res.status(201).send('Showtime and seats added successfully', );
            }
        });
    });
});



app.get("/api/showtimes/movies", async(req, res) => {
    try {
        // Extract unique movie IDs from showtimes table
        const query = "SELECT DISTINCT movie_id, show_datetime, showtime_id FROM showtimes ORDER BY show_datetime";
        connection.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Error fetching movie IDs" });
            }

            // Map movie IDs to fetch details
            const movieDetailsPromises = results.map((result) =>
                axios.get(`https://api.themoviedb.org/3/movie/${result.movie_id}`, {
                    headers: {
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTY5M2NmNTFhYTFkMjI3ZDNmMTM3NmRiMmNjY2Y3ZCIsInN1YiI6IjY1OTU1ZTYyNTkwN2RlMmNmNzYzYmVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.081mtreNm2pj0iZBu4cLmhAUQQaq3eHNZYm2nUly6Mo`
                    }
                })
                .then(response => ({
                    movie_id: result.movie_id,
                    show_datetime: result.show_datetime,
                    showtime_id: result.showtime_id,
                    details: response.data
                }))
            );

            // Process all promises and return movie details with showtimes
            Promise.all(movieDetailsPromises)
                .then(movieDetails => {
                    res.json(movieDetails);
                })
                .catch(error => {
                    console.error("Error fetching movie details:", error);
                    res.status(500).json({ error: "Error fetching movie details" });
                });
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.get('/available-seats/:showtimeId', (req, res) => {
    const showtimeId = req.params.showtimeId;
    const query = `SELECT seat_id, seat_number, is_booked FROM Seats WHERE showtime_id = ?`;

    connection.query(query, [showtimeId], (err, results) => {
        if (err) {
            res.status(500).send('Error fetching seats data');
            return;
        }
        res.json(results); // This will send an array of objects with seat_id, seat_number, and is_booked
    });
});

app.delete("/api/showtimes/movies/:showtimeId", (req, res) => {
    const showtimeId = req.params.showtimeId;
    const query = "DELETE FROM showtimes WHERE showtime_id = ?";

    connection.query(query, [showtimeId], (error, results) => {
        if (error) {
            console.error("Error deleting showtime:", error);
            return res.status(500).json({ error: "Error deleting showtime" });
        }
        res.json({ message: "Showtime deleted successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});