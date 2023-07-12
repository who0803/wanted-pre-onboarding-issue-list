import { createContext, useContext, useEffect, useState } from "react";

const IssueContext = createContext(null);

export const useIssue = () => useContext(IssueContext);

export function IssueProvider({ children, issueService }) {
  const [issue, setIssue] = useState(); 
  const [issueList, setIssueList] = useState([]); 
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const getIssue = async (url, cb) => {
    try {
      const res = await issueService.get(url);
      setIssue(res.data);
    } catch(err) {
      cb();
    }

  };
  const getNextIssueList = async (url, cb) => {
    try {
      const res = await issueService.getList(url);
      setPage((prev) => prev + 1);
      setIssueList((prev) => [...prev, ...res?.data?.filter(data => !data.pull_request)]);
      setIsEnd(res?.data?.length < 30);
    } catch(err) {
      cb();
      console.log(err)
    }
  };

  const reset = () => {
    setPage(1)
    setIssueList(()=> [])
  }

  return (
    <IssueContext.Provider value={{ issue, issueList, getIssue, getNextIssueList, page, isEnd, reset }}>
      {children}
    </IssueContext.Provider>
  );
}