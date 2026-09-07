"use strict";


/* ========================================
MOBILE NAVIGATION
======================================== */

const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");

if (menuButton && navigation) {

menuButton.addEventListener("click", () => {

    const isOpen =
        menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
    );

    navigation.classList.toggle(
        "is-open",
        !isOpen
    );
});


navigation.addEventListener("click", (event) => {

    if (event.target.closest("a")) {

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        navigation.classList.remove(
            "is-open"
        );
    }
});
}


/* ========================================
QUOTE FORM
======================================== */

const quoteForm =
document.querySelector("[data-quote-form]");

const formError =
document.querySelector("[data-form-error]");


if (quoteForm && formError) {

quoteForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        formError.textContent = "";


        const formData =
            new FormData(quoteForm);


        const name =
            String(
                formData.get("name") || ""
            ).trim();


        const phone =
            String(
                formData.get("phone") || ""
            ).trim();


        const service =
            String(
                formData.get("service") || ""
            ).trim();


        const message =
            String(
                formData.get("message") || ""
            ).trim();


        if (
            !name ||
            !phone ||
            !service ||
            !message
        ) {

            formError.textContent =
                "Please complete all fields before continuing.";

            return;
        }


        const whatsappMessage = [
            "Hello TNE Plumbing, I would like to request a quote.",
            `Name: ${name}`,
            `Phone: ${phone}`,
            `Service: ${service}`,
            `Issue: ${message}`,
        ].join("\n");


        /*
          * URLSearchParams safely encodes
          * user-provided information.
          */

        const url =
            new URL(
                "https://api.whatsapp.com/send"
            );


        url.searchParams.set(
            "phone",
            "6585037300"
        );


        url.searchParams.set(
            "text",
            whatsappMessage
        );


        window.open(
            url.toString(),
            "_blank",
            "noopener,noreferrer"
        );
    }
);
}


/* ========================================
GOOGLE REVIEWS
======================================== */

/*
* These are genuine Google reviews selected
* manually from TNE Plumbing's Google listing.
*
* No Google API is used.
* No API key is exposed.
*/

const reviews = [

{
    author: "Richard Chan",
    text: "We had our kitchen sink had a choke prob as the waste water was flooding the kitchen floor , Thong Nian Jack Goh came to assess the prob n reassure us that his staff can solve such prob , at short notice of only two days , his team of staff came n clear the blockage n also did a CCTV scan to ensure the drain are cleared . It was a great relief to have our prob rectify with minimum inconvenient . Highly recommend to anyone who seek a speedy solution to their drainage prob. Richard Chan , Bedok"
},

{
    author: "WY Chong",
    text: "Excellent service! I contacted Jack regarding a choked pipe and he was incredibly swift with his response. His team arrived on time, cleared the choke efficiently, and charged a fair price. Highly recommend Jack and his team~"
},

{
    author: "KingSherDipØ",
    text: "WAH very good company help me alot leh the head contractor himself help do the pipe when chose jetting all very nice to do business with wah even send home"
},

{
    author: "kenneth K",
    text: "Jack responded quickly on WhatsApp and clearly explained the job and pricing. He confirmed everything before starting and completed the work efficiently—replacing an outdoor tap and fixing a bathroom leak. He also cleaned up after. Great workmanship, professional service, and fair pricing."
},

{
    author: "angela wong",
    text: "Jack responded very promptly to my Whatsapp enquiry. He was very clear on what was needed and provided itemised costing for each item. When he arrived, he verified all the works to be done and confirmed the costs before starting. His team took half an afternoon to bypass the water heater tank & drained it as well. Additionally, they installed 2 taps at various locations. Jack was very kind to sweep up the debris from the drilling. Wonderful experience with the team. Workmanship is good, tidy and reasonably priced."
},

{
    author: "keok choon seah",
    text: "Jack and his team of workers were very responsive and responsible. They are a group of very happy workers. Happy workers produce good work. They repaired our leaking toilet bowl and also regrouted the cracks between the tiles."
},

{
    author: "babablacksheep",
    text: "Had a drainage issues in my unit and decided to give thong Nian a try, Jack promptly replied me and assisted me the following day. Smooth and efficient team that got straight to the point. Highly recommend their service!"
},

{
    author: "Jonathan",
    text: "After 3 attempts to rectify my kitchen’s drainage issue, jack n his team finally manage to resolve my drainage issues. Jack ( believe is the boss) is patience in explaining the process and pricing is right. Will engage him for periodic maintenance."
},

{
    author: "Lin Yekai",
    text: "Superb customer service! Efficient and prompt replies to my queries. Despite the complexity of the job they have been very patient and immaculate with the installation. Pricing is very reasonable as well. Overall great experience! Thank you!"
},

{
    author: "Manoj prabhakar",
    text: "I reached out to them for a Plumbing issue. Their price provided is very reasonable comparing to the other ones I received. kudos to this Professional team for delivering such a good service."
}

];


/* ========================================
REVIEW ELEMENTS
======================================== */

const reviewCard =
document.getElementById(
    "testimonial-card"
);

const reviewText =
document.getElementById(
    "testimonial-text"
);

const reviewAuthor =
document.getElementById(
    "testimonial-author"
);

const previousButton =
document.getElementById(
    "testimonial-prev"
);

