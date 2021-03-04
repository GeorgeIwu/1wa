import React, { memo } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { FriendType } from '../utils/useFriend';
import LazyImage from './LazyImage';
import LazyBackground from './LazyBackground';

const Container = styled.div`
  background: #fff none repeat scroll 0 0;
  border-radius: 15px;
  height: 246px;
  width: 480px;
  margin: 15px
`
const Bg = styled(LazyBackground)`
  background-position: 0 50%;
  background-size: 100% auto;
  border-bottom: 1px solid #e1e8ed;
  border-radius: 15px 15px 0 0;
  height: 100px;
  width: 100%;
  display: block !important;
`
const AvatarImg = styled(LazyImage)`
  background-color: #fff;
  display: inline-block !important;
  float: left;
  margin: -25px 5px 0 20px;
  max-width: 100%;
  vertical-align: bottom;
  border: 2px solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
  color: #fff;
  height: 86px;
  width: 86px;
`
const User = styled.div`
  margin: 5px 20px 0 120px;
`
const UserTop = styled.div`
  display: flex;
  justify-content: space-between;
`
const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
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

const Socail = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 16.41px;
  color: #333333 !important;
`

const Description = styled.div`
  font-weight: 400;
  margin-top: 15px;
  font-size: 16px;
  line-height: 26px;

  @media (max-width: 600px) {
    margin-top: 10px;
    font-size: 12px;
    line-height: 20px;
  }
`

const FriendItem = memo(({ friend, follow, unfollow, isFollowing = false, translate = (text: string) => text }: {
    friend: FriendType,
    follow: (id: number) => any,
    unfollow: (id: number) => any,
    isFollowing?: boolean,
    translate?: (text: string) => any,
  }) => {

  const MAX_TEXT = 5
  const id = friend.id
  const title = friend.name
  const profilePic = friend.profile_image_url
  const bannerPic = friend.profile_banner_url
  const description = friend.description
  const alias = friend.screen_name

  const handleFollow = () => follow(friend.id)
  const handleUnFollow = () => unfollow(friend.id)
  const truncate = (s: string) => s.length > MAX_TEXT ? s.split(" ").splice(0, MAX_TEXT).join(" ") + "..." : s;

  return (
    <Container>
      <Bg img={bannerPic} />
      <Link to={`/friend/${id}`}>
        <AvatarImg alt="No name" src={profilePic} />
      </Link>
      <User>
          <UserTop>
            <Name>{title}</Name>
            {isFollowing
              ? <Button bg onClick={handleUnFollow}>{translate("Following")}</Button>
              : <Button onClick={handleFollow}>{translate("Follow")}</Button>}
          </UserTop>
          <Socail>@<span>{alias}</span></Socail>
          <Description>{truncate(description)}</Description>
      </User>
    </Container>
  );
})

export default FriendItem;
