import "./main.css";
import { ReactComponent as Firebase } from "../../assets/firebase.svg";
import { ReactComponent as Tailwind } from "../../assets/tailwind.svg";
import { ReactComponent as React } from "../../assets/react.svg";
import { ReactComponent as Node } from "../../assets/node.svg";
import { ReactComponent as Mongo } from "../../assets/mongo.svg";
import { ReactComponent as Github } from "../../assets/github.svg";
export default function AboutPage() {
  return (
    <div className="aboutContainer">
      <h1>What is D3fine?</h1>
      <p className="aboutBlurb">
        D3fine is a multiple choice test generator created to help users make
        choices, which are generated based off a users answers for any given
        assessment. Whether it be to help decide what cuisine to eat for lunch,
        what kind of vehicle to buy, or what role to play in DnD, D3fine is
        here to help.
      </p>
      <h1>Meet the team:</h1>
      <div className="team">
        <div className="teamMember">
          <h2>Angel Puente</h2>
          <p>Frontend Lead</p>
          <a href="https://www.angel-puente.dev/" target="_blank" rel="noreferrer">
            <img src="https://avatars.githubusercontent.com/u/100241450?v=4" alt="Angel Puente"/>
          </a>
          <a href="https://github.com/tetonkaa">
            <Github />
          </a>
        </div>
        <div className="teamMember">
          <h2>Julian Beard</h2>
          <p>Software Architect</p>
          <a href="https://julianbeard.codes/" target="_blank" rel="noreferrer">
            <img src="https://avatars.githubusercontent.com/u/66289893?v=4" alt="Julian Beard"/>
          </a>
          <a href="https://github.com/badjab326">
            <Github />
          </a>
        </div>
      </div>
      <div>
        <h2>Made with:</h2>
        <div className="techSvgs">
          <a href="https://firebase.google.com/" target="_blank" rel="noreferrer">
            <Firebase />
          </a>
          <a href="https://react.dev/" target="_blank" rel="noreferrer">
            <React />
          </a>
          <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
            <Tailwind />
          </a>
          <a href="https://nodejs.org/en" target="_blank" rel="noreferrer">
            <Node />
          </a>
          <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
            <Mongo />
          </a>
        </div>
      </div>
    </div>
  );
}
