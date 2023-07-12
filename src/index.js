import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { IssueProvider } from "./context/IssueContext";
import { HttpClient } from "./httpClient/httpClient";
import { IssueService } from "./service/IssueService";
import { GlobalStyle } from "../src/styles/GlobalStyles"


const root = ReactDOM.createRoot(document.getElementById('root'));

const httpClient = new HttpClient(
  process.env.REACT_APP_BASE_URL,
  process.env.REACT_APP_GITHUB_TOKEN,
);
const issueService = new IssueService(httpClient);

root.render(
  <IssueProvider issueService={issueService}>
    <GlobalStyle/>
    <App />
  </IssueProvider>
);