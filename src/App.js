import Header from './containers/Header';
import Body from './containers/Body';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledPaper = styled(Paper)`
  padding: 2em;
`;

export default function App() {
  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Header />
        <Body />
      </StyledPaper>
    </Wrapper>
  );
};
