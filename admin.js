// =========================================
// ELITE FURNISHED HOMES
// ADMIN DASHBOARD
// =========================================


const SUPABASE_URL =
    "https://dytlvthjhicgllpibwcl.supabase.co";


const SUPABASE_KEY =
    "sb_publishable_hkW0p_Je87clM7ug4619xg_0N0VVRVD";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// =========================================
// ELEMENTS
// =========================================

const loginForm =
    document.getElementById("loginForm");

const adminLogin =
    document.getElementById("adminLogin");

const adminDashboard =
    document.getElementById("adminDashboard");

const logoutButton =
    document.getElementById("logoutButton");

const bookingsTable =
    document.getElementById("bookingsTable");

const refreshBookings =
    document.getElementById("refreshBookings");


// =========================================
// LOGIN
// =========================================

loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("adminEmail")
                .value
                .trim();


        const password =
            document
                .getElementById("adminPassword")
                .value;


        const { data, error } =
            await supabaseClient.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {

            console.error(error);

            alert(
                "Email ama password waa khalad."
            );

            return;
        }


        console.log(
            "Admin login successful",
            data
        );


        showDashboard();

    }
);


// =========================================
// SHOW DASHBOARD
// =========================================

async function showDashboard() {

    adminLogin.style.display =
        "none";


    adminDashboard.style.display =
        "block";


    await loadBookings();

}


// =========================================
// LOAD BOOKINGS
// =========================================

async function loadBookings() {


    bookingsTable.innerHTML = `

        <tr>

            <td colspan="7">

                Loading bookings...

            </td>

        </tr>

    `;


    const { data, error } =
        await supabaseClient
            .from("bookings")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "BOOKINGS ERROR:",
            error
        );

        bookingsTable.innerHTML = `

            <tr>

                <td colspan="7">

                    Unable to load bookings.

                </td>

            </tr>

        `;

        return;
    }


    displayBookings(data);

    updateStatistics(data);

}


// =========================================
// DISPLAY BOOKINGS
// =========================================

function displayBookings(bookings) {


    if (!bookings.length) {

        bookingsTable.innerHTML = `

            <tr>

                <td colspan="7">

                    No bookings found.

                </td>

            </tr>

        `;

        return;
    }


    bookingsTable.innerHTML =
        bookings.map(function(booking) {


            const status =
                booking.status || "Pending";


            return `

                <tr>

                    <td>

                        <strong>
                            ${escapeHTML(
                                booking.full_name
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                booking.email
                            )}
                        </small>

                    </td>


                    <td>

                        ${escapeHTML(
                            booking.phone
                        )}

                    </td>


                    <td>

                        ${escapeHTML(
                            booking.home_type
                        )}

                    </td>


                    <td>

                        ${booking.check_in}

                    </td>


                    <td>

                        ${booking.check_out}

                    </td>


                    <td>

                        <span class="status ${status.toLowerCase()}">

                            ${status}

                        </span>

                    </td>


                    <td>

                        <div class="admin-actions">


                            <button
                                class="confirm-btn"
                                onclick="updateStatus(
                                    '${booking.id}',
                                    'Confirmed'
                                )"
                            >

                                <i class="fa-solid fa-check"></i>

                            </button>


                            <button
                                class="cancel-btn"
                                onclick="updateStatus(
                                    '${booking.id}',
                                    'Cancelled'
                                )"
                            >

                                <i class="fa-solid fa-xmark"></i>

                            </button>


                            <button
                                class="delete-btn"
                                onclick="deleteBooking(
                                    '${booking.id}'
                                )"
                            >

                                <i class="fa-solid fa-trash"></i>

                            </button>


                        </div>

                    </td>

                </tr>

            `;

        }).join("");

}


// =========================================
// UPDATE STATUS
// =========================================

async function updateStatus(
    id,
    status
) {


    const { error } =
        await supabaseClient
            .from("bookings")
            .update({

                status: status

            })
            .eq(
                "id",
                id
            );


    if (error) {

        console.error(error);

        alert(
            "Status-ka lama beddeli karin."
        );

        return;
    }


    await loadBookings();

}


// =========================================
// DELETE BOOKING
// =========================================

async function deleteBooking(id) {


    const confirmDelete =
        confirm(
            "Ma hubtaa inaad booking-kan tirtirayso?"
        );


    if (!confirmDelete) {

        return;
    }


    const { error } =
        await supabaseClient
            .from("bookings")
            .delete()
            .eq(
                "id",
                id
            );


    if (error) {

        console.error(error);

        alert(
            "Booking-ka lama tirtiri karin."
        );

        return;
    }


    await loadBookings();

}


// =========================================
// STATISTICS
// =========================================

function updateStatistics(bookings) {


    const total =
        bookings.length;


    const pending =
        bookings.filter(
            booking =>
                !booking.status ||
                booking.status === "Pending"
        ).length;


    const confirmed =
        bookings.filter(
            booking =>
                booking.status === "Confirmed"
        ).length;


    const cancelled =
        bookings.filter(
            booking =>
                booking.status === "Cancelled"
        ).length;


    document.getElementById(
        "totalBookings"
    ).textContent = total;


    document.getElementById(
        "pendingBookings"
    ).textContent = pending;


    document.getElementById(
        "confirmedBookings"
    ).textContent = confirmed;


    document.getElementById(
        "cancelledBookings"
    ).textContent = cancelled;

}


// =========================================
// REFRESH
// =========================================

refreshBookings.addEventListener(
    "click",
    loadBookings
);


// =========================================
// LOGOUT
// =========================================

logoutButton.addEventListener(
    "click",
    async function() {


        await supabaseClient.auth.signOut();


        adminDashboard.style.display =
            "none";


        adminLogin.style.display =
            "flex";


    }
);


// =========================================
// CHECK EXISTING SESSION
// =========================================

async function checkSession() {


    const {
        data: {
            session
        }
    } =
        await supabaseClient.auth.getSession();


    if (session) {

        showDashboard();

    }

}


checkSession();


// =========================================
// SECURITY
// =========================================

function escapeHTML(value) {

    if (!value) {
        return "";
    }

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}
function openReceipt(id) {
    window.open(
        `receipt.html?id=${encodeURIComponent(id)}`,
        "_blank"
    );
}