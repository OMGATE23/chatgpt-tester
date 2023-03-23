import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});

function App() {
  const [location , setLocation] = useState('')
  const [precautions , setPrecautions] = useState([])
  async function getResponse() {
    const openai = new OpenAIApi(configuration);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Give safety precautions to be taken in ${location} in a javascript array format without declaring the variable and holding every element of the list in double quotes having no commas in between without any sort of introduction. make sure no text of any sort is mentioned before or after the array. Make sure the array can be parsed using JSON.parse() function`,
        temperature : 0.7,
        max_tokens : 256
      });
      let res = (response.data.choices[0].text.trim());
      console.log(res)
      res = res.replace(/'/g, '"');
      
      console.log(JSON.parse(res))
      setPrecautions(JSON.parse(res))
      
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="App">
      <input type = "text" onChange={(e) => setLocation(e.target.value)} />
      <button onClick={getResponse}>Click to get response</button>
      <ul>
      {precautions && precautions.map( (item , i) => (
        <li key = {i}>{item}</li>
      ))}
      </ul>
      
    </div>
  );
}

export default App;
