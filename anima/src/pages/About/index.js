import "./main.css";
import {ReactComponent as Firebase} from '../../assets/firebase.svg'
import {ReactComponent as Tailwind} from '../../assets/tailwind.svg'
import {ReactComponent as React} from '../../assets/react.svg'
export default function AboutPage() {
    return(
    <div className="aboutContainer">
    <h1>What is D3fine?</h1>
    <p>D3fine is a multiple choice test generator created to help users make choices , which are generated based off a users answers for any given assessment. Whether it be to help decide what cuisine to eat for lunch, what kind of vehicle to buy, or what role to play in DnD...D3fine is here to help.
    </p>
    <h2>Made with:</h2>
    <div className="techSvgs">
    <Firebase />
    <React />
    <Tailwind />
    </div>
    </div>
    )
}