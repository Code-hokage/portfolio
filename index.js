// Sticky header
const navbar = document.querySelector("body > header");
window.addEventListener("scroll", function () {
    navbar.classList.toggle("sticky", window.scrollY > 0);
});

// Responsive navigation
const toggler = document.querySelector('.mob-Navtoggler i');
const mobileNav = document.querySelector('.mobileNavBar');
const close = document.querySelector('.close i');

toggler.addEventListener('click', () => {
    mobileNav.classList.add('onMobile');
});

close.addEventListener('click', () => {
    mobileNav.classList.remove('onMobile');
});

// Active side navbar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.sidebar a, .mobNav-items a');

window.addEventListener('scroll', () => {
    let top = window.scrollY + 40;
    sections.forEach(sec => {
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (document.querySelector('.sidebar a[href*=' + id + ']')) {
                    document.querySelector('.sidebar a[href*=' + id + ']').classList.add('active');
                }
                if (document.querySelector('.mobileNavBar a[href*=' + id + ']')) {
                    document.querySelector('.mobileNavBar a[href*=' + id + ']').classList.add('active');
                }
            });
        }
    });
});

// Date and time
function updateClock() {
    const now = new Date();
    const dname = now.getDay();
    const mo = now.getMonth();
    const dnum = now.getDate();
    const yr = now.getFullYear();
    let hou = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    let pe = "AM";

    if (hou === 0) {
        hou = 12;
    }
    if (hou > 12) {
        hou -= 12;
        pe = "PM";
    }

    Number.prototype.pad = function (digits) {
        return this.toString().padStart(digits, '0');
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
    const values = [days[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];

    ids.forEach((id, i) => {
        document.getElementById(id).textContent = values[i];
    });
}

function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

// Contact form
function sendMail() {
    document.getElementById('contact-form').addEventListener('submit', e => {
        e.preventDefault();

        const serviceID = "service_2l56jgl";
        const templateID = "template_tdvfoui";

        const inputFields = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
        };

        emailjs.send(serviceID, templateID, inputFields)
            .then(() => {
                alert("Message sent successfully");
                document.getElementById("contact-form").reset();
            }, (error) => {
                console.error('Failed to send message:', error);
                alert("Something went wrong");
            });
    });
}
