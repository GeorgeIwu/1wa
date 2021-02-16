import React from 'react';
import styled from 'styled-components'
import { FriendType, useFriend } from '../../utils/useFriend';
import { useLanguageDispatch } from '../../utils/useLanguage';
import { FriendItem, SearchBar } from '../../components';

const Container = styled.div`
  padding: 0;
`
const FriendsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 2rem;
  padding-right: 2rem;
  margin: 60px auto;
  width: 100%;
  justify-content: center;

  @media (min-width: 768px) {
    padding-left: 0rem;
    padding-right: 0rem;
  }
`

const Main = () => {
  const { friends, favoriteFriends, addFavorite, removeFavorite } = useFriend()
  const { translate } = useLanguageDispatch()

  return (
    <Container>
      <SearchBar translate={translate} />
      <FriendsWrapper>
        {Object.entries(friends).map(([key, friend]: [string, FriendType]) => {

          const isFollowing = favoriteFriends.findIndex(f => f.friendID === friend.id) > -1
          return (
            <FriendItem
              key={`${key}`}
              friend={friend}
              follow={addFavorite}
              unfollow={removeFavorite}
              translate={translate}
              isFollowing={isFollowing}
            />
          )}
        )}
      </FriendsWrapper>
    </Container>
  );
}

export default Main;
