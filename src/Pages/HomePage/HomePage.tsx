import { Typography } from "@mui/material";
import React, { useState } from "react";
import { AppButton } from "../../Components/Button";
import { InputField } from "../../Components/InputField";
import { generalText } from "../../Text";
import { calcWinner, Data, searchWithBoyerMoore } from "./helpers";
import "./HomePage.css";

export function HomePage() {
  const [text, setText] = useState(generalText);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState<Data[]>([]);

  const onSearch = async () => {
    let RGXstart = performance.now();
    onRGXSearch();
    let RGXend = performance.now() - RGXstart;
    let BMstart = performance.now();
    onBMSearch();
    let BMend = performance.now() - BMstart;
    setTableData((p) => [...p, { bm: BMend, rgx: RGXend }]);
  };

  const onBMSearch = () => {
    let res: any = [];
    const length = search.split("")?.length;
    res = searchWithBoyerMoore(text.split(""), search.split(""));
    if (res.length === 0) {
      return setError("No results");
    }
    highlightText(res, length);
  };
  const onRGXSearch = () => {
    let textToSearch = search;
    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let pattern = new RegExp(`${textToSearch}`, "gi");
    let newText = text.replace(
      pattern,
      (match: any) => `<mark>${match}</mark>`
    );
    setText(newText);
  };
  const onReset = () => {
    setText(generalText);
    setError("");
    setSearch("");
    setTableData([]);
  };
  const highlightText = (res: any, length: any) => {
    const modifyText = text.split("");
    for (let i = 0; i < res.length; i++) {
      modifyText[res[i]] = `<mark>${modifyText[res[i]]}`;
      modifyText[res[i] + length - 1] = `${
        modifyText[res[i] + length - 1]
      }</mark>`;
    }
    setText(modifyText.join(""));
  };
  return (
    <div className="container">
      <div className="subcontainer">
        <Typography className="headline" variant="h4">
          Browser CTRL-F search simulation
        </Typography>
        <div className="buttonsContainer">
          <InputField
            value={search}
            errorMessage={error}
            onChange={setSearch}
          />
          <div className="buttons">
            <AppButton
              disabled={!search}
              onPress={() => {
                onSearch();
              }}
              text={"search"}
            />
            <AppButton onPress={onReset} text={"reset"} />
          </div>
        </div>
        <div className="resContainer">
          <table className="result">
            <tbody>
              <tr>
                <th>Boyer Moore</th>
                <th>Regex</th>
                <th>winner</th>
              </tr>

              {tableData.map((val) => {
                return (
                  <tr>
                    <td>{val.bm}</td>
                    <td>{val.rgx}</td>
                    <td>{calcWinner(val)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="pContainer">
          <p className="pText" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    </div>
  );
}
