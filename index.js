// header
const navbar = document.querySelector("body > header");
window.addEventListener("scroll", function () {
    navbar.classList.toggle("sticky", window.scrollY > 0)
});

//Responsive nav
const toggler = document.querySelector('.mob-Navtoggler i');
const mobileNav = document.querySelector('.mobileNavBar');
const close = document.querySelector('.close i');

toggler.addEventListener('click', () => {
    mobileNav.classList.add('onMobile');
});

close.addEventListener('click', () => {
    mobileNav.classList.remove('onMobile');
});

// active side navbar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.sidebar a, .mobNav-items a');
let icons = document.querySelectorAll('.sidebar a i, .mobNav-items a i');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top + 40 >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.sidebar a[href*=' + id + ']').classList.add('active');
                document.querySelector('.mobileNavBar a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

// date and time
function updateClock() {
    const now = new Date();
    let dname = now.getDay();
    mo = now.getMonth();
    dnum = now.getDate();
    yr = now.getFullYear();
    hou = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    pe = "AM";

    if (hou == 0) {
        hou = 12;
    }
    if (hou > 12) {
        hou = hou - 12;
        pe = "PM";
    }

    Number.prototype.pad = function (digits) {
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
    let values = [days[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe]
    for (let i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}

function initClock() {
    window.setInterval("updateClock()", 1);
}



//contact-form
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
                console.log('SUCCESS!');
                alert("Message sent successfully");

                name.value = "";
                email.value = "";
                subject.value = "";
                message.value = "";

            }, (error) => {
                console.log('FAILED...', error);
                alert("Someting went wrong");
            });
    });

};