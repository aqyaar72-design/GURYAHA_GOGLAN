// =========================================
// ELITE FURNISHED HOMES
// CONTACT MESSAGE SYSTEM
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

const contactForm =
    document.getElementById(
        "contactForm"
    );


// =========================================
// GET MESSAGE
// =========================================

const contactMessageStatus =
    document.getElementById(
        "contactMessageStatus"
    );


// =========================================
// GET BUTTON
// =========================================

const contactSubmitButton =
    document.getElementById(
        "contactSubmitButton"
    );


// =========================================
// SUBMIT CONTACT FORM
// =========================================

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // =====================================
            // GET VALUES
            // =====================================

            const name =
                document
                    .getElementById(
                        "contactName"
                    )
                    .value
                    .trim();


            const phone =
                document
                    .getElementById(
                        "contactPhone"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "contactEmail"
                    )
                    .value
                    .trim();


            const subject =
                document
                    .getElementById(
                        "contactSubject"
                    )
                    .value
                    .trim();


            const message =
                document
                    .getElementById(
                        "contactMessage"
                    )
                    .value
                    .trim();


            // =====================================
            // VALIDATION
            // =====================================

            if (
                !name ||
                !phone ||
                !email ||
                !subject ||
                !message
            ) {

                showContactMessage(
                    "Fadlan buuxi dhammaan meelaha.",
                    "error"
                );

                return;
            }


            // =====================================
            // BUTTON LOADING
            // =====================================

            if (contactSubmitButton) {

                contactSubmitButton.disabled =
                    true;

                contactSubmitButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            }


            // =====================================
            // SEND TO SUPABASE
            // =====================================

            try {

                const { error } =
                    await supabaseClient
                        .from(
                            "contact_messages"
                        )
                        .insert({

                            name: name,

                            phone: phone,

                            email: email,

                            subject: subject,

                            message: message

                        });


                // =================================
                // ERROR
                // =================================

                if (error) {

                    console.error(
                        "CONTACT SUPABASE ERROR:",
                        error
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


                    showContactMessage(
                        "Fariinta lama dirin. Fadlan isku day mar kale.",
                        "error"
                    );


                    restoreContactButton();

                    return;
                }


                // =================================
                // SUCCESS
                // =================================

                console.log(
                    "================================="
                );

                console.log(
                    "✅ CONTACT MESSAGE SENT"
                );

                console.log(
                    "================================="
                );


                showContactMessage(
                    "✅ Mahadsanid! Fariintaada si guul leh ayaa loo diray.",
                    "success"
                );


                // =================================
                // RESET FORM
                // =================================

                contactForm.reset();


                // =================================
                // RESTORE BUTTON
                // =================================

                restoreContactButton();

            }


            // =====================================
            // CATCH ERROR
            // =====================================

            catch (error) {

                console.error(
                    "CONTACT SYSTEM ERROR:",
                    error
                );


                showContactMessage(
                    "Wax qalad ah ayaa dhacay. Fadlan isku day mar kale.",
                    "error"
                );


                restoreContactButton();

            }

        }
    );

}


// =========================================
// SHOW CONTACT MESSAGE
// =========================================

function showContactMessage(
    message,
    type
) {

    if (!contactMessageStatus) {

        console.error(
            "contactMessageStatus lama helin."
        );

        return;
    }


    contactMessageStatus.textContent =
        message;


    contactMessageStatus.className =
        "booking-message " +
        type;


    contactMessageStatus.style.display =
        "block";
}


// =========================================
// RESTORE BUTTON
// =========================================

function restoreContactButton() {

    if (!contactSubmitButton) {

        return;
    }


    contactSubmitButton.disabled =
        false;


    contactSubmitButton.innerHTML =
        'Send Message <span>→</span>';
}