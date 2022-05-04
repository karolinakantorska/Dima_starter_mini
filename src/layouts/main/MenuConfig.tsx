// routes
import { PATH_AUTH, PATH_KONTAKT, PATH_LINKS, PATH_NEWS, PATH_PARTNER, PATH_REFERENZEN, PATH_UNTERNEHMEN } from '../../routes/paths';
// components
//import { PATH_AFTER_LOGIN } from '../../config';
// components

// ----------------------------------------------------------------------


export const menuConfigMain = [
  {
    title: 'Referenzen',
    path: PATH_REFERENZEN.referenzen,
  },
  {
    title: 'Unternehmen',
    path: '/unternehmen',
    children: [
      {
        subheader: '',
        items: [
          { title: 'Über uns', path: PATH_UNTERNEHMEN.ueber_uns },
          { title: 'Leistungen', path: PATH_UNTERNEHMEN.leistungen },
          { title: 'Mitarbeitern', path: PATH_UNTERNEHMEN.mitarbeitern },
          { title: 'Jobs', path: PATH_UNTERNEHMEN.jobs },

        ],
      },
    ],
  },
  {
    title: 'Kontakt',
    path: PATH_KONTAKT.kontakt,
  },
];
export const menuConfigSecond = [
  {
    title: 'Partner',
    path: PATH_PARTNER.partner,
  },
  {
    title: 'News',
    path: PATH_NEWS.news,
  },

];

