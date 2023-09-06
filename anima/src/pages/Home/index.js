import "./main.css";
import animaParticles from "../../components/ Particles";
import Typewriter from "typewriter-effect";

const typeWriterData = {
  animated: {
    first: "Self",
    second: "Self",
    third: "Self",
    fourth: "Self",
    fifth: "Self",
  },
};

export default function HomePage() {
  return (
    <div class="homePageContainer">
      <a>
        Define<br></br>Your
        <span className="typeFont">
          <Typewriter
            options={{
              strings: [typeWriterData.animated.first],
              autoStart: true,
              loop: true,
              deleteSpeed: 10,
            }}
          />
        </span>
        <p>
          A personality test generator.
          <br /> Create and share assessments with <br />
          non-numerical results.
        </p>
      </a>
      <img src="https://cdn.discordapp.com/attachments/1110618287924072449/1143063337379303444/tetonka._cascade_of_sillouhettes_in_different_solid_colors__dra_c0080f1f-57a3-4628-881d-95a1fb63cef7.png" />
    </div>
  );
}
