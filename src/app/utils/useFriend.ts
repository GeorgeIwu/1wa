import React, {useState, useEffect} from 'react'
import {getFriend} from './helpers'
import {useStorage} from './useStorage';

export type FriendType = {
  id: number
  name: string
  screen_name: string
  description: string
  profile_image_url: string
  profile_background_image_url: string
  profile_banner_url: string
}

type FriendsType = Record<string, FriendType>

export type FavoriteFriendType = {
  friendID: number
}

const getAddFavorite = (favoriteFriends: FavoriteFriendType[], setData: React.Dispatch<any>) => (friendID: number) => {
  const favFriends = favoriteFriends.slice()
  const existingFavoriteFriends = favFriends.find((i: FavoriteFriendType) => i.friendID === friendID)

  if (!existingFavoriteFriends) {
    favFriends.push({ friendID })
    setData(favFriends)
  }
}

const getRemoveFavorite = (favoriteFriends: FavoriteFriendType[], setData: React.Dispatch<any>) => (friendID: number) => {
  const favFriends = favoriteFriends.slice()
  const favoriteFriendIndex = favFriends.findIndex((i: FavoriteFriendType) => i.friendID === friendID)

  if (favoriteFriendIndex > -1) {
    favFriends.splice(favoriteFriendIndex, 1)
    setData(favFriends)
  }
}

export const useFriend = (id?: string) => {
  const [friends, setFriends] = useState({} as FriendsType);
  const [favFriends, setFavoriteFriends] = useStorage(new Array<FavoriteFriendType>(), "_favoriteFriends");

  useEffect(() => {
    (async () => {
      const response = await getFriend(id) as any
      setFriends(response);
    })();
  }, [id]);

  const favoriteFriends = favFriends as FavoriteFriendType[]

  return {
    friends,
    favoriteFriends,
    addFavorite: getAddFavorite(favoriteFriends, setFavoriteFriends),
    removeFavorite: getRemoveFavorite(favoriteFriends, setFavoriteFriends),
  };
};

