import "./main.css";
import Typewriter from "typewriter-effect";
import Background from "../../assets/d3fineBG.png";

const typeWriterData = {
  first: "Yourself",
  second: "Tú mismo",
  third: "Du selbst",
  fourth: "Toi-même",
  fifth: "Te stesso",
};

export default function HomePage() {
  return (
    <div class="homePageContainer">
      <div class="textSection">
        <div>
          Define
          <span className="typeFont">
            <Typewriter className="mainTypewriter"
              options={{
                strings: [
                  typeWriterData.first,
                  typeWriterData.second,
                  typeWriterData.third,
                  typeWriterData.fourth,
                  typeWriterData.fifth,
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 10,
              }}
            />
          </span>
        </div>
        <p>
          A personality test generator.
          <br /> Create and share assessments with <br />
          non-numerical results.
        </p>
      </div>
      <img src={Background} />
    </div>
  );
}
