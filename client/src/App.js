import { gql, useMutation, useQuery, useApolloClient } from "@apollo/client";

const FIND_ALL_BOOKS = gql`
  query findAllBooks {
    findAllBooks {
      id
      author
      title
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(FIND_ALL_BOOKS);
  console.log(data);
  return <div className="App"></div>;
}

export default App;
