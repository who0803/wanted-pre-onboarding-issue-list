import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIssue } from "../context/IssueContext";
import Header from './../components/common/Header';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;
const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top-color: #333;
  animation: spin 1s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const IssueDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  header {
    position: relative;
    display: flex;
    align-items: center;
    width: 80%;
    margin-bottom: 2rem;

    img {
      width: 40px;
      height: 40px;
      border-radius: 20%;
      margin-right: 1rem;
    }
  }

  main {
    text-align: left;
    width: 80%;
    white-space: pre-line;
  }
`;
const IssueInfo = styled.div`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid black;
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
  }
`;
const CommentCount = styled.div`
  position: absolute;
  right: 5%;
  top: 30%;
`;

function IssueDetail() {
  let {owner, repo, id} = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { issue, getIssue} = useIssue();

  useEffect(() => {
    const initIssue = async () => {
      await getIssue(`/repos/${owner}/${repo}/issues/${id}`, ()=>{navigate('/NotFoundPage')});
      setIsLoading(false)
    }
    initIssue();
  }, [])

  return <IssueDetailContainer>
    {
      isLoading 
        ? <LoadingContainer><LoadingSpinner/></LoadingContainer>
        : <>
          <Header />
          <header>
            <img src={issue.user.avatar_url} alt='사진'/>
            <IssueInfo>
              <div><span>#{issue.number}</span> <span>{issue.title}</span></div>
              <div><span>작성자: {issue.user.login}</span> <span>작성일: {issue.created_at}</span></div>
              <CommentCount>댓글: {issue.comments}</CommentCount>
            </IssueInfo>
          </header>
          <main>{issue.body}</main>
        </>
    }
  </IssueDetailContainer>

}

export default IssueDetail;