const nextButton =
document.getElementById(
    "testimonial-next"
);

const dotsContainer =
document.getElementById(
    "testimonial-dots"
);


/*
* Only initialise the carousel if the
* testimonial section exists.
*/

if (
reviewCard &&
reviewText &&
reviewAuthor
) {

let currentReview = 0;

let rotationTimer = null;

let transitionTimer = null;


const DISPLAY_TIME = 6000;

const FADE_TIME = 450;

const MIN_FONT_SIZE = 16;

const MAX_FONT_SIZE = 24;


/* ========================================
    FIT REVIEW TEXT
======================================== */

function fitReviewText() {

    const minFontSize = 15;
    const maxFontSize = 24;

    let fontSize = maxFontSize;

    /*
     * Always reset to the largest size first.
     */

    reviewText.style.fontSize =
        `${fontSize}px`;


    /*
     * Force the browser to calculate the
     * available dimensions.
     */

    void reviewText.offsetHeight;


    /*
     * Gradually reduce the font until the
     * entire review fits inside the allocated
     * review area.
     */

    while (
        reviewText.scrollHeight >
            reviewText.clientHeight &&
        fontSize > minFontSize
    ) {

        fontSize -= 0.5;

        reviewText.style.fontSize =
            `${fontSize}px`;
    }
}

/* ========================================
    UPDATE DOTS
======================================== */

function updateDots() {

    if (!dotsContainer) {
        return;
    }


    const dots =
        dotsContainer.querySelectorAll(
            ".testimonial-dot"
        );


    dots.forEach((dot, index) => {

        const active =
            index === currentReview;


        dot.classList.toggle(
            "is-active",
            active
        );


        if (active) {

            dot.setAttribute(
                "aria-current",
                "true"
            );

        } else {

            dot.removeAttribute(
                "aria-current"
            );
        }
    });
}


/* ========================================
    SHOW REVIEW
======================================== */

function showReview(
    index,
    animate = true
) {

    currentReview =
        (index + reviews.length) %
        reviews.length;


    const review =
        reviews[currentReview];


    /*
      * Cancel any previous transition.
      */

    if (transitionTimer !== null) {

        clearTimeout(
            transitionTimer
        );
    }


    if (!animate) {

        reviewText.textContent =
            review.text;

        reviewAuthor.textContent =
            review.author;


        requestAnimationFrame(() => {
            fitReviewText();
        });


        updateDots();

        return;
    }


    /*
      * Fade current review out.
      */

    reviewCard.classList.add(
        "is-changing"
    );


    transitionTimer =
        setTimeout(() => {


            /*
              * SECURITY:
              *
              * textContent is used instead
              * of innerHTML.
              */

            reviewText.textContent =
                review.text;

            reviewAuthor.textContent =
                review.author;


            /*
              * Allow browser to render the
              * new review before measuring it.
              */

            requestAnimationFrame(() => {

                fitReviewText();

                updateDots();


                requestAnimationFrame(() => {

                    reviewCard.classList.remove(
                        "is-changing"
                    );

                });

            });

        }, FADE_TIME);
}


/* ========================================
    CREATE DOTS
======================================== */

function createDots() {

    if (!dotsContainer) {
        return;
    }


    reviews.forEach(
        (review, index) => {

            const dot =
                document.createElement(
                    "button"
                );


            dot.type = "button";

            dot.className =
                "testimonial-dot";


            dot.setAttribute(
                "aria-label",
                `Show review from ${review.author}`
            );


            dot.addEventListener(
                "click",
                () => {

                    stopRotation();

                    showReview(index);

                    startRotation();
                }
            );


            dotsContainer.appendChild(
                dot
            );
        }
    );


    updateDots();
}


/* ========================================
    AUTOMATIC ROTATION
======================================== */

function startRotation() {

    stopRotation();


    rotationTimer =
        setInterval(
            () => {

                showReview(
                    currentReview + 1
                );

            },
            DISPLAY_TIME
        );
}


function stopRotation() {

    if (rotationTimer !== null) {

        clearInterval(
            rotationTimer
        );

        rotationTimer = null;
    }
}


/* ========================================
    NEXT / PREVIOUS BUTTONS
======================================== */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {

            stopRotation();

            showReview(
                currentReview + 1
            );

            startRotation();
        }
    );
}


if (previousButton) {

    previousButton.addEventListener(
        "click",
        () => {

            stopRotation();

            showReview(
                currentReview - 1
            );

            startRotation();
        }
    );
}


/* ========================================
    PAUSE ON HOVER
======================================== */

reviewCard.addEventListener(
    "mouseenter",
    stopRotation
);


reviewCard.addEventListener(
    "mouseleave",
    startRotation
);


/* ========================================
    PAUSE WHEN FOCUSED
======================================== */

reviewCard.addEventListener(
    "focusin",
    stopRotation
);


reviewCard.addEventListener(
    "focusout",
    startRotation
);


/* ========================================
    REFIT ON WINDOW RESIZE
======================================== */

window.addEventListener(
    "resize",
    () => {

        fitReviewText();
    }
);


/* ========================================
    REDUCED MOTION
======================================== */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (reducedMotion.matches) {

    reviewCard.style.transition =
        "none";
}


/* ========================================
    INITIALISE
======================================== */

createDots();

showReview(
    0,
    false
);

startRotation();

}