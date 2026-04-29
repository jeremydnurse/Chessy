import type { OpeningLesson } from './types';

export const openings: OpeningLesson[] = [
  // ─────────────────────────────────────────────
  // 1. Italian Game (Giuoco Piano)
  // ─────────────────────────────────────────────
  {
    id: 'italian-game',
    kind: 'opening',
    name: 'Italian Game',
    eco: 'C50-C54',
    category: "King's Pawn",
    difficulty: 'beginner',
    userColor: 'w',
    description:
      'The Italian Game is one of the oldest openings in chess. White develops the bishop to c4, targeting Black\'s vulnerable f7 square. Play typically revolves around a central pawn battle after d4, leading to open, tactical positions where piece activity matters most.',
    keyIdeas: [
      'Control the center with pawns on e4 and d4',
      'Target f7 with the bishop on c4',
      'Develop pieces rapidly before launching attacks',
      'The d4 push is the key moment — timing it correctly is essential',
      'In the Giuoco Pianissimo (4.d3 instead of 4.c3), play is quieter and more positional',
    ],
    commonMistakes: [
      'Playing Bc4 and then failing to follow up with d4, leaving the bishop passive',
      'Capturing on d4 with the wrong piece (cxd4 maintains the pawn center)',
      'Ignoring Black\'s counterplay against the d4 pawn after it advances',
      'Not castling early enough — the center opens and king safety matters',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center (d5, f5) and opens lines for the bishop and queen.', playedBy: 'user' },
      { moveSan: 'e5', explanation: 'Mirrors center control and opens lines for Black\'s bishop and queen.', playedBy: 'auto' },
      { moveSan: 'Nf3', explanation: 'Develops the knight toward the center and attacks the e5 pawn.', playedBy: 'user' },
      { moveSan: 'Nc6', explanation: 'Defends the e5 pawn while developing a knight toward the center.', playedBy: 'auto' },
      { moveSan: 'Bc4', explanation: 'Targets the f7 pawn — the weakest square in Black\'s position, only defended by the king.', playedBy: 'user' },
      { moveSan: 'Bc5', explanation: 'Mirrors White\'s idea, targeting f2 and developing the bishop actively.', playedBy: 'auto' },
      { moveSan: 'c3', explanation: 'Prepares the powerful d4 central advance, supporting a future pawn center.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Develops the knight, attacks e4, and follows opening principles.', playedBy: 'auto' },
      { moveSan: 'd4', explanation: 'Strikes at the center, opens lines for pieces, and gains space.', playedBy: 'user' },
      { moveSan: 'exd4', explanation: 'Black must capture or concede the center entirely.', playedBy: 'auto' },
      { moveSan: 'cxd4', explanation: 'Recaptures, establishing an ideal pawn duo on d4 and e4.', playedBy: 'user' },
      { moveSan: 'Bb4+', explanation: 'Check forces White to spend time dealing with it, disrupting coordination.', playedBy: 'auto' },
      { moveSan: 'Bd2', explanation: 'Blocks the check while developing, preparing to recapture cleanly.', playedBy: 'user' },
      { moveSan: 'Bxd2+', explanation: 'Trades the bishop pair to simplify and removes the defender.', playedBy: 'auto' },
      { moveSan: 'Nbxd2', explanation: 'Recaptures toward the center — the knight heads to good squares.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'Counter-strikes in the center before White consolidates.', playedBy: 'auto' },
      { moveSan: 'exd5', explanation: 'Opens the position while ahead in development.', playedBy: 'user' },
      { moveSan: 'Nxd5', explanation: 'Recaptures with the knight on a strong central outpost.', playedBy: 'auto' },
      { moveSan: 'Qb3', explanation: 'Attacks b7 and d5 simultaneously — an active queen placement.', playedBy: 'user' },
      { moveSan: 'Nce7', explanation: 'Defends d5 while preparing to reroute the knight.', playedBy: 'auto' },
    ],
    variations: [
      {
        name: 'Giuoco Pianissimo',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'd3', 'Nf6', 'O-O', 'd6', 'c3', 'O-O', 'Re1', 'a6'],
        description: 'A slower, more positional approach. White builds up before pushing d4. Popular at all levels for its solidity.',
      },
      {
        name: 'Evans Gambit',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'b4', 'Bxb4', 'c3', 'Ba5', 'd4', 'exd4', 'O-O'],
        description:
          'White sacrifices the b-pawn for a huge lead in development and open lines. Extremely dangerous in fast games if Black doesn\'t know the theory.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Ruy Lopez (Spanish Game)
  // ─────────────────────────────────────────────
  {
    id: 'ruy-lopez',
    kind: 'opening',
    name: 'Ruy Lopez',
    eco: 'C60-C99',
    category: "King's Pawn",
    difficulty: 'intermediate',
    userColor: 'w',
    description:
      'The Ruy Lopez is the single most important chess opening to understand. White\'s 3.Bb5 doesn\'t threaten to win a pawn immediately but creates lasting pressure against Black\'s center. The resulting positions are rich in strategic ideas and have been played at the highest level for over 500 years.',
    keyIdeas: [
      'White builds a strong center with e4 and prepares d4',
      'The knight maneuver Nbd2-Nf1-Ng3 (or Ne3) reinforces e4 and eyes f5',
      'White often plays d4 to open the center when ready',
      'Black seeks counterplay with ...d5 or queenside expansion with ...c5',
      'The fight for the e4 and d5 squares defines the entire middlegame',
      'Both sides maneuver extensively before committing to pawn breaks',
    ],
    commonMistakes: [
      'As Black, capturing 5...Nxe4 without understanding the Open Ruy Lopez theory',
      'Rushing d4 as White without proper preparation',
      'Neglecting the h3 prophylaxis, allowing Bg4 to pin the knight',
      'Black playing passively — the Ruy Lopez rewards active counterplay',
      'Not understanding that the bishop on b5/a4/b3 is NOT trying to win the e5 pawn',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center and opens diagonals for the bishop and queen.', playedBy: 'user' },
      { moveSan: 'e5', explanation: 'Equal center control, mirroring White\'s central claim.', playedBy: 'auto' },
      { moveSan: 'Nf3', explanation: 'Develops the knight and attacks the e5 pawn.', playedBy: 'user' },
      { moveSan: 'Nc6', explanation: 'Defends e5 and develops a piece.', playedBy: 'auto' },
      { moveSan: 'Bb5', explanation: 'The "Spanish bishop" — pins the knight defending e5, creating long-term pressure on Black\'s center.', playedBy: 'user' },
      { moveSan: 'a6', explanation: '"Putting the question" to the bishop — forces it to decide: retreat or capture.', playedBy: 'auto' },
      { moveSan: 'Ba4', explanation: 'Retreats but maintains the pin and pressure on the c6 knight. The bishop stays active.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Develops the knight, attacks e4, and follows opening principles.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles for king safety. The e4 pawn looks hanging but 5...Nxe4 leads to the Open Ruy Lopez where White gets excellent compensation.', playedBy: 'user' },
      { moveSan: 'Be7', explanation: 'Prepares to castle with solid development. The Closed Ruy Lopez begins here.', playedBy: 'auto' },
      { moveSan: 'Re1', explanation: 'Supports the e4 pawn and prepares d4. The rook eyes the e-file which may open later.', playedBy: 'user' },
      { moveSan: 'b5', explanation: 'Pushes the bishop back, gains queenside space, and prepares Bb7.', playedBy: 'auto' },
      { moveSan: 'Bb3', explanation: 'Retreats to safety while maintaining diagonal pressure toward f7.', playedBy: 'user' },
      { moveSan: 'd6', explanation: 'Supports e5, prepares Be6 or Bg4, and opens the diagonal for the c8 bishop.', playedBy: 'auto' },
      { moveSan: 'c3', explanation: 'Prepares the key d4 advance with pawn support. Also prevents Nb4 ideas.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Castles for safety before the center opens.', playedBy: 'auto' },
      { moveSan: 'h3', explanation: 'A prophylactic masterpiece — prevents Bg4 pinning the f3 knight, preparing the Nbd2-Nf1-Ng3 maneuver.', playedBy: 'user' },
      { moveSan: 'Na5', explanation: 'The Chigorin variation — reroutes the knight to c4 via a5, targeting the b3 bishop and aiming for queenside counterplay.', playedBy: 'auto' },
    ],
    variations: [
      {
        name: 'Exchange Variation',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Bxc6', 'dxc6', 'O-O', 'f6'],
        description:
          'White trades bishop for knight, giving Black doubled c-pawns but the bishop pair. White aims for a favorable endgame with a 4-vs-3 kingside pawn majority.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. Scotch Game
  // ─────────────────────────────────────────────
  {
    id: 'scotch-game',
    kind: 'opening',
    name: 'Scotch Game',
    eco: 'C44-C45',
    category: "King's Pawn",
    difficulty: 'beginner',
    userColor: 'w',
    description:
      'The Scotch Game opens the center immediately on move 3 with d4. Unlike the Italian or Ruy Lopez, White doesn\'t wait to build up — the fight begins right away. This leads to open positions where piece activity and tactical awareness matter more than memorized theory. Kasparov revived this opening at the top level in the 1990s.',
    keyIdeas: [
      'White gets a space advantage by opening the center early',
      'The imbalanced pawn structure (doubled c-pawns for Black) creates asymmetric play',
      'White aims to use the space advantage and rapid development',
      'Black compensates with the bishop pair and open lines for pieces',
      'Less theory than the Ruy Lopez — good for players who prefer action',
    ],
    commonMistakes: [
      'White playing d4 too aggressively without follow-up development',
      'Black trying to hold the d4 pawn instead of developing',
      'Not recognizing tactical tricks after 4.Nxd4 (like the 4...Bc5 classical variation traps)',
      'Underestimating Black\'s counterplay with active pieces in open positions',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center.', playedBy: 'user' },
      { moveSan: 'e5', explanation: 'Mirrors center control.', playedBy: 'auto' },
      { moveSan: 'Nf3', explanation: 'Develops the knight and attacks the e5 pawn.', playedBy: 'user' },
      { moveSan: 'Nc6', explanation: 'Defends e5 and develops.', playedBy: 'auto' },
      { moveSan: 'd4', explanation: 'Immediately challenges the center — the defining move of the Scotch. White opens lines before Black is fully developed.', playedBy: 'user' },
      { moveSan: 'exd4', explanation: 'Practically forced — declining with d6 gives White a dominant center.', playedBy: 'auto' },
      { moveSan: 'Nxd4', explanation: 'Recaptures with the knight, placing it powerfully in the center.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Develops the knight, pressures e4. The Schmidt variation — most popular and solid.', playedBy: 'auto' },
      { moveSan: 'Nxc6', explanation: 'Trades the centralized knight, doubling Black\'s pawns and creating an imbalanced pawn structure.', playedBy: 'user' },
      { moveSan: 'bxc6', explanation: 'Recaptures toward the center. Doubled pawns are a weakness but the open b-file compensates.', playedBy: 'auto' },
      { moveSan: 'e5', explanation: 'Gains space, kicks the f6 knight, and takes control of key squares.', playedBy: 'user' },
      { moveSan: 'Qe7', explanation: 'Pins the e5 pawn to the king, preparing to win it back or force concessions.', playedBy: 'auto' },
      { moveSan: 'Qe2', explanation: 'Defends e5 while connecting to the king and preparing to develop.', playedBy: 'user' },
      { moveSan: 'Nd5', explanation: 'Knight goes to its best square — centralized and stable.', playedBy: 'auto' },
      { moveSan: 'c4', explanation: 'Kicks the knight, gains more space, and prepares rapid development.', playedBy: 'user' },
      { moveSan: 'Nb6', explanation: 'Retreats but eyes d5 and c4 for the future.', playedBy: 'auto' },
    ],
    variations: [
      {
        name: 'Classical (4...Bc5)',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Bc5', 'Be3', 'Qf6', 'c3', 'Nge7', 'Bc4'],
        description:
          'Black develops the bishop aggressively. The position is sharp with tactical possibilities for both sides.',
      },
      {
        name: 'Scotch Gambit (4.Bc4)',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'd4', 'exd4', 'Bc4', 'Nf6', 'e5', 'd5', 'Bb5', 'Ne4', 'Nxd4'],
        description:
          'White develops the bishop instead of recapturing with the knight. Leads to sharp tactical play and often transposes to the Two Knights Defense.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. King's Gambit
  // ─────────────────────────────────────────────
  {
    id: 'kings-gambit',
    kind: 'opening',
    name: "King's Gambit",
    eco: 'C33-C39',
    category: "King's Pawn",
    difficulty: 'advanced',
    userColor: 'w',
    description:
      'The King\'s Gambit is the quintessential attacking opening. White sacrifices the f-pawn on move 2 to blow open the center and launch an assault on Black\'s king. In return, White gets rapid development, open lines, and a powerful pawn center. Not for the faint-hearted.',
    keyIdeas: [
      'White aims for a strong center (e4+d4) and open f-file for the rook',
      'Rapid development and attack before Black can consolidate the extra pawn',
      'The f4 pawn sacrifice opens diagonals and files toward Black\'s king',
      'Black often faces a choice: hold the pawn (risky) or return it for development',
      'If Black plays ...g5 to hold the pawn, the kingside becomes weak',
    ],
    commonMistakes: [
      'Black holding onto the f4 pawn at all costs, neglecting development',
      'Black playing ...g5 without calculating White\'s h4 breakthrough',
      'White forgetting to castle and getting caught in the center',
      'Overextending the kingside pawns (g5-g4) without piece support',
      'Not understanding that White WANTS open lines, even at material cost',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center.', playedBy: 'user' },
      { moveSan: 'e5', explanation: 'Mirrors center control.', playedBy: 'auto' },
      { moveSan: 'f4', explanation: 'The King\'s Gambit! White sacrifices a pawn to open the f-file and gain a central pawn duo (e4+d4).', playedBy: 'user' },
      { moveSan: 'exf4', explanation: 'Accepts the gambit, winning a pawn. Black must decide whether to hold it or return it for development.', playedBy: 'auto' },
      { moveSan: 'Nf3', explanation: 'Develops while preventing Qh4+ check. Prepares to reclaim the center.', playedBy: 'user' },
      { moveSan: 'g5', explanation: 'The most principled response — defends the f4 pawn and claims kingside space. Bold but committal.', playedBy: 'auto' },
      { moveSan: 'h4', explanation: 'Undermines the g5 pawn chain, opening lines on the kingside.', playedBy: 'user' },
      { moveSan: 'g4', explanation: 'Pushes the knight away, maintaining the extra pawn. The tension escalates.', playedBy: 'auto' },
      { moveSan: 'Ne5', explanation: 'The Kieseritzky Gambit — the knight goes to a powerful central square, attacking f7 and supporting Bc4 ideas.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'The Berlin Defense — develops naturally, attacks e4, and prepares to castle.', playedBy: 'auto' },
      { moveSan: 'Bc4', explanation: 'Develops with pressure on f7, the weakest point. Prepares to castle quickly.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'Counter-strikes in the center! Opens lines for Black\'s pieces and challenges White\'s setup.', playedBy: 'auto' },
      { moveSan: 'exd5', explanation: 'Captures, opening the e-file for the rook after castling.', playedBy: 'user' },
      { moveSan: 'Bd6', explanation: 'Develops with tempo against the e5 knight, preparing to castle.', playedBy: 'auto' },
      { moveSan: 'd4', explanation: 'Establishes the ideal pawn center White was aiming for from the start.', playedBy: 'user' },
      { moveSan: 'Nh5', explanation: 'Reroutes toward f4/g3, eyeing key squares. Prepares kingside counterplay.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles into potential danger but activates the f1 rook on the open f-file.', playedBy: 'user' },
      { moveSan: 'Qxh4', explanation: 'Grabs the h4 pawn, activating the queen. Black has two extra pawns but a vulnerable king.', playedBy: 'auto' },
    ],
    variations: [],
  },

  // ─────────────────────────────────────────────
  // 5. Vienna Game
  // ─────────────────────────────────────────────
  {
    id: 'vienna-game',
    kind: 'opening',
    name: 'Vienna Game',
    eco: 'C25-C29',
    category: "King's Pawn",
    difficulty: 'intermediate',
    userColor: 'w',
    description:
      'The Vienna Game is a clever move-order trick. By playing 2.Nc3 instead of 2.Nf3, White avoids the Petrov Defense and keeps open the option of playing f4 for an aggressive King\'s Gambit-style attack with better piece support. The resulting positions are sharp and dynamic, with less established theory than the main e4 e5 openings.',
    keyIdeas: [
      'Avoids the Petrov Defense — 2...Nf6 is met by Nc3, not the drawish Petrov lines',
      'The f4 push gives King\'s Gambit-style positions with the knight already developed',
      'White aims for a strong center and open f-file',
      'Less theory-heavy than the Italian or Ruy Lopez',
      'The Frankenstein-Dracula variation (3.Bc4 Nxe4 4.Qh5) leads to wild tactical chaos',
    ],
    commonMistakes: [
      'Playing without a clear plan after 2.Nc3 — must know whether to go f4 or Bc4',
      'Ignoring Black\'s d5 counter-strike, which equalizes if not handled well',
      'Overextending on the kingside without securing the center',
      'Not understanding transpositions to King\'s Gambit positions',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center.', playedBy: 'user' },
      { moveSan: 'e5', explanation: 'Mirrors center control.', playedBy: 'auto' },
      { moveSan: 'Nc3', explanation: 'Develops the knight and supports e4. Delays Nf3, avoiding the Petrov Defense and keeping the f4 option open.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Most popular response — develops and attacks e4.', playedBy: 'auto' },
      { moveSan: 'f4', explanation: 'The Vienna Gambit! Similar idea to the King\'s Gambit but with the knight already on c3 supporting e4.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'The strongest counter — strikes the center before White consolidates.', playedBy: 'auto' },
      { moveSan: 'fxe5', explanation: 'Captures, gaining space. The e5 pawn restricts Black\'s knight.', playedBy: 'user' },
      { moveSan: 'Nxe4', explanation: 'Captures the central pawn, placing the knight aggressively.', playedBy: 'auto' },
      { moveSan: 'Nf3', explanation: 'Develops, supports e5, and prepares to contest the center.', playedBy: 'user' },
      { moveSan: 'Be7', explanation: 'The Breyer Variation — develops quietly and prepares castling. Practical and solid.', playedBy: 'auto' },
      { moveSan: 'Qe2', explanation: 'Attacks the e4 knight while connecting pieces. Flexible queen placement.', playedBy: 'user' },
      { moveSan: 'Nxc3', explanation: 'Forced to deal with the threat by trading the knight.', playedBy: 'auto' },
      { moveSan: 'dxc3', explanation: 'Recaptures, opening the d-file for the queen and creating a pawn center.', playedBy: 'user' },
      { moveSan: 'c5', explanation: 'Challenges White\'s center immediately, preventing d4 consolidation.', playedBy: 'auto' },
    ],
    variations: [],
  },

  // ─────────────────────────────────────────────
  // 6. Queen's Gambit Declined (White)
  // ─────────────────────────────────────────────
  {
    id: 'queens-gambit-declined',
    kind: 'opening',
    name: "Queen's Gambit Declined",
    eco: 'D30-D69',
    category: "Queen's Pawn",
    difficulty: 'intermediate',
    userColor: 'w',
    description:
      'The Queen\'s Gambit Declined is the cornerstone of classical chess. Black declines the gambit with 2...e6, building a solid but somewhat passive position. The central strategic tension revolves around Black\'s "bad" light-squared bishop (blocked by the e6 pawn) and Black\'s attempts to free the position with ...c5 or ...e5 pawn breaks.',
    keyIdeas: [
      'White pressures d5 with pieces and pawns, trying to force Black into passivity',
      'Black\'s light-squared bishop is the key strategic problem — it\'s blocked by e6',
      'Black aims for the liberating ...c5 or ...e5 pawn break',
      'The Capablanca maneuver (...Nd5) simplifies and equalizes',
      'The minority attack (b4-b5 against Black\'s queenside pawns) is a classic White plan',
      'Control of the c-file is critical for both sides',
    ],
    commonMistakes: [
      'Black playing too passively and never achieving a pawn break',
      'Not understanding WHY the light-squared bishop is "bad" (because e6 blocks it)',
      'White rushing to open the center before completing development',
      'Black capturing on c4 too early, before developing and castling',
      'Neglecting the c-file — whoever controls it often controls the game',
    ],
    mainLine: [
      { moveSan: 'd4', explanation: 'Controls the center and opens the diagonal for the c1 bishop.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'Equal center control — solid and classical.', playedBy: 'auto' },
      { moveSan: 'c4', explanation: 'The Queen\'s Gambit! Attacks d5 from the side, trying to undermine Black\'s center.', playedBy: 'user' },
      { moveSan: 'e6', explanation: 'Declines the gambit and supports d5 solidly. The downside: locks in the light-squared bishop.', playedBy: 'auto' },
      { moveSan: 'Nc3', explanation: 'Develops and adds more pressure to d5.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Develops and supports d5.', playedBy: 'auto' },
      { moveSan: 'Bg5', explanation: 'Pins the f6 knight to the queen — the classic QGD setup creating tactical and strategic pressure.', playedBy: 'user' },
      { moveSan: 'Be7', explanation: 'Breaks the pin naturally by placing the bishop where it blocks it. Prepares castling.', playedBy: 'auto' },
      { moveSan: 'e3', explanation: 'Supports d4 and opens the diagonal for the f1 bishop. Part of a rock-solid structure.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Castles for safety — essential before the center opens.', playedBy: 'auto' },
      { moveSan: 'Nf3', explanation: 'Completes kingside development, supports d4 and e5.', playedBy: 'user' },
      { moveSan: 'Nbd7', explanation: 'Develops to a flexible square — from d7 the knight can go to f8, b6, or support ...e5 or ...c5.', playedBy: 'auto' },
      { moveSan: 'Rc1', explanation: 'Places the rook on the half-open c-file in advance, preparing for Black\'s eventual ...c5 break.', playedBy: 'user' },
      { moveSan: 'c6', explanation: 'Supports d5 and prepares ...dxc4 followed by ...b5 or ...c5 pawn breaks.', playedBy: 'auto' },
      { moveSan: 'Bd3', explanation: 'Develops the bishop to a natural diagonal, supporting e4 push ideas.', playedBy: 'user' },
      { moveSan: 'dxc4', explanation: 'Now Black captures! The timing matters — Black has already developed and castled.', playedBy: 'auto' },
      { moveSan: 'Bxc4', explanation: 'Recaptures — the bishop is well-placed on c4 targeting e6 and f7.', playedBy: 'user' },
      { moveSan: 'Nd5', explanation: 'The Capablanca freeing maneuver — knight goes to the center, forcing the Bg5 to make a decision.', playedBy: 'auto' },
    ],
    variations: [
      {
        name: 'Tartakower Variation',
        moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'b6'],
        description: 'One of Black\'s most solid setups. The bishop goes to b7, solving the light-square problem.',
      },
      {
        name: 'Lasker Variation',
        moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'Ne4'],
        description: 'Forces simplification by exchanging pieces. Leads to equal, slightly dry positions.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. Queen's Gambit Accepted
  // ─────────────────────────────────────────────
  {
    id: 'queens-gambit-accepted',
    kind: 'opening',
    name: "Queen's Gambit Accepted",
    eco: 'D20-D29',
    category: "Queen's Pawn",
    difficulty: 'intermediate',
    userColor: 'w',
    description:
      'In the QGA, Black captures the c4 pawn not to keep it, but to disrupt White\'s ideal center and develop freely while White spends time recovering the pawn. The resulting positions are more dynamic than the QGD, with Black getting active piece play in exchange for White\'s central pawn majority.',
    keyIdeas: [
      'Black does NOT try to hold the c4 pawn — that leads to a cramped, losing position',
      'Instead, Black uses the tempo White spends recapturing to develop and strike with ...c5',
      'White ends up with a central pawn majority (d4 vs Black\'s e6) which can be powerful',
      'Black counters with piece activity, especially on the long a8-h1 diagonal',
      'The ...c5 pawn break is the most important move in Black\'s plan',
    ],
    commonMistakes: [
      'Black trying to hold the c4 pawn with b5 and a6 too early — gets crushed in the center',
      'White playing too slowly and allowing Black\'s ...c5 break with tempo',
      'Forgetting that the QGA is dynamic — passive play from either side is punished',
      'Black neglecting kingside development while expanding on the queenside',
    ],
    mainLine: [
      { moveSan: 'd4', explanation: 'Controls the center.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'Mirrors center control.', playedBy: 'auto' },
      { moveSan: 'c4', explanation: 'The Queen\'s Gambit — offers a pawn to undermine Black\'s center.', playedBy: 'user' },
      { moveSan: 'dxc4', explanation: 'Accepts the gambit! Black plans to give it back later for active piece play.', playedBy: 'auto' },
      { moveSan: 'Nf3', explanation: 'Develops naturally. White is in no rush to recapture — the c4 pawn can\'t be held long-term.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Develops and controls the center.', playedBy: 'auto' },
      { moveSan: 'e3', explanation: 'Opens the diagonal for the bishop to recapture on c4 while supporting d4.', playedBy: 'user' },
      { moveSan: 'e6', explanation: 'Solid development — prepares Bd6 or Be7. Black doesn\'t try to hold the extra pawn.', playedBy: 'auto' },
      { moveSan: 'Bxc4', explanation: 'Recaptures the pawn with the bishop actively placed on c4.', playedBy: 'user' },
      { moveSan: 'c5', explanation: 'The key counter-strike! Attacks d4 immediately, creating central tension before White consolidates.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles for safety, completing kingside development.', playedBy: 'user' },
      { moveSan: 'a6', explanation: 'Prepares b5, expanding on the queenside and harassing the c4 bishop.', playedBy: 'auto' },
      { moveSan: 'Qe2', explanation: 'Flexible queen move — supports e4 advance and connects rooks.', playedBy: 'user' },
      { moveSan: 'b5', explanation: 'Expands, kicks the bishop, and gains queenside space.', playedBy: 'auto' },
      { moveSan: 'Bb3', explanation: 'Retreats to safety while maintaining the a2-g8 diagonal pressure.', playedBy: 'user' },
      { moveSan: 'Bb7', explanation: 'Develops the bishop to its best diagonal, pressuring e4 and the center.', playedBy: 'auto' },
    ],
    variations: [],
  },

  // ─────────────────────────────────────────────
  // 8. London System
  // ─────────────────────────────────────────────
  {
    id: 'london-system',
    kind: 'opening',
    name: 'London System',
    eco: 'D02',
    category: "Queen's Pawn",
    difficulty: 'beginner',
    userColor: 'w',
    description:
      'The London System is the most popular "system" opening for White. You play the same setup regardless of what Black does: d4, Bf4 (before e3!), e3, Nf3, Bd3, Nbd2, c3. It\'s easy to learn, hard to refute, and gives a solid, playable position every game. The trade-off is that it\'s not the most ambitious — White gets a small, stable advantage rather than a crushing attack.',
    keyIdeas: [
      'Always play Bf4 BEFORE e3 — this is the number one rule of the London',
      'The knight on e5 is White\'s dream square — the Bf4 supports it',
      'White builds a solid pyramid: c3-d4-e3, then expands with e4 when ready',
      'Kingside attacking chances come from the half-open h-file (after Bxg3, hxg3)',
      'The London is a "system" — you can play the same moves in almost any move order',
      'White often plays for a slow, grinding advantage rather than tactical fireworks',
    ],
    commonMistakes: [
      'Playing e3 before Bf4 — locks the bishop inside the pawn chain',
      'Being too passive — the London gives a solid position but you still need a plan',
      'Ignoring Black\'s ...c5 break, which is Black\'s main source of counterplay',
      'Not knowing when to play Bg3 vs keeping the bishop on f4',
      'Failing to play for e4 at the right moment — that\'s the key pawn break',
    ],
    mainLine: [
      { moveSan: 'd4', explanation: 'Controls the center.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'Mirrors center control.', playedBy: 'auto' },
      { moveSan: 'Bf4', explanation: 'THE London System move. Develops the dark-squared bishop BEFORE playing e3 — critical to avoid locking it inside the pawn chain.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Natural development.', playedBy: 'auto' },
      { moveSan: 'e3', explanation: 'NOW e3, supporting d4. The bishop is already outside the pawn chain.', playedBy: 'user' },
      { moveSan: 'c5', explanation: 'Challenges d4 immediately — the best response against the London.', playedBy: 'auto' },
      { moveSan: 'c3', explanation: 'Supports d4 solidly. White creates a "pyramid" pawn structure: c3-d4-e3.', playedBy: 'user' },
      { moveSan: 'Nc6', explanation: 'Develops and adds pressure to d4.', playedBy: 'auto' },
      { moveSan: 'Nd2', explanation: 'Develops toward f3, keeping options open. The knight can also go to b3.', playedBy: 'user' },
      { moveSan: 'e6', explanation: 'Solid development, prepares Bd6.', playedBy: 'auto' },
      { moveSan: 'Ngf3', explanation: 'Completes knight development and supports the e5 outpost.', playedBy: 'user' },
      { moveSan: 'Bd6', explanation: 'Challenges the f4 bishop — forces a decision.', playedBy: 'auto' },
      { moveSan: 'Bg3', explanation: 'Retreats but maintains control of e5. After Bxg3, hxg3 opens the h-file for attack.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Castles for safety.', playedBy: 'auto' },
      { moveSan: 'Bd3', explanation: 'Develops the last minor piece and supports the e4 advance.', playedBy: 'user' },
      { moveSan: 'b6', explanation: 'Prepares Bb7, developing the light-squared bishop to its best diagonal.', playedBy: 'auto' },
      { moveSan: 'Qe2', explanation: 'Flexible queen move — prepares castling and the e4 push.', playedBy: 'user' },
      { moveSan: 'Bb7', explanation: 'Completes development and pressures the long diagonal.', playedBy: 'auto' },
    ],
    variations: [],
  },

  // ─────────────────────────────────────────────
  // 9. King's Indian Attack
  // ─────────────────────────────────────────────
  {
    id: 'kings-indian-attack',
    kind: 'opening',
    name: "King's Indian Attack",
    eco: 'A07-A08',
    category: "King's Pawn",
    difficulty: 'intermediate',
    userColor: 'w',
    description:
      'The King\'s Indian Attack is a flexible system opening where White fianchettoes the kingside bishop and plays for a central e4-e5 push followed by a kingside attack. Bobby Fischer used it to devastating effect in the 1960s. It works against almost any Black setup and avoids massive opening theory.',
    keyIdeas: [
      'White plays the same setup almost regardless of Black\'s system: Nf3, g3, Bg2, O-O, d3, Nbd2',
      'The key break is e4-e5, gaining space and cramping Black',
      'After e5, White attacks on the kingside with Nf1-h2/e3, h4-h5, and piece maneuvers',
      'The Bg2 controls the long diagonal and can become devastating if the center opens',
      'Less theory than other e4 openings — understanding the plan matters more than memorization',
    ],
    commonMistakes: [
      'Playing e5 too early without sufficient preparation',
      'Forgetting to play Re1 before pushing e5 — the rook must support the pawn',
      'Ignoring Black\'s queenside counterplay (b5-b4, a5-a4)',
      'Being too slow — if White doesn\'t push e5 in time, Black equalizes easily',
      'Not adapting the setup against different Black defenses',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Center control — but White won\'t push further immediately.', playedBy: 'user' },
      { moveSan: 'e6', explanation: 'Black plays a French Defense setup.', playedBy: 'auto' },
      { moveSan: 'd3', explanation: 'NOT d4! White plays modestly, preparing a King\'s Indian setup in reverse.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'Takes center space with a standard approach.', playedBy: 'auto' },
      { moveSan: 'Nd2', explanation: 'Unusual-looking but purposeful — the knight goes to d2 (not c3) to keep the c-pawn free and support a future e4-e5 push.', playedBy: 'user' },
      { moveSan: 'c5', explanation: 'Gains queenside space.', playedBy: 'auto' },
      { moveSan: 'Ngf3', explanation: 'Develops the second knight and prepares to fianchetto the bishop.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Develops naturally.', playedBy: 'auto' },
      { moveSan: 'g3', explanation: 'Prepares the fianchetto — the bishop on g2 will be powerful on the long diagonal.', playedBy: 'user' },
      { moveSan: 'Nc6', explanation: 'Develops and controls the center.', playedBy: 'auto' },
      { moveSan: 'Bg2', explanation: 'The fianchettoed bishop. It looks passive but it X-rays d5 and controls the whole long diagonal.', playedBy: 'user' },
      { moveSan: 'Be7', explanation: 'Solid development and prepares castling.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Completes the setup. White now has a compact, flexible position.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Both sides castled — the middlegame begins.', playedBy: 'auto' },
      { moveSan: 'Re1', explanation: 'Supports e4, preparing the e4-e5 push which is the key break.', playedBy: 'user' },
      { moveSan: 'b5', explanation: 'Black expands on the queenside — the typical counter to the KIA.', playedBy: 'auto' },
    ],
    variations: [],
  },

  // ─────────────────────────────────────────────
  // 10. Sicilian Defense — Najdorf
  // ─────────────────────────────────────────────
  {
    id: 'sicilian-najdorf',
    kind: 'opening',
    name: 'Sicilian Defense: Najdorf',
    eco: 'B90-B99',
    category: "King's Pawn",
    difficulty: 'advanced',
    userColor: 'b',
    description:
      'The Sicilian Najdorf is the most popular and deeply analyzed defense in all of chess. Fischer, Kasparov, and nearly every world champion has played it. Black creates an asymmetric position from move 1, trading a wing pawn (c5) for White\'s central pawn (d4). The English Attack leads to one of chess\'s most spectacular middlegame battles: opposite-side castling with both sides racing to attack.',
    keyIdeas: [
      'Black\'s c-file pressure is the main structural advantage from the Sicilian exchange',
      'The Najdorf\'s ...a6 prevents annoying Bb5/Nb5 while keeping all options open',
      'In the English Attack, it\'s a RACE — White attacks kingside (g4-g5-h4), Black attacks queenside (...b5-b4, ...Rc8, ...a5)',
      'Piece activity and timing are more important than material',
      'The position is incredibly theory-heavy — preparation matters enormously',
    ],
    commonMistakes: [
      'Playing the Sicilian without understanding that it leads to FIGHTING chess, not quiet positions',
      'As White, playing passively against the Najdorf and letting Black equalize',
      'As Black, forgetting to generate queenside counterplay — if you just defend, White\'s attack crashes through',
      'Miscounting tempi in the opposite-side castling race',
      'Not knowing the tactical tricks (sacrifices on b5, e6, d5 are thematic)',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'c5', explanation: 'The Sicilian! Black fights for the center asymmetrically — c5 controls d4 and gives Black the semi-open c-file after the exchange.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Develops and prepares d4.', playedBy: 'auto' },
      { moveSan: 'd6', explanation: 'Supports a future ...e5 advance and opens the c8 bishop diagonal. The Najdorf move order.', playedBy: 'user' },
      { moveSan: 'd4', explanation: 'Opens the center — White wants to trade pawns for a 2-to-1 central majority.', playedBy: 'auto' },
      { moveSan: 'cxd4', explanation: 'Captures, opening the c-file for Black\'s rook. The key structural element of the Open Sicilian.', playedBy: 'user' },
      { moveSan: 'Nxd4', explanation: 'Centralizes the knight powerfully.', playedBy: 'auto' },
      { moveSan: 'Nf6', explanation: 'Develops and pressures e4.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Develops and supports e4.', playedBy: 'auto' },
      { moveSan: 'a6', explanation: 'The NAJDORF move. Prevents Bb5 and Nb5, prepares ...e5 or ...b5. This modest pawn move gives Black maximum flexibility.', playedBy: 'user' },
      { moveSan: 'Be3', explanation: 'The English Attack — develops the bishop and prepares queenside castling with a kingside pawn storm.', playedBy: 'auto' },
      { moveSan: 'e5', explanation: 'Grabs center space and kicks the d4 knight.', playedBy: 'user' },
      { moveSan: 'Nb3', explanation: 'Retreats to a stable square, eyes c5 and d4.', playedBy: 'auto' },
      { moveSan: 'Be6', explanation: 'Develops the bishop actively and prepares ...d5 ideas.', playedBy: 'user' },
      { moveSan: 'f3', explanation: 'Supports e4 and prepares g4-g5 kingside attack.', playedBy: 'auto' },
      { moveSan: 'Be7', explanation: 'Develops and prepares castling.', playedBy: 'user' },
      { moveSan: 'Qd2', explanation: 'Connects rooks, prepares O-O-O, and supports Bh6 ideas.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles kingside.', playedBy: 'user' },
      { moveSan: 'O-O-O', explanation: 'Castles opposite side! Now both kings are on different flanks. The race begins.', playedBy: 'auto' },
      { moveSan: 'Nbd7', explanation: 'Develops the last minor piece, supports e5, and prepares ...b5 queenside attack.', playedBy: 'user' },
    ],
    variations: [],
  },

  // ─────────────────────────────────────────────
  // 11. Sicilian Defense — Dragon
  // ─────────────────────────────────────────────
  {
    id: 'sicilian-dragon',
    kind: 'opening',
    name: 'Sicilian Defense: Dragon',
    eco: 'B70-B79',
    category: "King's Pawn",
    difficulty: 'advanced',
    userColor: 'b',
    description:
      'The Sicilian Dragon is one of the sharpest openings in chess. Black fianchettoes the dark-squared bishop to g7 (the "dragon" bishop), which becomes a fearsome attacking piece on the long diagonal. The Yugoslav Attack features opposite-side castling and a full-speed kingside pawn storm. Both sides are literally racing to checkmate each other.',
    keyIdeas: [
      'The dragon bishop on g7 is Black\'s most important piece — NEVER trade it unnecessarily',
      'White\'s plan: h4-h5, exchange on g6, open the h-file, sacrifice on g6 or h7 for mate',
      'Black\'s plan: ...Rc8, ...Ne5-c4, ...a5-a4 queenside pressure. Sometimes ...Rxc3 sacrifices blow open White\'s king',
      'If White plays Bh6 (trying to trade the dragon bishop), Black must decide whether to allow or avoid the trade',
      'This opening is essentially a street fight — both sides must attack or die',
    ],
    commonMistakes: [
      'Black trading the dragon bishop voluntarily — it\'s the most important piece',
      'White playing too slowly — in the Dragon, if you don\'t attack, Black\'s counterplay is faster',
      'Not knowing the key sacrificial ideas (Rxc3 for Black, Bxg6/Nxg6 for White)',
      'Castle timing errors — castling too late on either side is often fatal',
      'As Black, pushing ...d5 at the wrong moment',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'c5', explanation: 'The Sicilian Defense — fighting for asymmetric center control.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Develops and prepares d4.', playedBy: 'auto' },
      { moveSan: 'd6', explanation: 'Supports a future ...e5 and opens the c8 bishop diagonal.', playedBy: 'user' },
      { moveSan: 'd4', explanation: 'Opens the center.', playedBy: 'auto' },
      { moveSan: 'cxd4', explanation: 'Captures, opening the c-file for counterplay.', playedBy: 'user' },
      { moveSan: 'Nxd4', explanation: 'Recaptures with the knight centrally.', playedBy: 'auto' },
      { moveSan: 'Nf6', explanation: 'Develops and pressures e4.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Develops and supports e4.', playedBy: 'auto' },
      { moveSan: 'g6', explanation: 'The DRAGON! Prepares to fianchetto the dark-squared bishop — it will become a monster on the long diagonal.', playedBy: 'user' },
      { moveSan: 'Be3', explanation: 'Develops and prepares the Yugoslav Attack — the most dangerous setup against the Dragon.', playedBy: 'auto' },
      { moveSan: 'Bg7', explanation: 'Completes the fianchetto. This bishop is the heart of Black\'s position — it pressures the entire long diagonal.', playedBy: 'user' },
      { moveSan: 'f3', explanation: 'Supports e4 and prepares the g4 pawn storm as part of the Yugoslav Attack blueprint.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles kingside, preparing for battle.', playedBy: 'user' },
      { moveSan: 'Qd2', explanation: 'Prepares O-O-O and links rooks. Also connects to Bh6 ideas to trade Black\'s powerful bishop.', playedBy: 'auto' },
      { moveSan: 'Nc6', explanation: 'Develops and pressures d4.', playedBy: 'user' },
      { moveSan: 'Bc4', explanation: 'Places the bishop on c4 to prevent ...d5 and target f7.', playedBy: 'auto' },
      { moveSan: 'Bd7', explanation: 'Develops and prepares ...Rc8 with pressure on the c-file.', playedBy: 'user' },
      { moveSan: 'O-O-O', explanation: 'Castles queenside — the race is ON. White attacks kingside, Black attacks queenside.', playedBy: 'auto' },
      { moveSan: 'Rc8', explanation: 'Occupies the open c-file — Black\'s main highway for counterplay.', playedBy: 'user' },
      { moveSan: 'Bb3', explanation: 'Moves the bishop to safety from tactical tricks on c4 while maintaining f7 pressure.', playedBy: 'auto' },
      { moveSan: 'Ne5', explanation: 'Repositions the knight to attack c4 and support ...Nc4 infiltration.', playedBy: 'user' },
      { moveSan: 'h4', explanation: 'Begins the kingside pawn storm! h4-h5-hxg6 opens the h-file for a devastating attack.', playedBy: 'auto' },
      { moveSan: 'h5', explanation: 'Blocks the pawn storm. Now White must find another way to break through.', playedBy: 'user' },
    ],
    variations: [],
  },

  // ─────────────────────────────────────────────
  // 12. Sicilian Defense — Alapin
  // ─────────────────────────────────────────────
  {
    id: 'sicilian-alapin',
    kind: 'opening',
    name: 'Sicilian Defense: Alapin',
    eco: 'B22',
    category: "King's Pawn",
    difficulty: 'beginner',
    userColor: 'b',
    description:
      'The Alapin Variation (2.c3) is White\'s way of avoiding the terrifying main-line Sicilian theory. Instead of the Open Sicilian, White prepares a solid d4 advance with pawn support. The resulting positions often feature an isolated queen pawn (IQP) for White, giving dynamic play with piece activity at the cost of a long-term structural weakness.',
    keyIdeas: [
      'White gets a solid center without entering Open Sicilian complications',
      'The IQP (isolated d4 pawn) gives White active piece play and d5 push potential',
      'Black should pressure d4 and aim for a favorable endgame where the IQP becomes weak',
      'The Alapin sidesteps ALL mainline Sicilian theory — Dragon, Najdorf, Scheveningen, all gone',
      'Both sides get clear, straightforward plans',
    ],
    commonMistakes: [
      'As Black, not playing ...d5 early enough — letting White get a free e4+d4 center is terrible',
      'As White, not understanding IQP positions — you must play actively, not passively',
      'Ignoring the structural implications of the isolated d4 pawn',
      'Black being overly passive when the position calls for active piece play',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'c5', explanation: 'The Sicilian Defense.', playedBy: 'user' },
      { moveSan: 'c3', explanation: 'The Alapin! White prepares d4 with pawn support, avoiding all massive Sicilian theory.', playedBy: 'auto' },
      { moveSan: 'd5', explanation: 'The most principled response — strikes the center immediately before White gets an ideal e4+d4 center.', playedBy: 'user' },
      { moveSan: 'exd5', explanation: 'Captures. Now Black must decide how to recapture.', playedBy: 'auto' },
      { moveSan: 'Qxd5', explanation: 'Recaptures with the queen. Early queen development but it\'s the best option — Nf6xd5 allows d4 with tempo.', playedBy: 'user' },
      { moveSan: 'd4', explanation: 'Achieves the ideal pawn center White was aiming for.', playedBy: 'auto' },
      { moveSan: 'Nf6', explanation: 'Develops with tempo against the queen on d5.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Develops and supports d4.', playedBy: 'auto' },
      { moveSan: 'e6', explanation: 'Solid development — prepares bishop development.', playedBy: 'user' },
      { moveSan: 'Be2', explanation: 'Develops the bishop to a modest but solid square.', playedBy: 'auto' },
      { moveSan: 'cxd4', explanation: 'Opens the position and creates an isolated d4 pawn for White.', playedBy: 'user' },
      { moveSan: 'cxd4', explanation: 'Recaptures. White now has an IQP — double-edged with attacking potential but a long-term weakness.', playedBy: 'auto' },
      { moveSan: 'Nc6', explanation: 'Develops and pressures d4, the weak isolated pawn.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Castles.', playedBy: 'auto' },
      { moveSan: 'Be7', explanation: 'Develops and prepares castling.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Develops the last minor piece and supports a d5 push.', playedBy: 'auto' },
      { moveSan: 'Qd6', explanation: 'The queen moves to a safe, active square supporting both sides of the board.', playedBy: 'user' },
    ],
    variations: [],
  },

  // ─────────────────────────────────────────────
  // 13. French Defense
  // ─────────────────────────────────────────────
  {
    id: 'french-defense',
    kind: 'opening',
    name: 'French Defense',
    eco: 'C00-C19',
    category: "King's Pawn",
    difficulty: 'intermediate',
    userColor: 'b',
    description:
      'The French Defense is a fighting weapon for Black against 1.e4. By playing 1...e6 and 2...d5, Black creates a closed center where long-term pawn structure and piece maneuvering matter more than tactical tricks. The French has one major drawback: the light-squared bishop on c8 gets locked behind the e6 pawn. Black\'s entire strategy revolves around either activating this bishop or compensating for its passivity.',
    keyIdeas: [
      'Attack the BASE of White\'s pawn chain — always play ...c5 against the Advance, ...c5 or ...f6 to challenge e5',
      'The "bad" bishop on c8 is Black\'s strategic problem — look for ways to trade it or activate it',
      'Black\'s pawn breaks are ...c5 (queenside) and ...f6 (kingside) — both challenge White\'s center',
      'Space is NOT everything — Black\'s compact position is hard to crack',
      'The French is a counterattacking weapon — Black lets White overextend and then strikes',
    ],
    commonMistakes: [
      'Not understanding the light-squared bishop problem — Black must have a plan for it',
      'As White, overextending without adequate piece support',
      'As Black, playing passively without ever achieving a pawn break',
      'Forgetting that ...c5 is the most important move in almost every French variation',
      'White attacking too early before the center is secure',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'e6', explanation: 'The French Defense — Black plays e6 before d5 to create a closed, structural battle.', playedBy: 'user' },
      { moveSan: 'd4', explanation: 'Builds the ideal center.', playedBy: 'auto' },
      { moveSan: 'd5', explanation: 'Challenges e4 immediately. Now White must make a fundamental decision about the pawn structure.', playedBy: 'user' },
      { moveSan: 'e5', explanation: 'The Advance Variation — White pushes forward, gaining space but fixing the center.', playedBy: 'auto' },
      { moveSan: 'c5', explanation: 'The most important move in the French! Attacks d4, the base of White\'s pawn chain — the classic Nimzowitsch idea.', playedBy: 'user' },
      { moveSan: 'c3', explanation: 'Supports d4, the critical pawn. Without this, Black\'s ...c5 breaks through.', playedBy: 'auto' },
      { moveSan: 'Nc6', explanation: 'Develops and adds more pressure to d4.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Develops and supports d4 further.', playedBy: 'auto' },
      { moveSan: 'Qb6', explanation: 'Puts pressure on both d4 and b2 — a very active queen placement that forces concessions.', playedBy: 'user' },
      { moveSan: 'a3', explanation: 'Prepares b4, expanding on the queenside while supporting d4.', playedBy: 'auto' },
      { moveSan: 'Nh6', explanation: 'Unusual-looking but strong! The knight reroutes to f5 where it attacks d4 and e3. In the French, knights often take indirect routes.', playedBy: 'user' },
      { moveSan: 'b4', explanation: 'Gains queenside space and supports c5 ideas.', playedBy: 'auto' },
      { moveSan: 'cxd4', explanation: 'Opens the position on Black\'s terms.', playedBy: 'user' },
      { moveSan: 'cxd4', explanation: 'Recaptures, maintaining the center.', playedBy: 'auto' },
      { moveSan: 'Nf5', explanation: 'Knight arrives at its destination — pressuring d4 and eyeing e3 and g3.', playedBy: 'user' },
    ],
    variations: [
      {
        name: 'Winawer Variation',
        moves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7'],
        description:
          'The sharpest French. Black pins and captures the knight, giving White doubled c-pawns but conceding the bishop pair. Wild, unbalanced play.',
      },
      {
        name: 'Classical Variation',
        moves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e5', 'Nfd7', 'Bxe7', 'Qxe7', 'f4'],
        description:
          'White builds a strong center and prepares a kingside pawn storm. Black seeks counterplay with ...c5 and ...f6.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 14. Caro-Kann Defense
  // ─────────────────────────────────────────────
  {
    id: 'caro-kann',
    kind: 'opening',
    name: 'Caro-Kann Defense',
    eco: 'B10-B19',
    category: "King's Pawn",
    difficulty: 'beginner',
    userColor: 'b',
    description:
      'The Caro-Kann is the "French Defense done right" in terms of the light-squared bishop. By playing 1...c6 instead of 1...e6, Black keeps the diagonal open for the c8 bishop to develop to f5 BEFORE playing ...e6. The result is a solid, sound position where Black\'s pieces are well-coordinated. The choice of positional players who want a reliable, low-risk response to 1.e4.',
    keyIdeas: [
      'The bishop comes out to f5 BEFORE e6 — that\'s the whole point of c6 over e6',
      'Black\'s position is solid but slightly passive — Black must be patient',
      'The h4-h5 advance is White\'s main way to gain kingside space',
      'Black should aim for ...c5 eventually to challenge d4 and open the position',
      'Endgames are often favorable for Black thanks to the sound pawn structure',
      'Less tactical fireworks than the Sicilian but more reliable and easier to play',
    ],
    commonMistakes: [
      'As Black, playing ...e6 before ...Bf5 defeats the entire purpose of the Caro-Kann',
      'Allowing White\'s h4-h5 to bury the bishop on h7 without counterplay',
      'Being too passive — Black must find active moves, not just sit back',
      'Underestimating the Caro-Kann — it\'s boring-looking but very hard to beat',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'c6', explanation: 'The Caro-Kann! Prepares ...d5 while keeping the light-squared bishop\'s diagonal OPEN — the key difference from the French.', playedBy: 'user' },
      { moveSan: 'd4', explanation: 'Builds the center.', playedBy: 'auto' },
      { moveSan: 'd5', explanation: 'Challenges e4 directly — the whole point of 1...c6.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Defends e4.', playedBy: 'auto' },
      { moveSan: 'dxe4', explanation: 'Captures — Black gets an equal share of the center.', playedBy: 'user' },
      { moveSan: 'Nxe4', explanation: 'Recaptures with the knight, centralizing it powerfully.', playedBy: 'auto' },
      { moveSan: 'Bf5', explanation: 'THE Caro-Kann move — develops the bishop OUTSIDE the pawn chain before playing ...e6. This is why c6 was played instead of e6.', playedBy: 'user' },
      { moveSan: 'Ng3', explanation: 'Attacks the bishop, gaining tempo. The knight repositions to a flexible square.', playedBy: 'auto' },
      { moveSan: 'Bg6', explanation: 'Retreats but the bishop is still well-placed, controlling important light squares.', playedBy: 'user' },
      { moveSan: 'h4', explanation: 'Aggressive! Threatens h5, harassing the bishop.', playedBy: 'auto' },
      { moveSan: 'h6', explanation: 'Prevents h5 from immediately causing problems, but weakens the kingside slightly.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Develops naturally.', playedBy: 'auto' },
      { moveSan: 'Nd7', explanation: 'Develops to d7 (not c6, which blocks the c-pawn). From d7 it can go to f6, b6, or e5.', playedBy: 'user' },
      { moveSan: 'h5', explanation: 'Pushes the bishop to a passive square, gaining kingside space.', playedBy: 'auto' },
      { moveSan: 'Bh7', explanation: 'The bishop is pushed back but still defends against e4-entry ideas.', playedBy: 'user' },
      { moveSan: 'Bd3', explanation: 'Develops, offering a trade of light-squared bishops which favors White.', playedBy: 'auto' },
      { moveSan: 'Bxd3', explanation: 'Accepts the trade — keeping the bishop on h7 long-term isn\'t productive.', playedBy: 'user' },
      { moveSan: 'Qxd3', explanation: 'Recaptures, placing the queen on a central, active square.', playedBy: 'auto' },
      { moveSan: 'e6', explanation: 'NOW Black plays e6 (after the bishop is already out), completing the pawn structure.', playedBy: 'user' },
    ],
    variations: [
      {
        name: 'Advance Variation',
        moves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'Be3', 'Nd7'],
        description:
          'Similar to the French Advance, but Black\'s bishop is already out! Black gets comfortable play.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 15. Pirc Defense
  // ─────────────────────────────────────────────
  {
    id: 'pirc-defense',
    kind: 'opening',
    name: 'Pirc Defense',
    eco: 'B07-B09',
    category: "King's Pawn",
    difficulty: 'intermediate',
    userColor: 'b',
    description:
      'The Pirc Defense is a hypermodern opening where Black allows White to build a massive pawn center (d4+e4) and then attacks it with pieces and pawn breaks. The dark-squared bishop on g7 becomes a powerful attacker once the center opens. The Austrian Attack (4.f4) is White\'s most challenging response — huge space but potential overextension.',
    keyIdeas: [
      'Let White build a big center, then undermine it with ...e5 or ...c5',
      'The fianchettoed bishop on g7 is Black\'s star piece',
      'Timing of the ...e5 break is EVERYTHING — too early and Black gets crushed, too late and White consolidates',
      'If White overextends (d4+e4+f4), the center can collapse spectacularly',
      'Black often plays ...c6 and ...b5 for queenside counterplay as well',
    ],
    commonMistakes: [
      'Playing ...e5 too early before developing pieces',
      'Allowing White to steamroll the center without any counter-measures',
      'Underestimating White\'s space advantage — Black must be precise',
      'Not knowing when to play ...e5 vs ...c5 (both are valid breaks in different positions)',
      'Exchanging the fianchettoed bishop unnecessarily',
    ],
    mainLine: [
      { moveSan: 'e4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'd6', explanation: 'The Pirc! Black does NOT challenge the center immediately — instead developing pieces first for a hypermodern counter-attack.', playedBy: 'user' },
      { moveSan: 'd4', explanation: 'White happily takes more center space.', playedBy: 'auto' },
      { moveSan: 'Nf6', explanation: 'Develops and puts pressure on e4 from a distance.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Supports e4 and develops.', playedBy: 'auto' },
      { moveSan: 'g6', explanation: 'Prepares the fianchetto of the dark-squared bishop — the heart of the Pirc.', playedBy: 'user' },
      { moveSan: 'f4', explanation: 'The Austrian Attack! White seizes maximum space with pawns on d4, e4, and f4.', playedBy: 'auto' },
      { moveSan: 'Bg7', explanation: 'Completes the fianchetto. The bishop eyes the long diagonal through the center.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Develops and supports the center.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles early for safety since White has a massive center and attacking chances.', playedBy: 'user' },
      { moveSan: 'Bd3', explanation: 'Develops the bishop and supports e5 push ideas.', playedBy: 'auto' },
      { moveSan: 'Nc6', explanation: 'Develops and adds pressure to d4.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Castles, preparing to open the center.', playedBy: 'auto' },
      { moveSan: 'e5', explanation: 'NOW Black strikes! After patient preparation, the ...e5 break challenges White\'s huge center. The timing is critical.', playedBy: 'user' },
    ],
    variations: [],
  },

  // ─────────────────────────────────────────────
  // 16. King's Indian Defense
  // ─────────────────────────────────────────────
  {
    id: 'kings-indian-defense',
    kind: 'opening',
    name: "King's Indian Defense",
    eco: 'E60-E99',
    category: "Queen's Pawn",
    difficulty: 'advanced',
    userColor: 'b',
    description:
      'The King\'s Indian Defense is one of the most dynamic and complex openings in chess. Black allows White to build a massive pawn center and then launches a direct kingside attack aimed at checkmate. The Mar del Plata variation is the ultimate expression: after d5 closes the center, both sides attack on opposite flanks. Kasparov and Fischer were the greatest KID practitioners.',
    keyIdeas: [
      'Black\'s plan is KINGSIDE ATTACK: ...f5, ...f4, ...g5, ...Rf6-h6, sometimes ...Nf6-h5-f4',
      'White\'s plan is QUEENSIDE BREAKTHROUGH: c4-c5, b4, a4, Nc4, pressure on the d6 pawn',
      'The center is CLOSED after d5 — flank attacks are the only way to make progress',
      'The race is real: whoever breaks through first often wins',
      'The Bg7 becomes a monster if Black\'s center breaks open',
    ],
    commonMistakes: [
      'As Black, not attacking fast enough — if White\'s c5 break comes first, Black is in trouble',
      'Playing ...f5 without preparation (the e4 square can become weak)',
      'As White, not playing c5 in time — you can\'t just sit back and defend',
      'Not understanding the pawn structure after d5 — this is a CLOSED position requiring flank play',
      'Black exchanging the Bg7 voluntarily (it\'s the key attacking piece)',
    ],
    mainLine: [
      { moveSan: 'd4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'Nf6', explanation: 'Develops and controls e4. Black delays ...d5 for a hypermodern approach.', playedBy: 'user' },
      { moveSan: 'c4', explanation: 'Gains more space and controls d5.', playedBy: 'auto' },
      { moveSan: 'g6', explanation: 'The King\'s Indian setup begins — prepares to fianchetto the bishop.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Develops and supports e4.', playedBy: 'auto' },
      { moveSan: 'Bg7', explanation: 'The fianchettoed bishop — aims at the center and queenside, a powerful long-range piece.', playedBy: 'user' },
      { moveSan: 'e4', explanation: 'White builds the massive center Black has invited. Pawns on c4, d4, e4 control huge territory.', playedBy: 'auto' },
      { moveSan: 'd6', explanation: 'Supports ...e5 and keeps things solid. Black is NOT trying to prevent White\'s center.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Develops and completes the setup.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles early — Black\'s king is safe before the fireworks begin.', playedBy: 'user' },
      { moveSan: 'Be2', explanation: 'Classical development — the most testing approach.', playedBy: 'auto' },
      { moveSan: 'e5', explanation: 'NOW Black strikes! ...e5 challenges d4 and creates central tension — the key moment of the King\'s Indian.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Castles, preparing to exploit the center.', playedBy: 'auto' },
      { moveSan: 'Nc6', explanation: 'Develops and adds pressure to d4 and e5.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'The critical response — closes the center. The game will be decided on the FLANKS: White attacks queenside, Black attacks kingside.', playedBy: 'auto' },
      { moveSan: 'Ne7', explanation: 'Reroutes the knight toward the kingside (via g6 or f5) to support the kingside attack.', playedBy: 'user' },
      { moveSan: 'Ne1', explanation: 'White reroutes the knight to d3 or c2, supporting the queenside c4-c5 push.', playedBy: 'auto' },
      { moveSan: 'Nd7', explanation: 'Reroutes the knight as well — it may go to f6, f8, or c5 for defense or attack.', playedBy: 'user' },
    ],
    variations: [
      {
        name: 'Bayonet Attack (9.b4)',
        moves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'b4'],
        description: 'White aims for an immediate c5 break with b4 support. Very dangerous for Black if unprepared.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 17. Nimzo-Indian Defense
  // ─────────────────────────────────────────────
  {
    id: 'nimzo-indian',
    kind: 'opening',
    name: 'Nimzo-Indian Defense',
    eco: 'E20-E59',
    category: "Queen's Pawn",
    difficulty: 'intermediate',
    userColor: 'b',
    description:
      'The Nimzo-Indian is considered one of the best defenses against 1.d4. By pinning the c3 knight with ...Bb4, Black prevents White from establishing the ideal e4 center. The key strategic trade-off: Black gives up the bishop pair (Bxc3) to saddle White with doubled c-pawns. Both sides fight over this fundamental question throughout the game.',
    keyIdeas: [
      'The PIN on c3 prevents e4 — that\'s the whole point of ...Bb4',
      'Black WANTS to capture on c3 and create doubled pawns for White',
      'In return, White gets the bishop pair and open lines',
      'Black should try to CLOSE the position (where doubled pawns are weak and bishops are limited)',
      'White should try to OPEN the position (where the bishop pair shines)',
      'The c3 doubled pawn is a target Black can pressure for the entire game',
    ],
    commonMistakes: [
      'As White, overvaluing the bishop pair in closed positions',
      'As Black, giving up the bishop pair and then failing to pressure the doubled pawns',
      'Not understanding the fundamental trade-off: structure vs piece power',
      'Playing the wrong pawn structure — open vs closed determines who stands better',
    ],
    mainLine: [
      { moveSan: 'd4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'Nf6', explanation: 'Develops and controls e4. An "Indian" defense — Black delays ...d5.', playedBy: 'user' },
      { moveSan: 'c4', explanation: 'Gains space and controls d5.', playedBy: 'auto' },
      { moveSan: 'e6', explanation: 'Prepares ...Bb4 and supports ...d5 later.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Develops and supports e4.', playedBy: 'auto' },
      { moveSan: 'Bb4', explanation: 'The NIMZO-INDIAN! Pins the c3 knight — if it\'s immobilized, White can\'t easily play e4 and build a big center.', playedBy: 'user' },
      { moveSan: 'e3', explanation: 'The Rubinstein system — White accepts a modest center, planning solid development.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles immediately for king safety.', playedBy: 'user' },
      { moveSan: 'Bd3', explanation: 'Develops the bishop to a good diagonal, supporting e4 ideas.', playedBy: 'auto' },
      { moveSan: 'd5', explanation: 'Challenges the center. The timing is strategic — Black waited until White committed to e3.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Completes development and supports d4 and e5.', playedBy: 'auto' },
      { moveSan: 'c5', explanation: 'Attacks d4! Black wants to force exchanges and exploit the doubled pawns after Bxc3.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Castles for safety.', playedBy: 'auto' },
      { moveSan: 'Nc6', explanation: 'Develops and adds pressure to d4.', playedBy: 'user' },
      { moveSan: 'a3', explanation: 'Forces the bishop to decide — capture on c3 or retreat. The key moment.', playedBy: 'auto' },
      { moveSan: 'Bxc3', explanation: 'Captures! Black gives up the bishop pair but doubles White\'s c-pawns — the fundamental Nimzo-Indian trade-off.', playedBy: 'user' },
      { moveSan: 'bxc3', explanation: 'Forced recapture. White has doubled c-pawns (a permanent weakness) but the bishop pair and open b-file.', playedBy: 'auto' },
      { moveSan: 'dxc4', explanation: 'Captures, opening the position while the doubled pawns remain.', playedBy: 'user' },
      { moveSan: 'Bxc4', explanation: 'Recaptures — the bishop is well-placed.', playedBy: 'auto' },
      { moveSan: 'Qc7', explanation: 'Active queen placement, eyeing c3 (the doubled pawn) and supporting e5 or b6 plans.', playedBy: 'user' },
    ],
    variations: [
      {
        name: 'Classical/Capablanca (4.Qc2)',
        moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'Qc2', 'O-O', 'a3', 'Bxc3+', 'Qxc3', 'b6'],
        description:
          'White avoids doubled pawns by recapturing with the queen. Clean structure but the queen moves twice early.',
      },
      {
        name: 'Samisch (4.a3)',
        moves: ['d4', 'Nf6', 'c4', 'e6', 'Nc3', 'Bb4', 'a3', 'Bxc3+', 'bxc3', 'c5'],
        description:
          'White forces the trade immediately, accepting doubled pawns for the bishop pair and e4 push.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 18. Queen's Gambit Declined (Black)
  // ─────────────────────────────────────────────
  {
    id: 'qgd-black',
    kind: 'opening',
    name: "Queen's Gambit Declined (Black)",
    eco: 'D30-D69',
    category: "Queen's Pawn",
    difficulty: 'intermediate',
    userColor: 'b',
    description:
      'The QGD from Black\'s perspective. You\'re declining the gambit because e6 gives the most solid position. The light-squared bishop problem is real but manageable with ...b6/Bb7 (Tartakower) or ...Nd5 exchanges (Capablanca/Lasker). The ...c5 break is your most important idea — time it carefully. Don\'t be passive!',
    keyIdeas: [
      'Decline the gambit with ...e6 for the most solid position',
      'The light-squared bishop is blocked by e6 — solve this with ...b6/Bb7 or ...Nd5 exchanges',
      'The ...c5 break is your most important idea — time it after developing and castling',
      'The Capablanca maneuver (...Nd5) simplifies and equalizes',
      'Don\'t be passive! The QGD gives a sound position but requires active counterplay',
      'Control of the c-file is critical — contest it with ...Rc8',
    ],
    commonMistakes: [
      'Playing too passively and never achieving a pawn break',
      'Capturing on c4 too early, before developing and castling',
      'Not having a plan for the light-squared bishop',
      'Forgetting about the ...c5 break — it\'s the key to equality',
      'Neglecting the c-file and letting White dominate it',
    ],
    mainLine: [
      { moveSan: 'd4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'd5', explanation: 'Equal center control — solid and classical.', playedBy: 'user' },
      { moveSan: 'c4', explanation: 'The Queen\'s Gambit — attacks d5 from the side.', playedBy: 'auto' },
      { moveSan: 'e6', explanation: 'Declines the gambit. Supports d5 solidly, though it locks in the light-squared bishop — the central strategic challenge.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Develops and pressures d5.', playedBy: 'auto' },
      { moveSan: 'Nf6', explanation: 'Develops and supports d5.', playedBy: 'user' },
      { moveSan: 'Bg5', explanation: 'Pins the f6 knight to the queen — the classic QGD setup.', playedBy: 'auto' },
      { moveSan: 'Be7', explanation: 'Breaks the pin naturally and prepares castling.', playedBy: 'user' },
      { moveSan: 'e3', explanation: 'Supports d4 and opens the f1 bishop diagonal.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles for safety — essential before the center opens.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Completes kingside development.', playedBy: 'auto' },
      { moveSan: 'Nbd7', explanation: 'Develops to a flexible square supporting ...e5 or ...c5 breaks.', playedBy: 'user' },
      { moveSan: 'Rc1', explanation: 'Places the rook on the c-file.', playedBy: 'auto' },
      { moveSan: 'c6', explanation: 'Supports d5 and prepares the well-timed ...dxc4 followed by pawn breaks.', playedBy: 'user' },
      { moveSan: 'Bd3', explanation: 'Develops and supports e4 ideas.', playedBy: 'auto' },
      { moveSan: 'dxc4', explanation: 'NOW Black captures — the timing matters since Black has already developed and castled.', playedBy: 'user' },
      { moveSan: 'Bxc4', explanation: 'Recaptures with the bishop well-placed.', playedBy: 'auto' },
      { moveSan: 'Nd5', explanation: 'The Capablanca freeing maneuver! Forces the Bg5 to decide and leads to simplification.', playedBy: 'user' },
    ],
    variations: [
      {
        name: 'Tartakower Variation',
        moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'b6'],
        description: 'One of Black\'s most solid setups. The bishop goes to b7, solving the light-square problem.',
      },
      {
        name: 'Lasker Variation',
        moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'Ne4'],
        description: 'Forces simplification by exchanging pieces. Leads to equal, slightly dry positions.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 19. Slav Defense
  // ─────────────────────────────────────────────
  {
    id: 'slav-defense',
    kind: 'opening',
    name: 'Slav Defense',
    eco: 'D10-D19',
    category: "Queen's Pawn",
    difficulty: 'intermediate',
    userColor: 'b',
    description:
      'The Slav Defense is the "improved Queen\'s Gambit Declined." Like the QGD, Black supports d5 solidly, but by using c6 instead of e6, the light-squared bishop stays free to develop to f5. This solves the QGD\'s biggest problem. A favorite of world champions including Smyslov, Euwe, and Kramnik.',
    keyIdeas: [
      'The bishop comes out to f5 BEFORE e6 — that\'s why c6 instead of e6',
      'Black gets a solid position without the "bad bishop" problem of the QGD',
      'The ...c5 break remains available (after ...c6, Black can still play ...c5 later)',
      'White\'s a4 prevents ...b5, so Black must find other ways to be active',
      'The pawn structure is flexible — Black can adapt to White\'s setup',
    ],
    commonMistakes: [
      'Playing ...e6 before ...Bf5 — this defeats the purpose of the Slav (just play the QGD then)',
      'Not understanding that ...dxc4 is temporary — Black isn\'t trying to keep the pawn',
      'Allowing White\'s e4 push without adequate preparation',
      'Mixing up the move order between Slav and Semi-Slav',
    ],
    mainLine: [
      { moveSan: 'd4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'd5', explanation: 'Mirrors center control.', playedBy: 'user' },
      { moveSan: 'c4', explanation: 'The Queen\'s Gambit.', playedBy: 'auto' },
      { moveSan: 'c6', explanation: 'The SLAV! Supports d5 with the c-pawn instead of e6, keeping the c8 bishop\'s diagonal open.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Develops.', playedBy: 'auto' },
      { moveSan: 'Nf6', explanation: 'Develops and attacks e4.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Develops and pressures d5.', playedBy: 'auto' },
      { moveSan: 'dxc4', explanation: 'Captures! Now Black will develop the bishop to f5 before playing ...e6 — the whole point of the Slav.', playedBy: 'user' },
      { moveSan: 'a4', explanation: 'Prevents ...b5 which would try to hold the c4 pawn — a critical prophylactic move.', playedBy: 'auto' },
      { moveSan: 'Bf5', explanation: 'THE Slav idea! The bishop comes OUT before ...e6. Compare this to the QGD where the bishop is stuck. This is why the Slav exists.', playedBy: 'user' },
      { moveSan: 'e3', explanation: 'Prepares to recapture on c4 with the bishop.', playedBy: 'auto' },
      { moveSan: 'e6', explanation: 'NOW e6, after the bishop is already active outside the pawn chain.', playedBy: 'user' },
      { moveSan: 'Bxc4', explanation: 'Recaptures, developing the bishop to an active square.', playedBy: 'auto' },
      { moveSan: 'Bb4', explanation: 'Pins the c3 knight (Nimzo-Indian style), adding pressure to e4.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Castles for safety.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Both sides castled — balanced position.', playedBy: 'user' },
    ],
    variations: [
      {
        name: 'Semi-Slav',
        moves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'e6'],
        description:
          'Black plays e6 anyway, transposing to one of the most complex openings in chess. The Meran and Anti-Meran variations are incredibly sharp.',
      },
      {
        name: 'Chebanenko Slav',
        moves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'a6'],
        description:
          'A modern, flexible approach. Black prepares ...b5 to expand on the queenside.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 20. Dutch Defense
  // ─────────────────────────────────────────────
  {
    id: 'dutch-defense',
    kind: 'opening',
    name: 'Dutch Defense',
    eco: 'A80-A99',
    category: "Queen's Pawn",
    difficulty: 'advanced',
    userColor: 'b',
    description:
      'The Dutch Defense is Black\'s aggressive answer to 1.d4. By playing 1...f5, Black seizes control of the e4 square and signals kingside attacking intentions from the very first move. It\'s risky because f5 weakens the kingside, but the payoff is dynamic, attacking chances. The Leningrad variation creates a King\'s Indian structure with the extra ...f5 push.',
    keyIdeas: [
      'Control e4 at all costs — if White gets e4, Black\'s position collapses',
      'The kingside attack is real: ...Qe8-h5, ...e5, ...f4, ...g5 are all part of the plan',
      'The Stonewall variation (...d5, ...c6, ...e6) locks the center and aims for kingside play',
      'f5 weakens the king — Black must be careful about tactics on the e8-h5 diagonal',
      'If White plays d5, the Leningrad becomes a reverse King\'s Indian with attacking chances',
    ],
    commonMistakes: [
      'Playing f5 and then doing nothing with it — you MUST follow up with a plan',
      'Ignoring the kingside weakness created by f5 (the e8-h5 diagonal and g6 complex)',
      'Not controlling e4 — if White plays e4, the Dutch has failed',
      'Being too slow on the kingside — the Dutch requires active play',
    ],
    mainLine: [
      { moveSan: 'd4', explanation: 'Controls the center.', playedBy: 'auto' },
      { moveSan: 'f5', explanation: 'The Dutch Defense! Controls the e4 square and signals a kingside attack from move 1. Ambitious and risky.', playedBy: 'user' },
      { moveSan: 'c4', explanation: 'Gains space and prepares Nc3 and e4 ideas.', playedBy: 'auto' },
      { moveSan: 'Nf6', explanation: 'Develops and reinforces control of e4.', playedBy: 'user' },
      { moveSan: 'g3', explanation: 'Fianchettoes the bishop — the most common White approach.', playedBy: 'auto' },
      { moveSan: 'g6', explanation: 'The Leningrad variation — Black also fianchettoes, creating a King\'s Indian-like structure.', playedBy: 'user' },
      { moveSan: 'Bg2', explanation: 'Fianchettoed bishop controls the long diagonal.', playedBy: 'auto' },
      { moveSan: 'Bg7', explanation: 'Mirrors White\'s setup. The bishop will be important for counterplay.', playedBy: 'user' },
      { moveSan: 'Nf3', explanation: 'Develops naturally.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles early — essential because f5 has weakened the kingside.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Castles.', playedBy: 'auto' },
      { moveSan: 'd6', explanation: 'Supports ...e5, the key pawn break.', playedBy: 'user' },
      { moveSan: 'Nc3', explanation: 'Develops and prepares d5 or e4.', playedBy: 'auto' },
      { moveSan: 'Qe8', explanation: 'Unusual but standard in the Leningrad! The queen prepares to go to h5 for a kingside attack or supports ...e5.', playedBy: 'user' },
    ],
    variations: [
      {
        name: 'Stonewall Variation',
        moves: ['d4', 'f5', 'c4', 'Nf6', 'g3', 'e6', 'Bg2', 'd5', 'Nf3', 'c6'],
        description:
          'Black sets up pawns on c6-d5-e6-f5 creating a "stone wall." The knight on e4 becomes the star piece.',
      },
      {
        name: 'Classical Dutch',
        moves: ['d4', 'f5', 'c4', 'Nf6', 'g3', 'e6', 'Bg2', 'Be7', 'Nf3', 'O-O', 'O-O', 'd6'],
        description:
          'Traditional setup with Be7 instead of fianchetto. Solid but less dynamic.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 21. English Opening
  // ─────────────────────────────────────────────
  {
    id: 'english-opening',
    kind: 'opening',
    name: 'English Opening',
    eco: 'A10-A39',
    category: 'Flank',
    difficulty: 'intermediate',
    userColor: 'w',
    description:
      'The English Opening (1.c4) is the third most popular first move after 1.e4 and 1.d4. It\'s a flexible flank opening that controls d5 without committing to a central pawn structure early. The English can transpose into many other openings or create unique positions. It rewards positional understanding and is excellent for players who want to avoid heavily-theorized main lines.',
    keyIdeas: [
      'Control d5 without occupying the center with pawns immediately',
      'The fianchettoed bishop on g2 is the centerpiece of White\'s strategy',
      'Extreme flexibility — White can transpose to many different openings',
      'The Reversed Sicilian (1.c4 e5) gives White the Sicilian position with an extra move',
      'Positional maneuvering matters more than tactical fireworks',
      'The Botvinnik System (e4+d3+c4 with Nc3 and g3) is a powerful setup',
    ],
    commonMistakes: [
      'Playing without a plan — the English requires understanding of the positions, not just moves',
      'Allowing Black strong central control (if Black gets e5+d5 unchallenged, White has no advantage)',
      'Being too slow — while the English is positional, you can\'t just make random moves',
      'Not understanding transposition possibilities',
    ],
    mainLine: [
      { moveSan: 'c4', explanation: 'The English Opening! White starts on the flank, controlling d5 and preparing a flexible setup. Avoids all of Black\'s prepared responses to 1.e4 and 1.d4.', playedBy: 'user' },
      { moveSan: 'e5', explanation: 'Seizes the center, creating a "Reversed Sicilian" structure.', playedBy: 'auto' },
      { moveSan: 'Nc3', explanation: 'Develops and supports d5 control, prepares g3.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Develops and controls d5.', playedBy: 'auto' },
      { moveSan: 'g3', explanation: 'Prepares the kingside fianchetto — the bishop on g2 will be a long-range sniper.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'Strikes the center, taking advantage of the fact that White doesn\'t have a pawn on e4 yet.', playedBy: 'auto' },
      { moveSan: 'cxd5', explanation: 'Captures, creating an open position.', playedBy: 'user' },
      { moveSan: 'Nxd5', explanation: 'Recaptures, centralizing the knight.', playedBy: 'auto' },
      { moveSan: 'Bg2', explanation: 'Completes the fianchetto. The bishop dominates the long diagonal.', playedBy: 'user' },
      { moveSan: 'Nb6', explanation: 'Retreats to a stable square, eyes c4 and d5.', playedBy: 'auto' },
      { moveSan: 'Nf3', explanation: 'Develops and eyes e5.', playedBy: 'user' },
      { moveSan: 'Nc6', explanation: 'Develops and supports e5.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles for safety.', playedBy: 'user' },
      { moveSan: 'Be7', explanation: 'Develops and prepares castling.', playedBy: 'auto' },
      { moveSan: 'd3', explanation: 'Modest but solid — supports e4 ideas later.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Both sides castled — flexible position.', playedBy: 'auto' },
    ],
    variations: [
      {
        name: 'Symmetrical English',
        moves: ['c4', 'c5', 'Nc3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'Nf3', 'Nf6', 'O-O', 'O-O', 'd4'],
        description: 'Both sides fianchetto, creating a balanced, maneuvering game.',
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 22. Reti Opening
  // ─────────────────────────────────────────────
  {
    id: 'reti-opening',
    kind: 'opening',
    name: 'Reti Opening',
    eco: 'A04-A09',
    category: 'Flank',
    difficulty: 'intermediate',
    userColor: 'w',
    description:
      'The Reti Opening is the quintessential hypermodern opening. Named after Richard Reti, who used it to end Capablanca\'s 63-game unbeaten streak in 1924, this opening challenges the classical dogma that the center must be occupied by pawns. Instead, White develops pieces first and attacks the center from the flanks. The double fianchetto is a hallmark — extremely flexible with many transposition possibilities.',
    keyIdeas: [
      'Hypermodern philosophy: control the center with PIECES, not pawns',
      'The double fianchetto (Bg2 + Bb2) creates enormous long-diagonal pressure',
      'Maximum flexibility — White can transpose to English, QGD, Catalan, or unique Reti positions',
      'Patient, positional play — build up slowly, then strike when the opponent overextends',
      'Richard Reti proved this approach works at the highest level in the 1920s',
    ],
    commonMistakes: [
      'Playing without a plan — hypermodern doesn\'t mean "no plan," it means "different plan"',
      'Allowing Black to dominate the center with both d5 and e5 unchallenged',
      'Not understanding transpositions — the Reti can turn into many different openings',
      'Being too passive — the fianchettoed bishops need open diagonals to be effective',
    ],
    mainLine: [
      { moveSan: 'Nf3', explanation: 'The Reti! A piece move on move 1. Develops the knight, controls e5 and d4, and keeps ALL pawn structure options open.', playedBy: 'user' },
      { moveSan: 'd5', explanation: 'Takes the center — a natural response to White\'s lack of central pawns.', playedBy: 'auto' },
      { moveSan: 'c4', explanation: 'Challenges d5 from the flank — the hypermodern idea of attacking the center with side pawns, not by occupying it.', playedBy: 'user' },
      { moveSan: 'e6', explanation: 'Supports d5. Can also transpose to QGD with a later d4.', playedBy: 'auto' },
      { moveSan: 'g3', explanation: 'Prepares the fianchetto. The bishop on g2 will target d5 and the long diagonal.', playedBy: 'user' },
      { moveSan: 'Nf6', explanation: 'Develops and supports d5.', playedBy: 'auto' },
      { moveSan: 'Bg2', explanation: 'Completes the fianchetto — a long-range weapon aimed at the center.', playedBy: 'user' },
      { moveSan: 'Be7', explanation: 'Develops and prepares castling.', playedBy: 'auto' },
      { moveSan: 'O-O', explanation: 'Castles early, completing kingside development.', playedBy: 'user' },
      { moveSan: 'O-O', explanation: 'Both sides safe.', playedBy: 'auto' },
      { moveSan: 'b3', explanation: 'Prepares a DOUBLE fianchetto — both bishops will be on long diagonals! Maximum long-range piece control.', playedBy: 'user' },
      { moveSan: 'c5', explanation: 'Takes queenside space and challenges d4 ideas.', playedBy: 'auto' },
      { moveSan: 'Bb2', explanation: 'The double fianchetto is complete. Both bishops control the center from long range — the purest expression of hypermodern chess.', playedBy: 'user' },
      { moveSan: 'Nc6', explanation: 'Develops and supports the center.', playedBy: 'auto' },
      { moveSan: 'e3', explanation: 'Modest but supports d4 advance when the time is right.', playedBy: 'user' },
      { moveSan: 'b6', explanation: 'Black considers a double fianchetto of their own — symmetrical, maneuvering play.', playedBy: 'auto' },
    ],
    variations: [],
  },
];
