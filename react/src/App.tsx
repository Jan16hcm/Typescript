import "./App.css";
import reactLogo from "./assets/react.svg";
const welcome: string[] = ["Khải", "Khang", "Bin", "Ben"];

function randomName(): string {
  return welcome[Math.floor(Math.random() * welcome.length)];
}

const isLogin: boolean = Math.random() > 0.5 ? true : false;

type Person = {
  name: string,
  age: number
};

const person: Person = {
  name: "Khai",
  age: 38
};

const {name, age} = person;

function Header() {
  const today = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  return (
    <>
      <h1>Chào mừng bạn đến với thế giới React!</h1>

      <p>
        Hôm nay là <strong>{today}</strong>. Thời gian hiện tại{" "}
        <strong>{time}</strong>
      </p>
      <h2>Chào {randomName()}</h2>

      <p>
        {isLogin ? `Chào ${name}, Tuổi ${age}` : "Hãy đăng nhập"}
      </p>
      <div>
        <img src={reactLogo} alt="ReactLogo" />

      </div>
    </>
  );
}

function App() {
  return (
    <>
      <Header />
    </>
  );
}

export default App;
