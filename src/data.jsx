const games = [
  {
    id: 0,
    title: "Forza Horizon 5",
    description:
      "Explorez un monde ouvert plein de vie dans les paysages du Mexique et vibrez au volant de voitures d'exception. Partez à la conquête des pistes accidentées de la Sierra Nueva dans cette expérience ultime du Rallye Horizon.",
    price: 59.99,
    tags: ["Racing", "Sports"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/ss_00f0090174380eeaf8753bd3d1028b6772c3aebf.1920x1080.jpg?t=1683059745",
    ],
  },
  {
    id: 1,
    title: "Elden Ring",
    description:
      "Un monde immense aux environnements riches et variés, parsemé d'obscurs et tortueux donjons tous reliés naturellement entre eux, vous attend. Au fil de votre exploration, goûtez à l'inconnu, bravez les menaces permanentes et accomplissez votre destinée.",
    price: 59.99,
    tags: ["Action-RPG"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_ae44317e3bd07b7690b4d62cc5d0d1df30367a91.1920x1080.jpg?t=1683618443",
    ],
  },
  {
    id: 2,
    title: "Uncharted Legacy of Thieves Collection",
    description:
      "Incarnez Nathan Drake et Chloe Frazer dans leurs aventures indépendantes, où chacun devra confronter son passé et forger son héritage. Ce jeu contient les aventures solo acclamées par la critique UNCHARTED 4: A Thief's End et UNCHARTED: The Lost Legacy.",
    price: 49.99,
    tags: ["Aventure"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1659420/ss_a2f6322488a915ad00af9a724936d7ca3868f1fd.1920x1080.jpg?t=1672777947",
    ],
  },
  {
    id: 3,
    title: "F1 23",
    description:
      "Dépassez le point de rupture dans EA SPORTS™ F1® 23, le jeu vidéo officiel du 2023 FIA Formula One World Championship™. Retrouvez un nouveau chapitre du mode histoire « Point de rupture » palpitant, avec ses drames à grande vitesse et ses rivalités enflammées.",
    price: 69.99,
    tags: ["Racing", "Sports"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2108330/ss_011491f13ab703b6e5827f9ceca7fafe8e18f4bb.1920x1080.jpg?t=1687440034",
    ],
  },
  {
    id: 4,
    title: "The Elder Scrolls Online",
    description:
      "Rejoignez plus de 20 millions de joueurs dans le RPG multijoueur en ligne primé, pour vivre une aventure sans limite dans un univers Elder Scrolls persistant. Combat, artisanat, sièges, exploration... créez votre propre style de jeu, sans abonnement au jeu nécessaire.",
    price: 19.99,
    tags: ["MMO", "RPG"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/306130/header.jpg?t=1685974187",
    ],
  },
  {
    id: 5,
    title: "Street Fighter 6",
    description:
      "Voici le tout nouveau challenger de Capcom ! Street Fighter™ 6, le dernier opus de la série, sera disponible mondialement le 2 juin 2023 ! L'expérience Street Fighter 6 s'étend sur trois modes de jeu distincts : World Tour, Fighting Ground et Battle Hub.",
    price: 59.99,
    tags: ["Versus Fighting"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1364780/header.jpg?t=1686291121",
    ],
  },
  {
    id: 6,
    title: "Call of Duty Modern Warfare II",
    description:
      "Call of Duty®: Modern Warfare® II plonge les joueurs dans un conflit mondial sans précédent, avec le retour des Opérateurs emblématiques de la Task Force 141.",
    price: 59.99,
    tags: ["Shooter"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/header.jpg?t=1687571108",
    ],
  },
  {
    id: 7,
    title: "Starfield",
    description:
      "Starfield est le premier nouvel univers en 25 ans de Bethesda Game Studios, les créateurs récompensés de The Elder Scrolls V: Skyrim et Fallout 4.",
    price: 69.99,
    tags: ["RPG"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg?t=1687290127",
    ],
  },
  {
    id: 8,
    title: "Anno 1800",
    description:
      "Anno 1800™ – Prenez la tête de la Révolution industrielle ! Bienvenue à l'aube de l'Ère industrielle. La voie que vous tracerez changera la face de votre monde. Serez-vous un innovateur ou un profiteur ? Un conquérant ou un libérateur ? De vous seul dépend la trace que vous laisserez dans l'histoire.",
    price: 14.99,
    tags: ["Gestion"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/916440/header.jpg?t=1681854014",
    ],
  },
  {
    id: 9,
    title: "Football Manager 2023",
    description:
      "Montez votre équipe de rêve, surpassez la concurrence et vivez les grands frissons des soirées européennes dans l'UEFA Champions League. Votre épopée vers la gloire footballistique vous attend.",
    price: 59.99,
    tags: ["Sports"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/1904540/header.jpg?t=1680627762",
    ],
  },
  {
    id: 10,
    title: "Risk of Rain 2",
    description:
      "Échappez à une planète étrangère chaotique en affrontant des hordes de monstres déchaînés, en solo ou entre amis. Combinez le butin de façon surprenante et maîtrisez chacun des personnages jusqu'à devenir vous-même le chaos que vous craigniez tant lors de votre premier écrasement.",
    price: 24.99,
    tags: ["Shooter"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/632360/header.jpg?t=1660063598",
    ],
  },
  {
    id: 11,
    title: "Sifu",
    description:
      "Sifu est un jeu de combat réaliste à la troisième personne, avec des mécaniques pointues de kung-fu et une action digne des films d'arts martiaux qui vous entraîne dans une quête de vengeance.",
    price: 39.99,
    tags: ["Action"],
    images: [
      "https://cdn.cloudflare.steamstatic.com/steam/apps/2138710/header.jpg?t=1683797995",
    ],
  },
  // {
  //   id: ,
  //   title: "",
  //   description: "",
  //   price: 59.99,
  //   images: [
  //     "",
  //   ],
  // },
];

export default games;
