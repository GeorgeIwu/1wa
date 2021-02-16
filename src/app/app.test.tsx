import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import { LanguageProvider, useLanguageStore } from './utils/useLanguage';
import { useFriend } from './utils/useFriend';
import Header from './components/Header';

const wrapper = ({ children }: { children: any }) => (
  <LanguageProvider>
    {children}
  </LanguageProvider>
);

test('renders header react link', () => {

  render(<Header currentLanguage={"english"} languages={["english"]} onSelectLanguage={() => {}}/>);
  const spanElement = screen.getByText(/Square/i);
  expect(spanElement).toBeInTheDocument();
});

test('should have default language as english', async () => {
  const { result } = renderHook(() => ({
    ...useLanguageStore(),
  }), { wrapper });

  expect(result.current.langCode).toContain("english")
})

test('should fetch add friend to fav', async () => {
  const { result } = renderHook(() => useFriend());

  const favorite = {
    name: "Site Streams Beta",
    profile_image_url: "",
    location: "San Francisco, CA",
    profile_banner_url: "",
    id: 183709371,
    profile_background_image_url: "http://a0.twimg.com/profile_background_images/656938621/vvhperynuny1q6em9i7k.png"
  }

  act(() => result.current.addFavorite(favorite.id));

  expect(result.current.favoriteFriends[0]?.friendID).toEqual(favorite.id)
})

