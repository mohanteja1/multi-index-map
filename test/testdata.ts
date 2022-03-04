const testContactsList = [
    {
      "id": "f678a812-aff0-401f-ab05-d02225afc1fd",
      "email": "Sonya62@hotmail.com",
      "phone": "(313) 760-9619",
      "name": "Tim Goodwin",
      "address": "14063 Rogahn Light",
      "about": "Ut velit blanditiis eos doloribus at corrupti non.",
      "age": 47
    },
    {
      "id": "3191929d-d0c0-41e6-a3ab-c613c00416d4",
      "email": "Benedict_Kautzer75@yahoo.com",
      "phone": "1-588-870-5835",
      "name": "Nettie Turner",
      "address": "6965 Reyna Plains",
      "about": "Placeat veritatis numquam neque explicabo vel ut id.",
      "age": 79
    },
    {
      "id": "22164d6f-a502-4065-adcf-25793cfb662b",
      "email": "Arlene.Reichert@gmail.com",
      "phone": "925-919-9285",
      "name": "Ada Blick",
      "address": "82419 Rohan Squares",
      "about": "Enim quae nihil.",
      "age": 46
    },
    {
      "id": "68d29778-be57-4bac-8b86-368c39f777d6",
      "email": "Mark.Harris36@gmail.com",
      "phone": "339.697.6391 x753",
      "name": "Rita White",
      "address": "17324 Cremin Plains",
      "about": "Voluptatem quod modi ullam eaque ullam voluptas atque.",
      "age": 82
    },
    {
      "id": "dcfb56e7-6b8f-4bac-b865-afc6341433f3",
      "email": "Gideon.Hudson@hotmail.com",
      "phone": "(520) 862-5386",
      "name": "Jackie Feil",
      "address": "765 Schroeder Forge",
      "about": "Exercitationem voluptatibus vitae aut.",
      "age": 96
    },
    {
      "id": "eef28005-7588-461e-999e-cc173031e7f6",
      "email": "Lizzie_Borer@gmail.com",
      "phone": "949-317-0042 x85151",
      "name": "Pat Rosenbaum",
      "address": "335 Sporer Island",
      "about": "Saepe debitis possimus rerum.",
      "age": 33
    },
    {
      "id": "a230058b-0134-4edb-a503-e93008e85b4b",
      "email": "Katherine11@gmail.com",
      "phone": "(453) 675-1245 x32882",
      "name": "Jan Skiles",
      "address": "069 Jada Crossing",
      "about": "Sit dolorum dolorum culpa aperiam rerum non accusantium similique assumenda.",
      "age": 75
    },
    {
      "id": "3bf98e40-4277-4d52-9208-f086f6b1b3e6",
      "email": "Janelle_Yost@hotmail.com",
      "phone": "1-613-486-1765",
      "name": "Maurice Kunze",
      "address": "461 Magnus Overpass",
      "about": "Et cum modi quis rerum fuga in.",
      "age": 26
    },
    {
      "id": "b6e63d3d-be53-403b-877b-95c3c61d897c",
      "email": "Royal.Rice@yahoo.com",
      "phone": "(928) 793-6500 x25858",
      "name": "David Murazik",
      "address": "10160 Arch Underpass",
      "about": "Rerum fugit dolores libero.",
      "age": 62
    },
    {
      "id": "cec14ec9-d897-40f0-88fd-94b188dd95aa",
      "email": "Elroy.OConnell96@gmail.com",
      "phone": "1-308-317-6285 x1006",
      "name": "Amelia Hilpert",
      "address": "20197 Jamar Rapids",
      "about": "Minus sint in provident eaque sapiente qui dolor ratione ut.",
      "age": 27
    },
    {
      "id": "c3ba7c3c-af99-4f46-9022-7a1d7c293e5e",
      "email": "Brooklyn_Kunze@yahoo.com",
      "phone": "(494) 786-4960 x574",
      "name": "Shannon Kemmer",
      "address": "000 Effertz Springs",
      "about": "Quam ipsa dolor minus fuga.",
      "age": 50
    },
    {
      "id": "9bec1d60-a45f-4d0d-ad79-4becfbc81271",
      "email": "Rahsaan_Goldner@yahoo.com",
      "phone": "213.600.5920",
      "name": "Edmond Schmidt Jr.",
      "address": "998 Magdalen Shoal",
      "about": "Sunt asperiores corrupti dicta doloremque sed.",
      "age": 13
    },
    {
      "id": "6a6749c1-d1c2-419b-91ab-d8671279853c",
      "email": "Kenny79@gmail.com",
      "phone": "424.841.4682 x15799",
      "name": "Mr. Naomi Marquardt",
      "address": "330 Mohammed Villages",
      "about": "Vel nisi aut consequatur dignissimos consequatur quis error.",
      "age": 92
    },
    {
      "id": "ecc90d26-cea9-4f1d-bb6c-75be45451b78",
      "email": "Anahi.Hoppe98@hotmail.com",
      "phone": "1-360-575-0309 x33137",
      "name": "Luz Hammes Jr.",
      "address": "315 Kovacek Square",
      "about": "Quibusdam et tenetur et eveniet laborum error.",
      "age": 87
    }
  ];
  
  const itemNotInTestContactsList = {
    "id": "5c14afa6- 4fc0-4a37 - b4c4 - 8f85bb1623312c",
    "email": "Trey88@gmail.commm",
    "phone": "250-642-1498 x8101333",
    "name": "Kristina Mosciskib",
    "address": "164 Beer Unionn",
    "about": "Libero ut enim temporibusy.",
  }
  
  const itemWithDifferentStructure = {
    "accountId": "5c14afa6- 4fc0-4a37 - b4c4 - 8f85bb1623312c",
    "business_email": "Trey88@gmail.commm",
    "business_phone": "250-642-1498 x8101333",
    "business_name": "Kristina Mosciskib",
    "business_address": "164 Beer Unionn",
    "about": "Libero ut enim temporibusy.",
    "age": 83665
  }
  
  const itemWithMissingIndex = {
    "email": "Trey88@gmail.commm",
    "phone": "250-642-1498 x8101333",
    "name": "Kristina Mosciskib",
    "address": "164 Beer Unionn",
    "about": "Libero ut enim temporibusy.",
  }

  const uniqueIndexes = ['id', 'email', 'phone'];

  export {
      testContactsList,
      itemNotInTestContactsList,
      itemWithDifferentStructure,
      itemWithMissingIndex,
      uniqueIndexes,
  }