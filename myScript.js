// header
const navbar = document.querySelector("body > header");
window.addEventListener("scroll", function () {
    navbar.classList.toggle("sticky", window.scrollY > 0)
});

//collapse nav

// active side navbar
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.sidebar a');
let icons = document.querySelectorAll('.sidebar a i');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.sidebar a[href*=' + id + ']').classList.add('active');
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


// contactForm
const contactForm = document.querySelector('.contact-form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function(){
        console.log(xhr.responseText);
        if(xhr.responseText == 'success'){
            alert('Email sent');
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        }else{
            alert('Something went wromg')
        }
    };

    xhr.send(JSON.stringify(formData));

});


