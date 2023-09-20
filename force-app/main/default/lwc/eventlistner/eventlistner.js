import { LightningElement } from 'lwc';

export default class Eventlistner extends LightningElement {

    handleScroll(event) {
        const box = document.querySelector('.box');
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            box.style.top = `${scrollTop / 2}px`;
        });
    }

    customEvent() {
        const event = new CustomEvent("custom-event", { bubbles: true, composed: true });
        this.dispatchEvent(event);
        console.log(`Custom Event Fired`);
    }

    changeColor(event) {
        const btn = document.querySelector("button");

        function random(number) {
            return Math.floor(Math.random() * (number + 1));
        }

        btn.addEventListener("click", () => {
            const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
            document.body.style.backgroundColor = rndCol;

        });
    }

    async fetchProducts() {
        try {
            const response = await fetch(
                "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
            );
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            const data = await response.json();
            console.log(data[0].name);
        } catch (error) {
            console.error(`Could not get products: ${error}`);
        }
    }
    // fetchProducts();

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(String(password));
    }

    validateForm() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (!validatePassword(password)) {
            alert("Please enter a strong password.");
            return false;
        }

        return true;
    }

}
