import React  from 'react';
import { RouteComponentProps } from "react-router-dom";
import styled from 'styled-components'
import { useFriend } from '../../utils/useFriend';
import { useLanguageDispatch } from '../../utils/useLanguage';

const Container = styled.div`
  background: #fff none repeat scroll 0 0;
  border-radius: 15px;
  margin: 0px
  padding: 0px;
`
const Bg = styled.div<{img?: string}>`
  background-image: ${p => p.img ? `url(${p.img})` : "url(https://pbs.twimg.com/profile_banners/50988711/1384539792/600x200)"};
  background-position: 0 50%;
  background-size: 100% auto;
  border-bottom: 1px solid #e1e8ed;
  height: 200px;
  width: 100%;
  display: block !important;
`
const AvatarImg = styled.img`
  display: flex;
  background-color: #fff;
  margin: -80px auto 30px;
  align-items: center
  border: 2px solid #fff;
  border-radius: 50%;
  height: 160px;
  width: 160px;
`
const User = styled.div`
  padding: 20px;
`
const UserTop = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`

const Button = styled.div<{bg?: boolean}>`
  background-color: ${p => p.bg ? '#0062FF' : '#fff'};
  border: 2px solid #0062FF;
  color:  ${p => p.bg ? '#fff' : '#0062FF'};
  font-size: 12px;
  line-height: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 28px;
  border-radius: 10px;
  cursor: pointer;
`

const UserBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 10px;
`
const Social = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 16.41px;
  margin-bottom: 10px;
`

const Anchor = styled.a`
  font-weight: 400;
  font-size: 16px;
  line-height: 16.41px;
  margin-bottom: 10px;
`
const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  margin-bottom: 10px;
`

const Friend = (props: RouteComponentProps) => {
  const params = props.match.params as any
  const { friends, favoriteFriends, addFavorite, removeFavorite } = useFriend(params.id)
  const { translate } = useLanguageDispatch()

  const friend = friends[0]
  const isFollowing = friend && favoriteFriends.findIndex(f => f.friendID === friend.id) > -1

  const handleFollow = () => addFavorite(friend.id)
  const handleUnFollow = () => removeFavorite(friend.id)

  if (!friend) return null

  const title = friend.name
  const profilePic = friend.profile_image_url
  const bannerPic = friend.profile_banner_url
  const description = friend.description
  const alias = friend.screen_name

  return (
    <Container>
      <Bg img={bannerPic} />
      <AvatarImg alt="No name" src={profilePic} />
      <User>
        <UserTop>
          {isFollowing
            ? <Button bg onClick={handleUnFollow}>{translate("Following")}</Button>
            : <Button onClick={handleFollow}>{translate("Follow")}</Button>}
        </UserTop>
        <UserBottom>
          <Name>{title}</Name>
          <Anchor href="https://twitter.com/mertskaplan" />
          <Social>@<span>{alias}</span></Social>
          <Description>{description}</Description>
        </UserBottom>
      </User>
    </Container>
  );
}

export default Friend;

