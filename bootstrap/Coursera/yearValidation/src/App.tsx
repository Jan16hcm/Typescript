import { useState } from "react";
import "./App.css";

const message = new Map<boolean, string>([
  [true, "Success! Year entered is within the valid range"],
  [
    false,
    "Error! Year is outside the valid range, please enter year between 2000-2026 only",
  ],
]);

function App() {
  const [year, setYear] = useState<string>("2000");
  const [isValid, setValid] = useState<boolean>(false);
  const [isChange, setChange] = useState<boolean>(true);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(e.target.value);
    setChange(true);
  };

  function handleValidation(e: React.FormEvent): void {
    e.preventDefault();
    setChange(false);
    if(isNaN(Number(year)) || year.trim() === "" || Number(year) < 2000 || Number(year) > 2026) {
      setValid(false);
    } else {
      setValid(true)
    }
    
  }

  return (
    <>
      <div className="container mt-5">
        <div className="">
          <h3 className="text-center">Year Validation 2026</h3>
          <p className="text-center">
            Please enter a valid year between 2000-2026
          </p>
        </div>

        <form action="" onSubmit={handleValidation}>
          <div className="d-flex-column justify-content-center">
            <input
              type="number"
              name="numberForm"
              id="numberForm"
              className="form-control"
              placeholder="Enter year"
              value={year}
              onChange={handleYearChange}
            />

            <input
              type="range"
              name="rangeForm"
              id="rangeForm"
              min="1900"
              max="2100"
              value={year}
              onChange={handleYearChange}
              className="form-range d-block mx-auto mt-4"
              style={{ height: "5px", width: "80%" }}
            />

            <button
              type="submit"
              className="btn btn-primary d-block mx-auto mt-4"
            >
              Validate
            </button>
          </div>
        </form>

        <div className={`alert ${isValid ? "alert-success" : "alert-danger"} mt-3 ${isChange ? "d-none" : "d-block"}`}>{message.get(isValid)}</div>
      </div>
    </>
  );
}
export default App;
