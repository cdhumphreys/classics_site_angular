const questions = [
  {
  "book": 1,
  "questions": [
   {
      "question":"Who does Homer invoke in the poem?",
      "answer_1":"Zeus, the keeper of Fate and overseer of all events",
      "correct_1":0,
      "answer_2":"the Muse Kalliope, to inspire him to sing his poem properly",
      "correct_2":1,
      "answer_3":"Achilleus and his anger, whose story the poem follows",
      "correct_3":0,
      "answer_4":"Paris, whose actions started the Trojan war",
      "correct_4":0,
      "explanation":"Sing, goddess, of the anger of Achilleus, son of Peleus, the accursed anger which brought uncounted anguish on the Achaians"
   },
   {
      "question":"What is the name of the priest Agamemnon insults?",
      "answer_1":"Chryses",
      "correct_1":1,
      "answer_2":"Chryse",
      "correct_2":0,
      "answer_3":"Crikey",
      "correct_3":0,
      "answer_4":"Chryseis",
      "correct_4":0,
      "explanation":"The priest Chryses, from the island Chryse, is hoping to be reunited with his daughter Chryseis."
   },
   {
      "question":"What is the name of the augur consulted about the cause of the plague?",
      "answer_1":"Helenos",
      "correct_1":0,
      "answer_2":"Kalchas",
      "correct_2":1,
      "answer_3":"Automedon",
      "correct_3":0,
      "answer_4":"Menoitios",
      "correct_4":0,
      "explanation":"The Greeks consult Kalchas, \"far the best of augurs\""
   },
   {
      "question":"Which goddess stops Achilleus from murdering Agamemnon during their quarrel?",
      "answer_1":"Hera",
      "correct_1":0,
      "answer_2":"Iris",
      "correct_2":0,
      "answer_3":"Athene",
      "correct_3":1,
      "answer_4":"Thetis",
      "correct_4":0,
      "explanation":"Athene came up behind him and caught the son of Peleus by his yellow hair...'I have come from heaven to stop your fury, if you will obey me'"
   },
   {
      "question":"What do Agamemnon's heralds do when they get to Achilleus' hut in search of Briseis?",
      "answer_1":"They deliver a message of Agamemnon's harsh words to the son of Peleus",
      "correct_1":0,
      "answer_2":"They stand silent and afraid, scared to incur Achilleus' wrath",
      "correct_2":1,
      "answer_3":"They are threatened by Achilleus and go back empty-handed",
      "correct_3":0,
      "answer_4":"They take her secretly while Achilleus is away talking with his mother, Thetis",
      "correct_4":0,
      "explanation":"They went there reluctantly along the shore...they found him by his hut and black ship, sitting idle...they stood there silent, without word or question, in fear and respect for the king"
   },
   {
      "question":"What does Agamemnon say will happen before he ever returns Chryseis to her family?",
      "answer_1":"Agamemnon will live a full life and release her in his old age",
      "correct_1":0,
      "answer_2":"Chryseis will grow old far from home",
      "correct_2":1,
      "answer_3":"Chryses will have to pay unlimited ransom to Agamemnon",
      "correct_3":0,
      "answer_4":"Apollo himself will have to prise the girl from Agamemnon's hands",
      "correct_4":0,
      "explanation":"As for the girl, I shall not release her. Before that, old age will come upon her in our house, in Argos, far from her own country"
   },
   {
      "question":"How long does the plague ravage the Greek encampment before the army is called to an assembly?",
      "answer_1":"Nine days",
      "correct_1":1,
      "answer_2":"A year",
      "correct_2":0,
      "answer_3":"One day",
      "correct_3":0,
      "answer_4":"Seven days",
      "correct_4":0,
      "explanation":"For nine days the god's arrows plied throughout the army. On the tenth day Achilleus called the people to an assembly: the white-armed goddess Hera had put this in his mind"
   },
   {
      "question":"Why is Kalchas afraid to reveal his prophecy?",
      "answer_1":"Because he doesn't want to offend anyone of superior rank",
      "correct_1":1,
      "answer_2":"Because he is worried the plague will worsen if nobody obeys the prophecy",
      "correct_2":0,
      "answer_3":"Because he doesn't want to offend the gods by revealing their secrets",
      "correct_3":0,
      "answer_4":"Because he is not sure whether or not he is correct",
      "correct_4":0,
      "explanation":"I think that I shall anger a man who holds great power over all the Argives and command among the Achaians. When a king is angry at a lesser man, his is the greater resentment in his breast,until he can give effect to it at some later time"
   },
   {
      "question":"What does Nestor advise Agamemnon and Achilleus to do?",
      "answer_1":"Agamemnon not to insult the Greeks' best warrior, Achilleus not to insult a superior king",
      "correct_1":1,
      "answer_2":"Agamemnon to be content without a prize temporarily, Achilleus to not enrage Agamemnon further",
      "correct_2":0,
      "answer_3":"Agamemnon too return to Argos since he is responsible for the plague, Achilleus to organise sending the girl Chryseis back with a hecatomb to placate the god Apollo",
      "correct_3":0,
      "answer_4":"Agamemnon to demand unlimited ransom from Achilleus in payment for the dishonour he has been shown, Achilleus to return to his hut in disgrace for having dishonoured his superior",
      "correct_4":0,
      "explanation":"You, son of Peleus, do not seek open quarrel with the king, since there is no equality with the honour granted to a sceptred king, whom Zeus has glorified. You may be a man of strength because his rule is wider. Son of Atreus, you must stop your fury. I beg you to put aside your anger for Achilleus, who for all the Achaians is their great defence against the horror of war."
   },
   {
      "question":"Which immortal is not happy about the conversation between Zeus and Thetis?",
      "answer_1":"Athene, because she knows the Trojans will benefit",
      "correct_1":0,
      "answer_2":"Hephaistos, because he is worried Zeus will become angry and beat Thetis",
      "correct_2":0,
      "answer_3":"Hera, because Zeus has kept secrets from her before",
      "correct_3":1,
      "answer_4":"Zeus, because he does not want to be nagged by goddess any further",
      "correct_4":0,
      "explanation":"But when Hera looked at him, she could tell that plans had been laid with him by silver-footed Thetis...She immediately attacked Zeus with scornful words.: 'Crafty one, which of the gods has been laying plans with you this time? It is always your way to keep apart from me and decide your purposes in secret. You have never yet been prepared to tell me frankly of any design you have in your mind.'"
   },
   {
      "question":"Which immortal warns Hera not to anger Zeus?",
      "answer_1":"Thetis, she is concerned that she has come between the King and Queen of the gods and does not want to incur their wrath",
      "correct_1":0,
      "answer_2":"Hermes, who is a friend to all and dislikes seeing disputes and arguments",
      "correct_2":0,
      "answer_3":"Hephaistos, who knows first-hand that Zeus can be violent if enraged",
      "correct_3":1,
      "answer_4":"Zeus, who wants his wife to stop nagging him",
      "correct_4":0,
      "explanation":"Have patience, mother, and bear with it despite your distress. Otherwise, dear as you are to me, I may see you beaten about before my eyes, and then I shall not be able to help you for all the pain I will feel - it is hard to stand against the Olympian. Once before when I was eager to defend you he caught me by the foot and threw me from the threshold of the gods"
   },
   {
      "question":"What is Achilleus' response to Agamemnon saying he needs another prize if he gives up Chryseis?",
      "answer_1":"As widest-ruling king, you will take the best share of the loot from Troy when it falls",
      "correct_1":1,
      "answer_2":"Be content with no prize, since you have done none of the fighting",
      "correct_2":0,
      "answer_3":"Being higher in rank than I, I offer you my war-prize Briseis willingly",
      "correct_3":0,
      "answer_4":"Oh that quarrels would be removed from mankind, the prophet Kalchas must be punished for revealing the prophecy which started this feud",
      "correct_4":0,
      "explanation":"...you now let the girl go at the god's will: and we Achaians will recompense you three and four times over, if ever Zeus grants that we sack the well-walled city of Troy."
   },
   {
      "question":"From which warriors does Agamemnon threaten to take a woman to replace Chryseis?",
      "answer_1":"Nestor, Odysseus, Achilleus",
      "correct_1":0,
      "answer_2":"Aias, Idomeneus, Achilleus",
      "correct_2":0,
      "answer_3":"Sthenelos, Diomedes, Achilleus",
      "correct_3":0,
      "answer_4":"Achilleus, Aias, Odysseus",
      "correct_4":1,
      "explanation":"if the great-hearted Achaians will give me a prize...to be of equal value - then so be it. But if they will not, then I myself shall go and take your prize, of Aias', or Odysseus', and carry it away with me, and he will be angry, whichever of you I visit."
   },
   {
      "question":"Why does Nestor think he should be listened to, when he stands to speak?",
      "answer_1":"He is older and wiser, since previously he has kept company with even greater heroes",
      "correct_1":1,
      "answer_2":"He is worried there will be blood shed at an assembly meeting, which would not be right",
      "correct_2":0,
      "answer_3":"He has not spoken yet and wants to add his own opinion to the quarrel",
      "correct_3":0,
      "answer_4":"Neither Agamemnon nor Achilleus are good at public-speaking",
      "correct_4":0,
      "explanation":"you must listen to me, since both of you are younger men than I. In my time I have kept company with greater men even than you, they never failed to respect me."
   },
   {
      "question":"Why does Achilleus think Zeus will listen to his mother's request?",
      "answer_1":"He once cared for her, but had to reject her on account of the prophecy surrounding her child",
      "correct_1":0,
      "answer_2":"Because she is the honoured mother to the most powerful and glorious mortal",
      "correct_2":0,
      "answer_3":"Because she once rescued him from a trap set by Hera, Athene and Poseidon",
      "correct_3":1,
      "answer_4":"Because she has defended him during arguments with Hera, Athene and Aphrodite",
      "correct_4":0,
      "explanation":" Go to Olympos and beseech Zeus by any service you have ever done his godhead in word or action. I often heard you in my father's house telling with pride how you alone among the immortals rescued the son of Kronos...from a shaming plight, when other Olympian gods sought to bind him fast Hera and Poseidon and Pallas Athene. But you came and released him from his bonds"
   }
  ]
},
  {
    "book": 3,
    "questions": [
      {
          "question":"What is Paris wearing when he challenges the Greek army at the front of the Trojan battle line?",
          "answer_1":"A leopard-skin",
          "correct_1":1,
          "answer_2":"A lion-skin",
          "correct_2":0,
          "answer_3":"A goat-skin",
          "correct_3":0,
          "answer_4":"A wolf-skin",
          "correct_4":0,
          "explanation":"godlike Alexandros kept moving out in front of the Trojan ranks, wearing a leopard-skin over his shoulders, and a curved bow and sword. Shaking a pair of bronze-capped spears he constantly challenged all the best men of the Argives to fight him one to one in grim combat"
      },
      {
          "question":"Who accepts Paris' challenge and why?",
          "answer_1":"Agamemnon, because he is the main leader of the Greek army",
          "correct_1":0,
          "answer_2":"Menelaos, because he has the personal quarrel with Paris",
          "correct_2":1,
          "answer_3":"Diomedes, insulted by the arrogant display made by Paris",
          "correct_3":0,
          "answer_4":"Nobody, Aphrodite saves Paris from harm by whisking him away in a divine mist and setting him down in his bedchamber",
          "correct_4":0,
          "explanation":"When the warrior Menelaos saw him stepping out in front of the massed troops with long strides, he felt the joy of a lion that has come across a great carcass, an antlered stag or a wild goat he has found in his hunger: he eats it greedily, even though the running hounds and the strong young huntsmen try to drive him away. So Menelaos felt joy when his eyes saw godlike Alexandros. He thought he could take his vengeance on the culprit"
      },
      {
          "question":"What does Hektor say when Paris retreats from Menelaos' advance?",
          "answer_1":"He shames Paris for excelling in beauty rather than courage or honour",
          "correct_1":1,
          "answer_2":"He warns Paris that if he does not fight, Troy will cast him out as a disgrace",
          "correct_2":0,
          "answer_3":"He threatens to give Helen back with all her goods as a way to bring protection to the high-hearted Trojans",
          "correct_3":0,
          "answer_4":"He says that if Paris will not fight, he will take his place in the duel to save their city",
          "correct_4":0,
          "explanation":"Hektor saw this and attacked him with insulting words: 'Paris, you pest, good for nothing but looks, you woman-crazed seducer! ...Oh, the long-haired Achaians must be cackling at this, saying that we put up a prince as champion only for his good looks, when his heart is empty of strength or courage.'"
      },
      {
          "question":"What is Paris' reaction to Hektor's scorn?",
          "answer_1":"He says that the rebuke is not unjust but that you cannot help where your talents lie, then he proposes a duel to end the war",
          "correct_1":1,
          "answer_2":"He argues that Hektor is not giving him enough credit, after all he did set out to duel the best of the Achaians, then proposes a duel to regain his honour in the eyes of the Trojans",
          "correct_2":0,
          "answer_3":"He argues that Hektor is not giving him enough credit, after all he did set out to duel the best of the Achaians, then proposes a duel to regain his honour in the eyes of his brother",
          "correct_3":0,
          "answer_4":"He prays to Aphrodite to aid him in the duel with Menelaos in return for his having chosen her as the winner in the beauty contest",
          "correct_4":0,
          "explanation":"Hektor, your taunt is not unfair, and there is justice in it - your heart is always untiring as an axe...but do not charge against me golden Aphrodite's lovely gifts: there is no discarding the glorious gifts that come of the gods' own giving, though a man would not take them of his choice. But if you want me now to fight and do battle...put me and the warrior Menelaos together in the middle, to fight it out over Helen and all her goods."
      },
      {
          "question":"Why does Menelaos send for Priam to solemnise the truce between the two armies?",
          "answer_1":"He doesn't trust Hektor or Paris to honour a truce",
          "correct_1":1,
          "answer_2":"Only old men are suitable for performing religious rites",
          "correct_2":0,
          "answer_3":"He wants a chance to kill Priam, the King of Troy",
          "correct_3":0,
          "answer_4":"He wants to discuss the terms of the truce with the King",
          "correct_4":0,
          "explanation":"And fetch the great Priam, to solemnise the oaths himself - his sons are violent men and not to be trusted - so that no violation should ruin the oaths we swear to Zeus. Younger men's minds are always lighter than air, but when an old man joins them, he considers both past and future, to make the outcome the very best for both sides"
      },
      {
          "question":"When Iris goes to fetch Helen to watch the truce, what does she find Helen doing?",
          "answer_1":"She is weeping for her fate",
          "correct_1":0,
          "answer_2":"She is sewing a cloak",
          "correct_2":1,
          "answer_3":"She is running a bath for Paris when he returns from the fighting",
          "correct_3":0,
          "answer_4":"She is lamenting the fate of Troy",
          "correct_4":0,
          "explanation":"Iris found Helen in her room, working at a great web of purple cloth for a double cloak, and in it she was weaving many scenes ofthe conflict between the horse-taming Trojans and the bronze-clad Achaians, which they wee enduring for her sake at the hands of Ares"
      },
      {
          "question":"Who says that it is not shameful that a war is being fought over Helen, on account of her beauty, but that she is a curse upon Troy?",
          "answer_1":"Hektor",
          "correct_1":0,
          "answer_2":"Priam",
          "correct_2":0,
          "answer_3":"the Trojans soldiers atop the wall",
          "correct_3":0,
          "answer_4":"the old men of Troy",
          "correct_4":1,
          "explanation":"Old age had put an end to their warfare, but they were excellent men of words...When they saw Helen coming towards the tower, they spoke softly to each other: "
      },
      {
          "question":"What does Helen say to Priam when he asks her to tell her which Greek warrior is which? ",
          "answer_1":"That she has been away for so long she no longer knows who is who",
          "correct_1":0,
          "answer_2":"That she has eyes only for her first husband, Menelaos",
          "correct_2":0,
          "answer_3":"That she wishes she could fling herself from the wall, so much does she miss her previous life in Greece",
          "correct_3":0,
          "answer_4":"That she wishes she had died before coming to Troy",
          "correct_4":1,
          "explanation":"Oh, if only vile death had been my choice when I came here with your son, leaving behind the house of my marriage, and my family and my darling child ad the sweet company of friends! But this did not happen, and so I am wasted with weeping."
      },
      {
          "question":"Who can Helen not see among the Greek warriors? ",
          "answer_1":"Kastor and Polydeukes",
          "correct_1":1,
          "answer_2":"Achilleus",
          "correct_2":0,
          "answer_3":"Achilleus and Patroklos",
          "correct_3":0,
          "answer_4":"Diomedes",
          "correct_4":0,
          "explanation":"'But there are two marshals of the people I cannot see, Kastor the horse-breaker and the boxer Polydeukes, my own brothers, born with me to the same mother. Either they did not join with the others from lovely Lakedaimon, or they did come here in the seafaring ships, but now do not want to enter the fighting, for fear of the shame and the curses that are heaped upon me.'<br />So she spoke, but the life-giving earth already held them under, there in Lakedaimon, in their dear native land"
      },
      {
          "question":"When Antenor describes Odysseus’ skill with speaking, whose speech does he say was shorter and inferior?",
          "answer_1":"Menelaos",
          "correct_1":1,
          "answer_2":"his own",
          "correct_2":0,
          "answer_3":"Odysseus' son Telemachus",
          "correct_3":0,
          "answer_4":"Achilleus",
          "correct_4":0,
          "explanation":"When they joined the assembled Trojans, Menelaos' broad shoulders were higher when they were standing, but when both were seated Odysseus had the more impressive dignity. Now when they came to weave their thoughts in speech before all the company, Menelaos would speak with the words running fast, at little length, but very clearly - there was nothing long-winded or rambling about him: and he was indeed the younger man. But whenever resourceful Odysseus...released that great voice from his chest and the words which flocked down like snowflakes in winter, no other mortal man could then rival Odysseus"
      },
      {
          "question":"For what reason does Menelaos pray to Zeus that he succeed in killing Paris? ",
          "answer_1":"For vengeance and as a warning to others to uphold xenia",
          "correct_1":1,
          "answer_2":"For vengeance alone",
          "correct_2":0,
          "answer_3":"For vengeance and the destruction of a cowardly man",
          "correct_3":0,
          "answer_4":"For vengeance and the renewal of his honour as a man",
          "correct_4":0,
          "explanation":"Zeus, lord, grant me vengeance on the man who did me first wrong, godlike Alexandros, and bring him low under my hands, so that even among generations yet to be born a man may shrink from doing wrong to a host who gives him hospitality"
      },
      {
          "question":"When Menelaos attacks with his sword, it: ",
          "answer_1":"shatters upon impact",
          "correct_1":1,
          "answer_2":" narrowly misses striking Paris",
          "correct_2":0,
          "answer_3":"strikes Paris but the cut is not deep",
          "correct_3":0,
          "answer_4":"bounces off Paris’ helmet",
          "correct_4":0,
          "explanation":"The son of Atreus drew his silver-nailed sword, swung it high for the blow, and brought it crashing down on the helmet's ridge - there it shattered and slipped in shivers from his hand. The son of Atreus looked up into the wide heaven and cried out: "
      },
      {
          "question":"Aphrodite saves Paris from Menelaos by: ",
          "answer_1":"breaking Menelaos’ grip and sweeping Paris away in a divine mist",
          "correct_1":0,
          "answer_2":"breaking Paris’ helmet strap and sweeping him away in a divine mist",
          "correct_2":1,
          "answer_3":"temporarily blinding Menelaos so he releases his grip on Paris and she whisks him away in a divine mist",
          "correct_3":0,
          "answer_4":"convincing the Trojan Pandaros to shoot at Menelaos, taking him by surprise so he releases Paris",
          "correct_4":0,
          "explanation":"at his soft neck the stitched strap was throttling him, the helmet-strap tight under his chin. And now he would have dragged him back and won limitless glory, if Zeus' daughter Aphrodite had not quickly seen. She broke the strap...[Menelaos] then sprang back ready to kill Alexandros with his bronze spear. But Aphrodite snatched him away with the ease of a god, wrapped him in thick mist, and set him down in his sweetly-scented bedroom"
      },
      {
          "question":"What is Helen's reaction to being summoned to Paris' bedchamber by Aphrodite?",
          "answer_1":"She refuses angrily, telling Aphrodite to be with Paris herself",
          "correct_1":1,
          "answer_2":"She goes in fear, afraid to anger the goddess",
          "correct_2":0,
          "answer_3":"She goes at once, eager to see her beloved husband",
          "correct_3":0,
          "answer_4":"She goes reluctantly, as she would rather stay and look out for her previous husband Menelaos on the battlefield",
          "correct_4":0,
          "explanation":"Strange goddess, why so eager to work this seduction on me? Will you carry me on to some settled city yet further away...if there too there is some mortal man you love? ...Go and sit by him yourself...stay with him, forever whimpering round him and watching over him, until he makes you his wife - or else his slave. But I will not go to him - that would bring shame on me - to serve that man's bed."
      },
      {
          "question":"What is the interchange like between Paris and Helen in his bedroom?",
          "answer_1":"Helen scorns her husband while Paris is in oblivious good spirits, then they go to bed",
          "correct_1":1,
          "answer_2":"Helen scorns her husband, who is cowed by her shaming rebuke, but nevertheless they go to bed",
          "correct_2":0,
          "answer_3":"Helen praises her husband's attempt in the duel, Paris is pleased and the two go to bed",
          "correct_3":0,
          "answer_4":"Helen speaks no words to her husband, disgraced by his behaviour, but the two go to bed",
          "correct_4":0,
          "explanation":"You came back from the fighting, then. I wish you had died there, brought down by a man of strength, who was once my husband"
      }
    ]
  }
];

export default questions;
