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
        choices , which are generated based off a users answers for any given
        assessment. Whether it be to help decide what cuisine to eat for lunch,
        what kind of vehicle to buy, or what role to play in DnD...D3fine is
        here to help.
      </p>
      <h2>Meet the team:</h2>
      <div className="team">
        <div className="teamMember">
          <h3>Angel Puente</h3>
          <p>Frontend Lead</p>
          <a href="https://www.angel-puente.dev/">
            <img src="https://avatars.githubusercontent.com/u/100241450?v=4" />
          </a>
          <a href="https://github.com/tetonkaa">
            <Github />
          </a>
        </div>
        <div className="teamMember">
          <h3>Julian Beard</h3>
          <p>Software Architect</p>
          <a href="https://julianbeard.codes/">
            <img src="https://avatars.githubusercontent.com/u/66289893?v=4" />
          </a>
          <a href="https://github.com/badjab326">
            <Github />
          </a>
        </div>
      </div>
      <div>
        <h2>Made with:</h2>
        <div className="techSvgs">
          <a href="https://firebase.google.com/">
            <Firebase />
          </a>
          <a href="https://react.dev/">
            <React />
          </a>
          <a href="https://tailwindcss.com/">
            <Tailwind />
          </a>
          <a href="https://nodejs.org/en">
            <Node />
          </a>
          <a href="https://www.mongodb.com/">
            <Mongo />
          </a>
        </div>
      </div>
    </div>
  );
}
