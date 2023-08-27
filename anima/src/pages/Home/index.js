import "./main.css";
import animaParticles from "../../components/ Particles";
import Typewriter from 'typewriter-effect';






const typeWriterData = {
  animated: {
      first: "Self",
      second: "Self",
      third: "Self",
      fourth: "Self",
      fifth: "Self",
  }
};

export default function HomePage() {
  return (
    <>
    <div class="homePageContainer">
      <a>
        Define<br></br>Your
        <span className="typeFont">
        <Typewriter 
                    options={{
                      strings: [
                        typeWriterData.animated.first,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}/>
      </span>
      <p>A personality test generator.<br/> Create and share assessments with <br/>
         non-numerical results.</p>
      </a>
                    <div class="backgroundEffect"></div>
    </div>
    </>
  );
}
