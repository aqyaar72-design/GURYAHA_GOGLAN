// =========================================
// ELITE FURNISHED HOMES
// RECEIPT SYSTEM
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
// GET BOOKING ID
// =========================================

const params =
    new URLSearchParams(
        window.location.search
    );


const bookingId =
    params.get("id");


// =========================================
// LOAD RECEIPT
// =========================================

async function loadReceipt() {

    if (!bookingId) {

        alert(
            "Booking ID lama helin."
        );

        return;
    }


    const { data, error } =
        await supabaseClient
            .from("bookings")
            .select("*")
            .eq("id", bookingId)
            .single();


    if (error) {

        console.error(error);

        alert(
            "Receipt-ka lama heli karin."
        );

        return;
    }


    // CUSTOMER

    document.getElementById(
        "customerName"
    ).textContent =
        data.full_name || "—";


    document.getElementById(
        "customerPhone"
    ).textContent =
        data.phone || "—";


    document.getElementById(
        "customerEmail"
    ).textContent =
        data.email || "—";


    document.getElementById(
        "homeType"
    ).textContent =
        data.home_type || "—";


    // RENTAL

    document.getElementById(
        "checkIn"
    ).textContent =
        data.check_in || "—";


    document.getElementById(
        "checkOut"
    ).textContent =
        data.check_out || "—";


    document.getElementById(
        "adults"
    ).textContent =
        data.adults || "0";


    document.getElementById(
        "children"
    ).textContent =
        data.children || "0";


    // PAYMENT

    const amount =
        Number(
            data.amount_paid || 0
        );


    document.getElementById(
        "monthlyRent"
    ).textContent =
        "$" + amount;


    document.getElementById(
        "amountPaid"
    ).textContent =
        "$" + amount;


    document.getElementById(
        "totalPaid"
    ).textContent =
        "$" + amount;


    document.getElementById(
        "paymentMethod"
    ).textContent =
        data.payment_method || "—";


    // RECEIPT NUMBER

    document.getElementById(
        "receiptNumber"
    ).textContent =
        data.receipt_number || "—";


    // PAYMENT DATE

    document.getElementById(
        "paymentDate"
    ).textContent =
        data.payment_date || "—";


    // SAVE WHATSAPP NUMBER

    window.customerWhatsApp =
        data.whatsapp || data.phone || "";

}


// =========================================
// DOWNLOAD / PRINT PDF
// =========================================

function downloadReceipt() {

    window.print();

}


// =========================================
// WHATSAPP
// =========================================

function sendWhatsApp() {

    if (!window.customerWhatsApp) {

        alert(
            "WhatsApp number lama helin."
        );

        return;
    }


    const phone =
        window.customerWhatsApp
            .replace(
                /\D/g,
                ""
            );


    const message =
        `Assalaamu Alaikum,

ELITE FURNISHED HOMES

Payment Receipt

Receipt Number:
${document.getElementById("receiptNumber").textContent}

Customer:
${document.getElementById("customerName").textContent}

Home:
${document.getElementById("homeType").textContent}

Check-in:
${document.getElementById("checkIn").textContent}

Check-out:
${document.getElementById("checkOut").textContent}

Amount Paid:
${document.getElementById("amountPaid").textContent}

Payment Status:
PAID

Mahadsanid inaad dooratay ELITE FURNISHED HOMES.`;


    const url =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


// =========================================
// START
// =========================================

loadReceipt();