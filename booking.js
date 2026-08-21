// =========================================
// ELITE FURNISHED HOMES
// BOOKING SYSTEM
// =========================================

// =========================================
// SUPABASE
// =========================================

const SUPABASE_URL =
    "https://dytlvthjhicgllpibwcl.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_hkW0p_Je87clM7ug4619xg_0N0VVRVD";


// =========================================
// CREATE SUPABASE CLIENT
// =========================================

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// =========================================
// GET FORM
// =========================================

const bookingForm =
    document.getElementById("bookingForm");


// =========================================
// GET MESSAGE
// =========================================

const bookingMessage =
    document.getElementById("bookingMessage");


// =========================================
// SUBMIT BOOKING
// =========================================

if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // =====================================
            // GET FORM DATA
            // =====================================

            const fullName =
                document
                    .getElementById("fullName")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const whatsapp =
                document
                    .getElementById("whatsapp")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const homeType =
                document
                    .getElementById("homeType")
                    .value;


            const checkIn =
                document
                    .getElementById("checkIn")
                    .value;


            const checkOut =
                document
                    .getElementById("checkOut")
                    .value;


            const adults =
                document
                    .getElementById("adults")
                    .value;


            const children =
                document
                    .getElementById("children")
                    .value;


            const specialRequest =
                document
                    .getElementById("specialRequest")
                    .value
                    .trim();


            // =====================================
            // VALIDATION
            // =====================================

            if (
                !fullName ||
                !phone ||
                !email ||
                !homeType ||
                !checkIn ||
                !checkOut
            ) {

                showMessage(
                    "Fadlan buuxi dhammaan meelaha muhiimka ah.",
                    "error"
                );

                return;
            }


            // =====================================
            // CHECK DATE
            // =====================================

            if (checkOut <= checkIn) {

                showMessage(
                    "Check-out waa inuu ka dambeeyaa Check-in.",
                    "error"
                );

                return;
            }


            // =====================================
            // GET BUTTON
            // =====================================

            const button =
                bookingForm.querySelector(
                    ".book-now-button"
                );


            // =====================================
            // DISABLE BUTTON
            // =====================================

            if (button) {

                button.disabled = true;

                button.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }


            // =====================================
            // CREATE BOOKING REFERENCE
            // =====================================

            const now =
                new Date();


            const datePart =
                now
                    .toISOString()
                    .slice(0, 10)
                    .replace(/-/g, "");


            const timePart =
                now
                    .toTimeString()
                    .slice(0, 8)
                    .replace(/:/g, "");


            const randomPart =
                Math.floor(
                    10000 +
                    Math.random() * 90000
                );


            const bookingId =
                "ELITE-" +
                datePart +
                "-" +
                timePart +
                "-" +
                randomPart;


            console.log(
                "Generated Booking ID:",
                bookingId
            );


            // =====================================
            // SEND BOOKING TO SUPABASE
            // =====================================

            try {

                const { error } =
                    await supabaseClient
                        .from("bookings")
                        .insert({

                            // Booking reference
                            booking_reference:
                                bookingId,

                            // Customer
                            full_name:
                                fullName,

                            phone:
                                phone,

                            whatsapp:
                                whatsapp,

                            email:
                                email,

                            // Home
                            home_type:
                                homeType,

                            // Dates
                            check_in:
                                checkIn,

                            check_out:
                                checkOut,

                            // Guests
                            adults:
                                Number(adults),

                            children:
                                Number(children),

                            // Request
                            special_request:
                                specialRequest

                        });


                // =================================
                // SUPABASE ERROR
                // =================================

                if (error) {

                    console.error(
                        "================================="
                    );

                    console.error(
                        "SUPABASE ERROR"
                    );

                    console.error(
                        "================================="
                    );

                    console.error(
                        "MESSAGE:",
                        error.message
                    );

                    console.error(
                        "CODE:",
                        error.code
                    );

                    console.error(
                        "DETAILS:",
                        error.details
                    );

                    console.error(
                        "HINT:",
                        error.hint
                    );


                    showMessage(
                        "Booking-ka lama dirin. Fadlan isku day mar kale.",
                        "error"
                    );


                    // Enable button again

                    if (button) {

                        button.disabled = false;

                        button.innerHTML =
                            '<i class="fa-solid fa-calendar-check"></i> Book Now';
                    }


                    return;
                }


                // =================================
                // BOOKING SUCCESS
                // =================================

                console.log(
                    "================================="
                );

                console.log(
                    "✅ BOOKING SUCCESSFUL"
                );

                console.log(
                    "BOOKING ID:",
                    bookingId
                );

                console.log(
                    "================================="
                );


                // =================================
                // SAVE BOOKING ID
                // =================================

                localStorage.setItem(
                    "eliteBookingId",
                    bookingId
                );


                // =================================
                // SAVE BOOKING DATA
                // =================================

                const bookingData = {

                    booking_reference:
                        bookingId,

                    full_name:
                        fullName,

                    phone:
                        phone,

                    whatsapp:
                        whatsapp,

                    email:
                        email,

                    home_type:
                        homeType,

                    check_in:
                        checkIn,

                    check_out:
                        checkOut,

                    adults:
                        Number(adults),

                    children:
                        Number(children),

                    special_request:
                        specialRequest

                };


                localStorage.setItem(
                    "eliteBooking",
                    JSON.stringify(
                        bookingData
                    )
                );


                // =================================
                // SUCCESS MESSAGE
                // =================================

                showMessage(
                    "✅ Booking-kaaga si guul leh ayaa loo diray!",
                    "success"
                );


                // =================================
                // SHOW BOOKING ID
                // =================================

                let bookingIdMessage =
                    document.getElementById(
                        "bookingIdMessage"
                    );


                if (bookingIdMessage) {

                    bookingIdMessage.textContent =
                        "Booking ID: " +
                        bookingId;

                    bookingIdMessage.style.display =
                        "block";
                }


                // =================================
                // RESET FORM
                // =================================

                bookingForm.reset();


                // =================================
                // RESTORE BUTTON
                // =================================

                if (button) {

                    button.disabled = false;

                    button.innerHTML =
                        '<i class="fa-solid fa-calendar-check"></i> Book Now';
                }
                window.location.href = "confirmation.html";


            } catch (error) {

                // =================================
                // JAVASCRIPT / NETWORK ERROR
                // =================================

                console.error(
                    "BOOKING SYSTEM ERROR:",
                    error
                );


                showMessage(
                    "Wax qalad ah ayaa dhacay. Fadlan isku day mar kale.",
                    "error"
                );


                if (button) {

                    button.disabled = false;

                    button.innerHTML =
                        '<i class="fa-solid fa-calendar-check"></i> Book Now';
                }

            }

        }
    );

}


// =========================================
// SHOW MESSAGE
// =========================================

function showMessage(
    message,
    type
) {

    if (!bookingMessage) {

        console.error(
            "bookingMessage lama helin HTML-ka."
        );

        return;
    }


    bookingMessage.textContent =
        message;


    bookingMessage.className =
        "booking-message " +
        type;


    bookingMessage.style.display =
        "block";
}


// =========================================
// GET SAVED BOOKING ID
// =========================================

function getBookingId() {

    return localStorage.getItem(
        "eliteBookingId"
    );
}


// =========================================
// GET SAVED BOOKING DATA
// =========================================

function getBookingData() {

    const savedBooking =
        localStorage.getItem(
            "eliteBooking"
        );


    if (!savedBooking) {

        return null;
    }


    try {

        return JSON.parse(
            savedBooking
        );

    } catch (error) {

        console.error(
            "Booking data lama akhrin:",
            error
        );

        return null;
    }
}