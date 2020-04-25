import * as React from 'react'
import Layout from 'antd/es/layout/layout';
import Typography from 'antd/es/typography';
import Space from "antd/es/space";
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

import SearchControl from "../SearchControl/SearchControl";
import DataTable from "../DataTable/DataTable";

const { Title, Paragraph, Text } = Typography;
const { Header, Footer, Content } = Layout;

const POKEMONS = gql`
query Pokemons($q: String, $after: ID) {
  pokemons (q: $q, after: $after) {
    edges {
      node {
        id
        classification
        name
        types
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;

const PageLayout: React.FC = () => {
  const [searchKey, setSearchKey] = React.useState('');
  const [
    executePokemonsQuery,
    {
      loading: pokemonsLoading,
      error: pokemonsError,
      data: pokemonsData,
      fetchMore: fetchMorePokemons
    }
  ] = useLazyQuery(POKEMONS);

  const searchByName = (value: string, event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setSearchKey(value);
    executePokemonsQuery({ variables: { q: value, after: '' } });
  };

  const getNextPage = (): void => {
    fetchMorePokemons({
      variables: {
        q: searchKey,
        after: pokemonsData.pokemons.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.pokemons.edges;
        const newPageInfo = fetchMoreResult.pokemons.pageInfo;

        return newEdges.length
          ? {
            pokemons: {
              edges: [...previousResult.pokemons.edges, ...newEdges],
              pageInfo: { ...newPageInfo },
              __typename: previousResult.pokemons.__typename,
            }
          }
          : previousResult;
      }
    });
  }

  return (
    <Layout>
      <Header style={{ height: "auto", background: "#ee1515", borderBottom: "15px solid #222224" }}>
        <div style={{ padding: "0.5rem 0" }}>
          <Title style={{ marginBottom: "0", color: "#dfdfdf" }}>Pokemon Search App</Title>
          <Text disabled style={{ color: "#dfdfdf" }}>Because building a new app for something easily searchable by Google is cool 😎 <small>(at least is not a todo app!)</small></Text>
        </div>
        <Space>
          <SearchControl searchHandler={searchByName} placeholder="Search by name" />
        </Space>
      </Header>
      <Content style={{ padding: "2rem", background: "#f0f0f0", textAlign: "center" }}>
        {
          // Not the best way to do logic in a react App but I don't know how much time do I have.
          pokemonsError ?
            <Paragraph>Something bad happened to our PokeDex {pokemonsError.message}</Paragraph> :
            pokemonsLoading ?
              <Paragraph>Fetching from the PokeDex...</Paragraph> :
              !pokemonsData ?
                <Paragraph>Search for a Pokemon's name from the top SearchBox</Paragraph> :
                <DataTable data={pokemonsData} getNextPage={getNextPage} />
        }
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Pokemon Search App ©2020 Created by Alberto <a href="https://github.com/alpe89" target="_blank">"Alpe89 🐕"</a> Pertusi
    </Footer>
    </Layout>
  )
};

export default PageLayout;