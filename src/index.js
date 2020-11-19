import logoReact from "./assets/images/logo.svg";
import "./styles/index.scss";



const logo = document.createElement("img");
logo.src = logoReact;

const app = document.querySelector("#root");
app.append(logo);

console.log("StarterKit");
