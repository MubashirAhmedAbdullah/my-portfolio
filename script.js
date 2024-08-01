import {
    app,
    analytics,
    db,
    collection,
    setDoc,
    addDoc,
    doc
} from "./utilis/utilis.js";



//toogle icon navbar


const menuicon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuicon.onclick = () => {
    menuicon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}
//scrool section

const sections = document.querySelectorAll('section');
const navlinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');


        if (top >= offset && top < offset + height) {
            //active navbar links

            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

            // acttive setion for animation on scroll

            sec.classList.add('show-animate')
        }
        else {
            sec.classList.remove('show-animate')

        }
    })
    //sticky header
    const header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);


    // remove toggle icon and navbar when click navbar links (scroll)

    menuicon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll

    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}





// firebase start here


console.log(app);
console.log(db);
console.log(analytics);


const sendBtn = document.getElementById('sendBtn');


sendBtn.addEventListener('click', ()=>{

sendBtn.innerHTML = 'Sending'
sendBtn.disabled = true

    // now importing all input field for using there values by getting there id's


const fullName = document.getElementById('fullName');
const emailAddress = document.getElementById('emailAddress');
const phoneNumber = document.getElementById('phoneNumber');
const mailingSubject = document.getElementById('mailingSubject');
const contractorMessage = document.getElementById('contractorMessage');


// now creating a object using these variables


const contractorDetails = {
    fullName: fullName.value,
    emailAddress: emailAddress.value,
    phoneNumber: phoneNumber.value,
    mailingSubject: mailingSubject.value,
    contractorMessage: contractorMessage.value,
}
// now sending the contractor details to the firebase database

const contractorDetailsCollection = collection(db, "contractor");
addDoc(contractorDetailsCollection, contractorDetails)
.then(()=>{
    console.log("Contractor details added to the database");
    window.location.href = './thanks page/index.html'
    sendBtn.innerHTML = 'Submit'
    sendBtn.disabled = false
})
    
})