// Password Strength Checker
const password = document.getElementById("password"); // input field
const strength = document.getElementById("strength");   // small text for strength

password.addEventListener("input", function() {
    let value = password.value;

    if(value.length < 4){
        strength.innerText = "Weak Password"; // <4 chars
        strength.style.color = "red";
    } else if(value.length < 8){
        strength.innerText = "Medium Password"; // 4-7 chars
        strength.style.color = "orange";
    } else {
        strength.innerText = "Strong Password"; // 8+ chars
        strength.style.color = "green";
    }
});
