const IAM_SCOPES = [
  'openid',
  'profile',
  'read:permissions',
  // You can add more scopes (granted services) here
  'catalog',
];

export const emotion: any = {
  excellent: 'https://qdiary.github.io/img/excellent_active.8870d33b.png',
  good: 'https://qdiary.github.io/img/good_active.5cd9c695.png',
  natural: 'https://qdiary.github.io/img/natural_active.a8b8379a.png',
  disappointed: 'https://qdiary.github.io/img/disappointed_active.0d4404ff.png',
  hate: 'https://qdiary.github.io/img/hate_active.9f6e1e85.png',
};

export const tags: any = {
  family: {
    img:
      'https://images.unsplash.com/photo-1535384515441-5a7293014fce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    text: 'Gia đình',
  },
  sport: {
    img:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    text: 'Thể thao',
  },
  love: {
    img:
      'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    text: 'Tình yêu',
  },
  music: {
    img:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    text: 'Âm nhạc',
  },
  travel: {
    img:
      'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    text: 'Du lịch',
  },
};

export default {
  IAM_SCOPES,
  ALL: 'all',
  TABLET_WIDTH: 768,
};
