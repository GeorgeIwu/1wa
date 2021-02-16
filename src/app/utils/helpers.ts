
const normalizeFriends = < T extends {} >(friends: T[]): T => {
  const newFriends = friends.reduce((acc, item: any) => {
    acc[item.id] = {
      id: item.id,
      name: item.name,
      screen_name: item.screen_name,
      description: item.description,
      profile_image_url: item.profile_image_url,
      profile_background_image_url: item.profile_background_image_url,
      profile_banner_url: item.profile_banner_url,
    };
    return acc;
  }, {} as any);
  return newFriends
}

export const getFriend = async (id?: string) => {
  return new Promise((resolve) => {
    const options = {
      method: 'GET',
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors',
      cache: 'default'
    }

    const request = new Request('./friends.json', options as any)
    fetch(request).then( async (response) => {

      const res = await response.json() as any
      if (id) {
        const user = res.users.find((u: any) => u.id === Number(id))
        resolve([user])
      } else {
        const users = normalizeFriends(res.users)
        resolve(users)
      }
    });
  })
}


export const imgCache = {
  __cache: {} as any,
  read(src: any) {
    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache[src]);
        };
        img.src = src;
      }).then((img) => {
        this.__cache[src] = true;
      });
    }
    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }
    return this.__cache[src];
  }
};
