// Typing effect
const textArray = ["Ganesh Jadhav", "a DevOps Engineer", "a Cloud Enthusiast", "a CI/CD Automation Expert"];
let textIndex = 0;
let charIndex = 0;
const typedText = document.querySelector(".typed-text");

function typeEffect() {
  if (charIndex < textArray[textIndex].length) {
    typedText.textContent += textArray[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typedText.textContent = textArray[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    textIndex = (textIndex + 1) % textArray.length;
    setTimeout(typeEffect, 200);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);
