import gql from 'graphql-tag'

export const postAdded = () => {
  return gql`
    subscription posts($filter: _PostFilter, $first: Int, $offset: Int, $orderBy: [_PostOrdering]) {
      postAdded(filter: $filter, first: $first, offset: $offset, orderBy: $orderBy) {
        id
      }
    }
  `
}
