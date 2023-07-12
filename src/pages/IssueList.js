import { useEffect, useState, Fragment } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useParams, useNavigate } from 'react-router-dom';
import { useIssue } from "../context/IssueContext";
import Header from '../components/common/Header';
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
const IssueListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ul {
    width: 80%;
  }

  img {
    width: 50%;
  }
`;
const IssueListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 2rem;
  border-bottom: 1px solid black;
  padding: 1rem;
  cursor: pointer;

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

const IssueList = () => {
  let { owner, repo } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { issueList, getNextIssueList, page, isEnd, reset } = useIssue();

  const onObserveTarget = async () => {
    await getNextIssueList(`/repos/${owner}/${repo}/issues?per_page=${30}&page=${page}&sort=comments`, () => { navigate('/NotFoundPage'); });
    console.log('inside callback fn', page);
  }

  const { loadingRef, isScrollEnd } = useIntersectionObserver(onObserveTarget, isEnd)

  useEffect(() => {
    const initIssueList = async () => {
      await onObserveTarget();
      setIsLoading(false);
    }
    initIssueList();

    return () => {
      reset();
    }
  }, [])

  return (
    <IssueListContainer>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : (
        <>
          <Header />
          <ul>
            {
              issueList?.map((issue, i) => 
                (i + 1) % 4 === 0 
                  ? <Fragment key={issue.id+i}>
                      <IssueListItem key={issue.id+i} onClick={() => {navigate(`/repos/${owner}/${repo}/issues/${issue.number}`)}}>
                          <div><span>#{issue.number}</span> <span>{issue.title}</span></div>
                          <div><span>작성자: {issue.user.login}</span> <span>작성일: {issue.created_at}</span></div>
                          <CommentCount>댓글: {issue.comments}</CommentCount>
                      </IssueListItem>
                      <li><a href='https://www.wanted.co.kr/' target='_blank' rel="noreferrer"><img src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100'/></a></li>
                    </Fragment>
                : <IssueListItem key={issue.id+i} onClick={() => {navigate(`/repos/${owner}/${repo}/issues/${issue.number}`)}}>
                    <div><span>#{issue.number}</span> <span>{issue.title}</span></div>
                    <div><span>작성자: {issue.user.login}</span> <span>작성일: {issue.created_at}</span></div>
                    <CommentCount>댓글: {issue.comments}</CommentCount>
                  </IssueListItem>
              )
            }
            { 
              isScrollEnd
                ? null
                : <LoadingContainer ref={loadingRef} >
                  <LoadingSpinner />
                </LoadingContainer>
            }
          </ul>
        </>
      )}
    </IssueListContainer>
  );
}

export default IssueList;
