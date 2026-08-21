// =========================================
// ELITE FURNISHED HOMES
// MOBILE MENU
// =========================================

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNavigation =
    document.getElementById("mainNavigation");


if (
    mobileMenuButton &&
    mainNavigation
) {

    mobileMenuButton.addEventListener(
        "click",
        function () {

            mainNavigation.classList.toggle(
                "active"
            );

            mobileMenuButton.classList.toggle(
                "active"
            );


            const isOpen =
                mainNavigation.classList.contains(
                    "active"
                );


            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    // CLOSE MENU WHEN LINK IS CLICKED

    const menuLinks =
        mainNavigation.querySelectorAll("a");


    menuLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    mainNavigation.classList.remove(
                        "active"
                    );

                    mobileMenuButton.classList.remove(
                        "active"
                    );

                    mobileMenuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}