import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FetchRandom() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [language, setLanguage] = useState("en");

  const fetchNewFactEnglish = () => {
    setLanguage("en");
    setRefresh(!refresh);
  };

  const fetchNewFactGerman = () => {
    setLanguage("de");
    setRefresh(!refresh);
  };

  useEffect(() => {
    axios
      .get(`https://uselessfacts.jsph.pl/random.json?language=${language}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, [refresh, language]);
  if (loading) {
    return <div>Loading Data....</div>;
  }
  return (
    <>
      <div>Random Facts Generator</div>
      <div className="facts-div">
        {loading ? "Loading..." : data ? data.text : "Rate Limit Exceeded ):"}
      </div>
      <div>{error ? error.message : ""}</div>
      <button onClick={fetchNewFactEnglish} className="fetchButton">
        Click To Generate In English
      </button>
      <button onClick={fetchNewFactGerman} className="fetchButton">
        Click To Generate In German
      </button>
    </>
  );
}
