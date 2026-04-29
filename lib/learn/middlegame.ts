import type { MiddlegameLesson } from './types';

export const middlegameLessons: MiddlegameLesson[] = [
  // =========================================================================
  // STRATEGIC LESSONS (1–7)
  // =========================================================================

  // 1. Pawn Structure — Isolated Pawn
  {
    id: 'pawn-structure-isolated-pawn',
    kind: 'middlegame',
    name: 'Pawn Structure: The Isolated d-Pawn',
    subcategory: 'strategic',
    difficulty: 'intermediate',
    description:
      'An isolated pawn has no friendly pawns on adjacent files to defend it, making it a permanent weakness that must be guarded by pieces. However, the isolani also opens files and diagonals for active play. The side playing against it should blockade the pawn (ideally with a knight), trade pieces to reach an endgame, and pressure it along the file. The side with it should play actively, exploit the open lines, and avoid simplification.',
    // Typical IQP position: White has isolated d4-pawn, active pieces.
    // Black aims to blockade on d5 and simplify into an endgame.
    startingFen: 'r1bq1rk1/pp3ppp/2nbpn2/8/3P4/2NB1N2/PP2QPPP/R1B2RK1 b - - 0 10',
    userColor: 'b',
    mainLine: [
      {
        moveSan: 'Nd5',
        explanation:
          'The knight blockades the isolated pawn on d5 — the ideal square. From here it cannot be chased by a pawn and it restrains the d4-pawn from advancing.',
        playedBy: 'user',
      },
      {
        moveSan: 'Bg5',
        explanation:
          "White pins the f6-knight to the queen, trying to remove a defender of d5 and maintain piece activity — the isolani side must stay dynamic.",
        playedBy: 'auto',
      },
      {
        moveSan: 'Be7',
        explanation:
          'Breaking the pin while keeping pieces aimed at the d4-pawn. The bishop on e7 is solid and defends the kingside.',
        playedBy: 'user',
      },
      {
        moveSan: 'Bxf6',
        explanation:
          "White trades the bishop for the knight, hoping to dislodge the d5 blockade or weaken Black's kingside.",
        playedBy: 'auto',
      },
      {
        moveSan: 'Bxf6',
        explanation:
          'Recapturing with the bishop keeps the knight on d5. The bishop on f6 also pressures d4 along the dark diagonal.',
        playedBy: 'user',
      },
      {
        moveSan: 'Rad1',
        explanation:
          'White defends the isolated pawn with a rook and tries to support a future d4-d5 push.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Rd8',
        explanation:
          "Doubling pressure on the d4-pawn. Black's strategy is clear: pile up on the weakness while the blockading knight on d5 dominates the center.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'An isolated pawn cannot be defended by other pawns — pieces must guard it, tying them down.',
      'Blockade the isolani with a knight on the square directly in front of it.',
      'The side with the isolani must play actively and avoid trades — fewer pieces make the weakness more glaring.',
      'In the endgame, an isolated pawn is almost always a liability.',
    ],
  },

  // 2. Piece Activity — Good vs Bad Bishop
  {
    id: 'piece-activity-good-vs-bad-bishop',
    kind: 'middlegame',
    name: 'Piece Activity: Good vs Bad Bishop',
    subcategory: 'strategic',
    difficulty: 'intermediate',
    description:
      'A "bad" bishop is one blocked by its own pawns — they sit on the same color squares the bishop travels on, restricting its mobility. A "good" bishop has pawns on the opposite color, leaving its diagonals open. Recognizing this distinction is key: you should place pawns on the opposite color of your bishop, and try to trade a bad bishop or activate it by putting it outside the pawn chain.',
    // White has pawns on light squares blocking the light-squared bishop.
    // Black's dark-squared bishop on g7 has wide-open diagonals.
    startingFen: '2rq1rk1/pp2ppbp/3p2p1/8/3PP2n/2PB1P2/PP4PP/R1BQ1RK1 b - - 0 14',
    userColor: 'b',
    mainLine: [
      {
        moveSan: 'f5',
        explanation:
          "Striking at White's center to open lines for the good dark-squared bishop on g7. The pawn break challenges the e4/d4 chain.",
        playedBy: 'user',
      },
      {
        moveSan: 'exf5',
        explanation:
          "White captures, but this opens the f-file and the long diagonal for Black's bishop.",
        playedBy: 'auto',
      },
      {
        moveSan: 'gxf5',
        explanation:
          "Recapturing opens the g-file for the rook and keeps the dark-squared bishop's diagonal wide open. Meanwhile White's light-squared bishop on d3 is still hemmed in.",
        playedBy: 'user',
      },
      {
        moveSan: 'Be2',
        explanation:
          'White tries to reposition the bad bishop, but it remains passive — blocked by its own pawns on c3, d4, and f3.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Nf5',
        explanation:
          "The knight leaps to a powerful outpost. Combined with the dominant g7-bishop aiming at d4, Black's pieces are far more active than White's cramped bishop.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'A "bad" bishop is blocked by its own pawns on the same color squares.',
      'Place your pawns on the opposite color of your remaining bishop.',
      'If you have a bad bishop, try to trade it off or activate it outside the pawn chain.',
      'A good bishop on an open diagonal can dominate the entire board.',
    ],
  },

  // 3. Center Control — Classical vs Hypermodern
  {
    id: 'center-control-classical-vs-hypermodern',
    kind: 'middlegame',
    name: 'Center Control: Classical vs Hypermodern',
    subcategory: 'strategic',
    difficulty: 'beginner',
    description:
      "The classical school says: occupy the center with pawns (e4, d4). The hypermodern school says: let the opponent build a big center, then attack it from the flanks with pieces and pawn breaks. Both approaches are valid in modern chess. This lesson shows the hypermodern approach: Black allows White a big center, then undermines it with ...e5 and a fianchettoed bishop on g7.",
    // King's Indian setup: White has a classical c4+d4 center, Black fianchettoes.
    startingFen: 'rnbqk2r/ppppppbp/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 2 3',
    userColor: 'b',
    mainLine: [
      {
        moveSan: 'O-O',
        explanation:
          "Castling first — king safety before launching the counterattack. The bishop on g7 is already aimed at the center from a distance.",
        playedBy: 'user',
      },
      {
        moveSan: 'e4',
        explanation:
          'White builds the full classical center: pawns on c4, d4, e4. It looks imposing but creates targets.',
        playedBy: 'auto',
      },
      {
        moveSan: 'd6',
        explanation:
          "Preparing ...e5, the thematic King's Indian pawn break. Black doesn't contest the center directly yet — instead setting up the attack.",
        playedBy: 'user',
      },
      {
        moveSan: 'Nf3',
        explanation: 'White develops naturally, supporting the center.',
        playedBy: 'auto',
      },
      {
        moveSan: 'e5',
        explanation:
          "The key hypermodern counter-strike! Black challenges the d4-pawn and fights for central space. The g7-bishop now eyes d4 with full force.",
        playedBy: 'user',
      },
      {
        moveSan: 'd5',
        explanation:
          'White advances to maintain the center, but now the position closes and Black can attack on the kingside with ...f5.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Nbd7',
        explanation:
          'Preparing ...f5 to smash open the kingside. The hypermodern plan is in full swing: the center is locked, and Black attacks on the flank where the g7-bishop is a monster.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Classical approach: occupy the center with pawns (e4, d4) for space and control.',
      'Hypermodern approach: let the opponent build a center, then attack it with pieces and pawn breaks.',
      'A fianchettoed bishop (e.g., Bg7) exerts long-range pressure on the center from the flank.',
      'An overextended center can become a target — advanced pawns leave weaknesses behind them.',
    ],
  },

  // 4. King Safety — Attacking the Castled King
  {
    id: 'king-safety-greek-gift',
    kind: 'middlegame',
    name: 'King Safety: The Greek Gift Sacrifice',
    subcategory: 'strategic',
    difficulty: 'advanced',
    description:
      "The Greek Gift sacrifice (Bxh7+) is one of chess's most famous attacking patterns. When the opponent has castled kingside, a bishop sacrifice on h7 drags the king out of its pawn shelter. The attack typically follows: Bxh7+ Kxh7, Ng5+ (with check), then Qh5 with a devastating assault. The conditions are: a bishop that can reach h7, a knight that can jump to g5, and a queen that can reach h5 quickly. This pattern punishes a weakened kingside where pieces are not well-positioned to defend.",
    // Classic Greek Gift setup from the research doc.
    startingFen: 'r1bq1rk1/pppn1ppp/3bpn2/8/3P4/3B1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Bxh7+',
        explanation:
          "The Greek Gift! The bishop sacrifices itself to rip open the king's pawn shield. Black must accept or lose the pawn for nothing.",
        playedBy: 'user',
      },
      {
        moveSan: 'Kxh7',
        explanation:
          "The king takes — now it's exposed on h7 with no pawn cover.",
        playedBy: 'auto',
      },
      {
        moveSan: 'Ng5+',
        explanation:
          'The knight jumps in with check, forcing the king to decide where to flee. The knight also eyes f7 and opens the path for the queen to h5.',
        playedBy: 'user',
      },
      {
        moveSan: 'Kg8',
        explanation:
          'The king retreats. Other options (Kg6, Kh6) walk into even more danger with Qd3+ or Qg4.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Qh5',
        explanation:
          'The queen arrives with devastating threats: Qh7# and Qxf7+ are both in the air. The knight on g5 and queen on h5 form a lethal battery against the exposed king.',
        playedBy: 'user',
      },
      {
        moveSan: 'Re8',
        explanation:
          'Black tries to defend, but the damage is done — the king position is shattered.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Qxf7+',
        explanation:
          "Capturing with check, winning a second pawn and maintaining the attack. The king has no safe shelter and White's pieces are swarming.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'The Greek Gift requires three ingredients: bishop reaching h7, knight reaching g5, queen reaching h5.',
      'Dragging the king out of its pawn shelter is often worth a full piece — the attack generates more than enough compensation.',
      "Always check the defensive resources: can the opponent block with a piece? Is there a flight square you're not covering?",
      'Prevent this pattern as the defender by keeping pieces near the king and not leaving h7/h2 unguarded.',
    ],
  },

  // 5. Open Files and Diagonals — Rook on Open File
  {
    id: 'open-files-rook-on-seventh',
    kind: 'middlegame',
    name: 'Open Files: Rook on the Seventh Rank',
    subcategory: 'strategic',
    difficulty: 'intermediate',
    description:
      "A rook on the seventh rank (the opponent's second rank) is one of the most powerful positional assets in chess. It attacks pawns still on their starting squares, restricts the enemy king to the back rank, and can set up devastating threats. Two rooks doubled on the seventh rank (\"pigs on the seventh\") can be an overwhelming advantage. The key is to seize an open file first, then penetrate to the seventh.",
    // White rook on b7, dominating the seventh rank.
    startingFen: '6k1/1R3ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Rxf7',
        explanation:
          'The rook on the seventh gobbles a pawn. The f7-pawn was on its starting square — a sitting target for a rook on the seventh rank.',
        playedBy: 'user',
      },
      {
        moveSan: 'Kh8',
        explanation:
          'The king retreats to the corner — it was already confined to the back rank by the rook.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Rxg7',
        explanation:
          'Capturing another pawn. The rook mows down pawns along the seventh rank like a lawnmower. This is why a rook on the seventh is so devastating.',
        playedBy: 'user',
      },
      {
        moveSan: 'Kxg7',
        explanation: 'The king is forced to recapture, leaving only the h-pawn.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Kf2',
        explanation:
          'Activating the king for the endgame. With two extra pawns and an active king, this is a straightforward win. The rook on the seventh created a decisive advantage.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'A rook on the seventh rank attacks unadvanced pawns and confines the enemy king to the back rank.',
      'Two rooks on the seventh ("pigs") is often a winning advantage, even down material elsewhere.',
      'To get a rook to the seventh, first control an open file, then penetrate.',
      'The defender should advance pawns off the second rank or challenge the open file with their own rook.',
    ],
  },

  // 6. Weak Squares — Exploiting a Weak Square Complex
  {
    id: 'weak-squares-exploitation',
    kind: 'middlegame',
    name: 'Weak Squares: Exploiting a Hole',
    subcategory: 'strategic',
    difficulty: 'intermediate',
    description:
      "A weak square is one that can never again be defended by a pawn — a permanent scar left by pawn advances. In the Sicilian Dragon, the d5 square often becomes weak for Black because no pawn can contest it after ...d6 and ...g6. A knight planted on such an outpost is nearly immovable and dominates the position. This lesson shows how to identify and exploit a weak square complex.",
    // Sicilian Dragon: d5 is weak for Black, White aims to exploit it.
    startingFen: 'r1bq1rk1/pp2ppbp/2np2p1/8/3NP3/2N1B3/PPP2PPP/R2QKB1R w KQ - 0 8',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Nd5',
        explanation:
          'The knight occupies the weak d5 square — no Black pawn can ever chase it away. From d5, it controls c7, e7, b6, f6, b4, and f4. This is a dream outpost.',
        playedBy: 'user',
      },
      {
        moveSan: 'Re8',
        explanation: 'Black tries to build counterplay, but the d5 knight is a permanent thorn.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bc4',
        explanation:
          "Developing the bishop to a strong diagonal, supporting the d5 knight and targeting f7. White's pieces coordinate around the weak square.",
        playedBy: 'user',
      },
      {
        moveSan: 'Nd7',
        explanation:
          'Black reroutes the knight, but the d5 outpost gives White a lasting structural advantage.',
        playedBy: 'auto',
      },
      {
        moveSan: 'O-O',
        explanation:
          "Completing development. White can now build pressure at leisure — the d5 knight is not going anywhere, and Black's position is cramped around it.",
        playedBy: 'user',
      },
      {
        moveSan: 'a6',
        explanation: 'Black plays on the queenside, but has no way to challenge the d5 outpost.',
        playedBy: 'auto',
      },
      {
        moveSan: 'f4',
        explanation:
          "Expanding on the kingside with the d5 knight supporting the advance. The weak square has become the anchor for White's entire strategy.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Weak squares are permanent — once a pawn advances, the squares it used to defend can never be pawn-guarded again.',
      'Knights are the best pieces to occupy weak squares (outposts) because they control nearby squares without being easily challenged.',
      'After occupying the outpost, build your strategy around it — the knight anchors your entire position.',
      'To prevent weak squares, be cautious with pawn advances, especially near the center.',
    ],
  },

  // 7. Space Advantage — Restricting the Opponent
  {
    id: 'space-advantage-restriction',
    kind: 'middlegame',
    name: 'Space Advantage: Restriction',
    subcategory: 'strategic',
    difficulty: 'intermediate',
    description:
      "A space advantage means your pawns are further advanced, giving your pieces more room to maneuver while cramping the opponent. The key principle: avoid trading pieces when you have more space — more pieces on a cramped board creates bigger problems for the defender. Instead, restrict the opponent's pawn breaks and maneuver your pieces to attack on the side where you have the advantage.",
    // White has a massive d5+e5 space advantage, Black is cramped.
    startingFen: 'rnbqkb1r/pp1p1ppp/4pn2/2pPP3/8/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Nf3',
        explanation:
          "Developing while maintaining the space advantage. White is in no hurry — the pawns on d5 and e5 cramp Black's position. The goal is to restrict Black's pawn breaks.",
        playedBy: 'user',
      },
      {
        moveSan: 'Be7',
        explanation:
          'Black develops the bishop to a modest square — e7 is the only available diagonal because the e5 pawn blocks f6.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bf4',
        explanation:
          'Developing actively and preventing ...d6, which would challenge the e5 pawn. Every move should maintain the space clamp.',
        playedBy: 'user',
      },
      {
        moveSan: 'O-O',
        explanation: 'Black castles, trying to complete development in the cramped position.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bd3',
        explanation:
          "The bishop targets the kingside from d3. White's pieces have plenty of room to maneuver — that's the space advantage in action.",
        playedBy: 'user',
      },
      {
        moveSan: 'b5',
        explanation:
          "Black desperately tries a queenside pawn break to free the position. Without this, Black's pieces suffocate.",
        playedBy: 'auto',
      },
      {
        moveSan: 'a3',
        explanation:
          "Prophylactically preventing ...b4, which would give Black counterplay. Restricting the opponent's breaks is the key to converting a space advantage.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'A space advantage gives your pieces more squares to maneuver on while cramping the opponent.',
      'Avoid trading pieces when you have more space — more pieces amplify the cramping effect.',
      "Restrict the opponent's pawn breaks (like ...c5, ...f5, ...d6) to deny them counterplay.",
      'If the opponent does break through, the overextended pawns can become targets — so keep the clamp tight.',
    ],
  },

  // =========================================================================
  // TACTICAL LESSONS (8–17)
  // =========================================================================

  // 8. Pin — Absolute Pin Exploitation
  {
    id: 'tactic-pin-absolute',
    kind: 'middlegame',
    name: 'Tactic: Absolute Pin',
    subcategory: 'tactical',
    difficulty: 'beginner',
    description:
      "A pin occurs when a piece cannot move because it would expose a more valuable piece behind it. In an absolute pin, the shielded piece is the king — the pinned piece literally cannot move (it would be illegal, as it would put the king in check). Only bishops, rooks, and queens can create pins. To exploit a pin, pile up attackers on the pinned piece — since it can't move, adding pressure eventually wins it.",
    // Ruy Lopez: Bb5 pins Nc6 to the king on e8. White will exploit the pin.
    startingFen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 3 3',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'O-O',
        explanation:
          "Castling first — the pin on Nc6 isn't going anywhere. White develops safely while the knight remains stuck defending the king.",
        playedBy: 'user',
      },
      {
        moveSan: 'Nge7',
        explanation:
          'Black tries to break the pin by blocking the diagonal with another piece. This is one standard defensive technique.',
        playedBy: 'auto',
      },
      {
        moveSan: 'd4',
        explanation:
          'Striking the center while the pinned knight on c6 is unable to capture on d4 effectively. White exploits the pin to gain central space.',
        playedBy: 'user',
      },
      {
        moveSan: 'exd4',
        explanation: 'Black captures, opening the center.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Nxd4',
        explanation:
          "The knight recaptures and now attacks the pinned Nc6 as well. The pin continues to cause problems — Black's knight is under heavy pressure.",
        playedBy: 'user',
      },
      {
        moveSan: 'g6',
        explanation:
          'Black prepares to fianchetto and resolve the pin, but White has already gained a tempo and central advantage.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Nxc6',
        explanation:
          "Trading on c6 damages Black's pawn structure. The pin allowed White to dictate the timing of this exchange and gain a structural advantage.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'An absolute pin means the pinned piece literally cannot move — moving would expose the king to check.',
      'To exploit a pin: add attackers to the pinned piece, since it cannot flee.',
      'Defensive techniques: interpose a piece, move the king off the pin line, or capture the pinning piece.',
      "Pins are powerful not just for winning material — they restrict the opponent's options and create time to improve your position.",
    ],
  },

  // 9. Fork — Knight Fork
  {
    id: 'tactic-fork-knight',
    kind: 'middlegame',
    name: 'Tactic: Knight Fork',
    subcategory: 'tactical',
    difficulty: 'beginner',
    description:
      "A fork is when one piece attacks two or more enemy pieces simultaneously. Knight forks are the most dangerous because the knight's L-shaped movement is unintuitive and hard to spot. A knight can attack pieces that cannot attack it back (except another knight). The \"royal fork\" — a knight checking the king while attacking the queen — is one of the most devastating tactics in chess.",
    // White knight can reach c7 to fork king on e8 and rook on a8.
    startingFen: 'r3kb1r/pppp1ppp/2n1bq2/4N3/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 5',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Nxc6',
        explanation:
          'Capturing the knight, clearing the path. This also forces Black to recapture, setting up the fork.',
        playedBy: 'user',
      },
      {
        moveSan: 'dxc6',
        explanation: 'Black recaptures with the d-pawn, opening the d-file.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Qh5',
        explanation:
          "Attacking f7 and targeting the exposed king position. The queen also eyes h5-e8 diagonal. Black's king is stuck in the center.",
        playedBy: 'user',
      },
      {
        moveSan: 'g6',
        explanation: 'Black blocks the check threat, but weakens the kingside.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Qb5',
        explanation:
          'Forking the c6-pawn and the b7-pawn while pinning c6 to the king. The queen demonstrates that any piece can fork — not just knights.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'A fork attacks two or more pieces at once — the opponent can only save one.',
      "Knight forks are the hardest to spot because of the L-shaped movement pattern.",
      'The "royal fork" (king + queen) wins the queen since the king must move out of check first.',
      'To spot fork opportunities: look for two enemy pieces on the same color square that a knight could reach.',
    ],
  },

  // 10. Skewer
  {
    id: 'tactic-skewer',
    kind: 'middlegame',
    name: 'Tactic: Skewer',
    subcategory: 'tactical',
    difficulty: 'beginner',
    description:
      'A skewer is the reverse of a pin: a more valuable piece is attacked along a line, and when it moves, a less valuable piece behind it is captured. The most common skewer is a rook or bishop checking the king, forcing it to move and revealing a piece behind it. Only bishops, rooks, and queens can create skewers (they need to move in a straight line). Skewers are most common in endgames with open lines.',
    // White rook ready to skewer Black's king and queen on the a-file.
    startingFen: 'q5k1/8/8/8/R7/8/8/6K1 w - - 0 1',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Ra8+',
        explanation:
          'The rook checks the king along the 8th rank, skewering it against the queen on a8. The king MUST move out of check, and then the rook captures the queen.',
        playedBy: 'user',
      },
      {
        moveSan: 'Kf7',
        explanation: 'The king moves — it has no choice. The queen on a8 is now unprotected.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Rxa8',
        explanation:
          'The rook captures the queen. A full queen won for free through the skewer — the most valuable non-king piece in chess.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'A skewer is a "reverse pin" — the more valuable piece is in front and must move, exposing the piece behind.',
      'Skewers along ranks and files use rooks or queens; skewers along diagonals use bishops or queens.',
      'The most devastating skewers check the king, forcing it to move and allowing capture of whatever is behind.',
      'To defend against skewers, avoid placing valuable pieces on the same line as your king.',
    ],
  },

  // 11. Discovered Attack
  {
    id: 'tactic-discovered-attack',
    kind: 'middlegame',
    name: 'Tactic: Discovered Attack',
    subcategory: 'tactical',
    difficulty: 'intermediate',
    description:
      "A discovered attack occurs when one piece moves, revealing an attack from another piece behind it. The power is that the moved piece can create its own threat simultaneously — the opponent faces two threats at once and can usually only deal with one. A discovered check is even stronger: since check must be answered immediately, the piece that moved can do anything it wants (capture a queen, threaten mate) while the discovered check forces a response.",
    // White's knight on d5 can move to reveal an attack from Bb5 on the queen.
    startingFen: 'r1b1k2r/ppppqppp/2n2n2/1BbNN3/4P3/8/PPPP1PPP/R1BQK2R w KQkq - 0 7',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Nxf6+',
        explanation:
          'The knight captures on f6 with check, and simultaneously the bishop on b5 discovers an attack on the queen through the now-open b5-e8 line. Two threats at once: check and attack on the queen.',
        playedBy: 'user',
      },
      {
        moveSan: 'gxf6',
        explanation:
          'Black must deal with the check first — capturing the knight. But now the queen is attacked by the bishop.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bxc6',
        explanation:
          'The bishop captures the knight on c6, winning material. The discovered attack created two simultaneous threats that Black could not both handle.',
        playedBy: 'user',
      },
      {
        moveSan: 'dxc6',
        explanation: 'Black recaptures, but is down material with a ruined pawn structure.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Nxc5',
        explanation:
          'Collecting another piece. The discovered attack started a tactical avalanche — once the coordination was disrupted, the material losses cascaded.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'A discovered attack creates two threats simultaneously — the moving piece and the revealed piece each threaten something.',
      'Discovered checks are especially powerful because check must be answered, giving the moved piece a free hand.',
      'Look for pieces lined up behind another piece — when the front piece moves, the rear piece attacks.',
      'The "windmill" is the ultimate discovered attack: alternating direct and discovered checks to capture pieces with each move.',
    ],
  },

  // 12. Double Check
  {
    id: 'tactic-double-check',
    kind: 'middlegame',
    name: 'Tactic: Double Check',
    subcategory: 'tactical',
    difficulty: 'intermediate',
    description:
      'Double check is the most forcing move in chess. Both the moved piece and the revealed piece give check simultaneously. The only way to escape double check is to move the king — you cannot block two checks at once, and you cannot capture two pieces at once. This makes double check incredibly dangerous: it often leads to checkmate because the king\'s escape squares are severely limited.',
    // Knight on f7 gives check, bishop on c4 also gives check — double check.
    startingFen: 'r1bqk2r/pppp1Npp/2n2n2/2b1p3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 5',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Kf8',
        explanation:
          'The ONLY legal response to double check — the king must move. Blocking or capturing is impossible when two pieces give check simultaneously. Ke7 loses to Nd6+ fork.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Nxd8',
        explanation:
          'The knight captures the queen! Because the double check forced the king to move, the knight had a free hand to take the most valuable piece on the board.',
        playedBy: 'user',
      },
      {
        moveSan: 'Nxd8',
        explanation: 'Black recaptures with the knight on c6.',
        playedBy: 'auto',
      },
      {
        moveSan: 'O-O',
        explanation:
          'White castles, up a full queen. The double check allowed White to win the queen because Black had no way to simultaneously block the knight check and the bishop check.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Double check = two pieces giving check at once. The ONLY escape is to move the king.',
      'You cannot block a double check (two lines to block) and you cannot capture both checking pieces.',
      'Double check often leads to mate or massive material gain because the king\'s options are so limited.',
      'Set up double checks by aligning a bishop/rook behind a knight or another piece that can move with check.',
    ],
  },

  // 13. Deflection
  {
    id: 'tactic-deflection',
    kind: 'middlegame',
    name: 'Tactic: Deflection',
    subcategory: 'tactical',
    difficulty: 'intermediate',
    description:
      "Deflection forces a defending piece away from its critical duty. Every piece in a position has responsibilities — guarding a square, defending another piece, or preventing a threat. If you can force that piece to move away from its job, the thing it was guarding falls. Deflection is the tactical cousin of \"removal of the guard\" — instead of capturing the defender, you lure it away.",
    // Black's queen guards the back rank. White deflects it with a threat.
    startingFen: 'r2q1rk1/ppp2ppp/3b1n2/3Pp3/8/5N2/PPP2PPP/R1BQR1K1 w - - 0 12',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Bg5',
        explanation:
          'Attacking the f6-knight which is pinned to the queen. The queen must decide: stay guarding the back rank or deal with the bishop threat. This creates a deflection dilemma.',
        playedBy: 'user',
      },
      {
        moveSan: 'Be7',
        explanation: 'Black tries to break the pin on the knight by interposing.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bxf6',
        explanation:
          'Capturing the knight. If Black recaptures with the bishop, the queen is deflected from defending the back rank.',
        playedBy: 'user',
      },
      {
        moveSan: 'Bxf6',
        explanation: 'Black recaptures, but the queen no longer defends d8 as firmly.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Re8',
        explanation:
          'Crashing into the back rank! The rook invades because the defensive setup was disrupted by the deflection sequence.',
        playedBy: 'user',
      },
      {
        moveSan: 'Qxe8',
        explanation: 'The queen is deflected to e8 to prevent immediate mate.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Qd7',
        explanation:
          'Attacking the deflected queen and threatening to invade. White gained significant initiative through the deflection sequence.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Deflection forces a piece away from its defensive duty — the thing it was guarding becomes vulnerable.',
      'Look for pieces doing double duty (guarding two things) — they are prime deflection targets.',
      'Sacrifices are often the tool: give up material to pull the defender away, then exploit what it left unguarded.',
      "The difference from decoy: deflection pulls a piece AWAY from where it's needed; decoy lures it TO a bad square.",
    ],
  },

  // 14. Back Rank Mate
  {
    id: 'tactic-back-rank-mate',
    kind: 'middlegame',
    name: 'Tactic: Back Rank Mate',
    subcategory: 'tactical',
    difficulty: 'beginner',
    description:
      "Back rank mate occurs when a rook or queen delivers checkmate on the opponent's first rank because the king is trapped behind its own pawns with no escape square (\"luft\"). This is one of the most common tactical patterns — it happens at every level of chess. Prevention is simple: push one pawn (h3/h6) to create an escape square. But in the heat of battle, players forget, and the back rank strikes.",
    // Classic back rank setup: Black has a queen that can invade.
    // White's king is trapped behind pawns on f2, g2, h2 with no escape.
    startingFen: '6k1/5ppp/8/8/8/4q3/5PPP/3R2K1 b - - 0 1',
    userColor: 'b',
    mainLine: [
      {
        moveSan: 'Qe1+',
        explanation:
          'Forcing the rook to capture — this is a classic deflection into back rank mate. The queen sacrifices itself to remove the only piece guarding the first rank.',
        playedBy: 'user',
      },
      {
        moveSan: 'Rxe1',
        explanation:
          "White must capture — there's no other way to deal with the check. But now the first rank is completely unguarded and Black has no second piece to deliver mate in this simplified example. The key concept is clear: the back rank was fatally weak.",
        playedBy: 'auto',
      },
    ],
    keyPoints: [
      'Back rank mate happens when the king is trapped behind its own pawns on the first rank.',
      'Prevention: create "luft" by pushing h3 (or h6) to give the king an escape square.',
      'The key tactical motif is often a queen sacrifice or deflection to clear the back rank.',
      'Always be aware of back rank vulnerability before committing your last rook to an attack far from home.',
    ],
  },

  // 15. Removal of the Guard
  {
    id: 'tactic-removal-of-guard',
    kind: 'middlegame',
    name: 'Tactic: Removal of the Guard',
    subcategory: 'tactical',
    difficulty: 'intermediate',
    description:
      "Every defensive position depends on key defenders. Removal of the guard eliminates the piece that holds the defense together — once it's gone, the position collapses. The methods include: capturing the defender outright, deflecting it, overloading it, or interfering with its defensive line. The key insight: before attacking a target, ask \"what defends this?\" Then figure out how to remove that defender.",
    // Black's Nf6 guards h7. White removes it to deliver Qxh7#.
    startingFen: 'r1bq1rk1/ppppbppp/2n2n2/4p2Q/2B1P3/3P4/PPP2PPP/RNB1K1NR w KQ - 0 6',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Bg5',
        explanation:
          'Targeting the knight on f6 — the only piece defending h7 from the queen. If the knight is removed, Qxh7# is checkmate.',
        playedBy: 'user',
      },
      {
        moveSan: 'h6',
        explanation:
          'Black tries to chase the bishop away, but this actually weakens the king further.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bxf6',
        explanation:
          'Removing the guard! The knight that defended h7 is captured. Now h7 is fatally weak.',
        playedBy: 'user',
      },
      {
        moveSan: 'Bxf6',
        explanation:
          'Black recaptures, but the damage is done — h7 is no longer defended by a piece.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Qxh6',
        explanation:
          "The queen crashes in with a devastating attack. With the knight gone, the h-pawn area is wide open and Black's king is in mortal danger.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Before attacking a target, identify what defends it — then remove that defender.',
      'Methods: capture it directly, deflect it, overload it, or block its defensive line.',
      'This pattern is especially lethal against the king — remove the one piece guarding a mating square and the game is over.',
      'Defensive awareness: always check if your key defenders are protected. If a single piece holds your position together, it is a tactical vulnerability.',
    ],
  },

  // 16. Zwischenzug
  {
    id: 'tactic-zwischenzug',
    kind: 'middlegame',
    name: 'Tactic: Zwischenzug (In-Between Move)',
    subcategory: 'tactical',
    difficulty: 'advanced',
    description:
      "Zwischenzug (German for \"in-between move\") means inserting an unexpected intermediate move — usually a check, a threat to the queen, or an even bigger threat — before making the expected recapture. It disrupts the opponent's calculation: they expected you to recapture, but instead you play something even more urgent first. Then you recapture under better conditions. The key question to always ask: \"Do I HAVE to recapture right now, or is there something better?\"",
    // After an exchange, instead of recapturing, White plays an in-between check.
    startingFen: 'r1bqkb1r/pppp1ppp/2n5/4N3/2B1n3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Bxf7+',
        explanation:
          'A zwischenzug! Instead of dealing with the attacked knight on e5, White inserts an in-between bishop sacrifice with check. The king MUST respond to check before anything else.',
        playedBy: 'user',
      },
      {
        moveSan: 'Ke7',
        explanation: 'The king moves — it cannot castle anymore. This was the whole point of the intermediate move.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Nxc6+',
        explanation:
          'Now the knight captures with check, discovered from the f7-bishop! The zwischenzug set up this second tactical blow. Black is losing material and king safety.',
        playedBy: 'user',
      },
      {
        moveSan: 'dxc6',
        explanation: 'Black recaptures, but the king is stuck in the center, unable to castle.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bb3',
        explanation:
          "The bishop retreats to safety, having accomplished its mission. White has won a pawn, destroyed Black's castling rights, and has a dominating position — all because of the in-between move.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Zwischenzug = an unexpected in-between move instead of the "obvious" recapture.',
      'Checks and queen attacks are the most common zwischenzugs because they force an immediate response.',
      'Always ask: "Do I have to recapture right now, or is there something even better?"',
      "Zwischenzugs disrupt your opponent's calculated sequence — they planned for the recapture, not the surprise.",
    ],
  },

  // 17. Overloaded Piece
  {
    id: 'tactic-overloaded-piece',
    kind: 'middlegame',
    name: 'Tactic: Overloaded Piece',
    subcategory: 'tactical',
    difficulty: 'intermediate',
    description:
      "An overloaded piece has too many defensive responsibilities — it must guard two or more things simultaneously, but can only deal with one at a time. By attacking one of the things the overloaded piece defends, you force the opponent to choose which to save and which to lose. The key skill: scan the opponent's position for pieces doing double (or triple) duty, then create a situation where they cannot fulfill all their obligations.",
    // Black's queen on d8 must guard the back rank AND the c6 knight.
    startingFen: 'r2q1rk1/pp2bppp/1np2n2/4N3/3P4/6Q1/PPP2PPP/R1B2RK1 w - - 0 12',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Nxc6',
        explanation:
          'Capturing the knight, which forces a decision. If the queen recaptures, it abandons the back rank defense. If a pawn recaptures, the queen must still guard multiple weaknesses.',
        playedBy: 'user',
      },
      {
        moveSan: 'Qxc6',
        explanation: "The queen recaptures to hold the queenside together, but now it's been pulled away from defending d8.",
        playedBy: 'auto',
      },
      {
        moveSan: 'Bf4',
        explanation:
          "Developing the bishop with a threat. The queen on c6 is now overloaded: it must watch the back rank, defend b6, and deal with White's growing pressure. Something has to give.",
        playedBy: 'user',
      },
      {
        moveSan: 'Rfd8',
        explanation: 'Black brings a rook to help, but the queen is still stretched thin.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Qe5',
        explanation:
          'The queen centralizes with multiple threats. Black\'s pieces are tied down defending, while White can improve freely — the hallmark of successfully exploiting an overloaded piece.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'An overloaded piece has more defensive jobs than it can handle — attack one, and the other falls.',
      'To spot overloads: find enemy pieces defending two different things, then threaten both.',
      'Overloads are often invisible until you create the second threat — the first threat reveals the overload.',
      'Defense against overloading: add a second defender, trade off the attacking piece, or simplify the position.',
    ],
  },

  // =========================================================================
  // PLANNING LESSONS (18–22)
  // =========================================================================

  // 18. Forming a Plan — Imbalance Assessment
  {
    id: 'planning-forming-a-plan',
    kind: 'middlegame',
    name: 'Planning: How to Form a Plan',
    subcategory: 'strategic',
    difficulty: 'intermediate',
    description:
      "The biggest mistake amateurs make is moving without a plan. Silman's technique: (1) evaluate the position — material, king safety, pawn structure, piece activity, space; (2) identify the imbalances — what's different between the two sides; (3) create a plan based on YOUR advantages; (4) find moves that serve the plan. A bad plan is better than no plan — even an imperfect plan gives your moves purpose and direction. Re-evaluate after every exchange or pawn move, because the imbalances shift.",
    // White has space advantage on kingside, bishop pair vs bishop+knight.
    // White should form a plan based on these imbalances.
    startingFen: 'r1bq1rk1/ppp2ppp/3bpn2/3p4/3P1B2/2NBPN2/PPP2PPP/R2Q1RK1 w - - 0 9',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Qe2',
        explanation:
          'Step 1 of plan formation: assess the imbalances. White has more central space and a better-placed bishop (f4 vs d6). The plan: use the kingside space to build an attack. The queen goes to e2 to support both flanks.',
        playedBy: 'user',
      },
      {
        moveSan: 'Re8',
        explanation: 'Black develops the rook to the semi-open file, pursuing their own plan of central pressure.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Ne5',
        explanation:
          'Executing the plan: the knight centralizes on e5, the most powerful square. It supports a future kingside attack and controls key squares. Every move serves the plan.',
        playedBy: 'user',
      },
      {
        moveSan: 'Nfd7',
        explanation: 'Black challenges the strong knight, trying to trade it off.',
        playedBy: 'auto',
      },
      {
        moveSan: 'f3',
        explanation:
          "Supporting the e4 square and preparing a potential g4-g5 kingside expansion. The plan adapts: if Black trades knights, White recaptures and maintains the space advantage.",
        playedBy: 'user',
      },
      {
        moveSan: 'Nxe5',
        explanation: 'Black trades the strong knight.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bxe5',
        explanation:
          "Recapturing with the bishop keeps central control. White's plan has succeeded: the dark-squared bishop dominates e5, the kingside is ready for expansion, and all White's moves served a coherent strategy.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Evaluate the position first: material, king safety, pawn structure, piece activity, space.',
      'Identify imbalances: what advantages do YOU have? What does your opponent have?',
      'Every move should serve your plan — random "good" moves lose to coordinated plans.',
      'Re-evaluate after exchanges and pawn moves — the imbalances shift, so your plan may need updating.',
    ],
  },

  // 19. Position Evaluation
  {
    id: 'planning-position-evaluation',
    kind: 'middlegame',
    name: 'Planning: Evaluating a Position',
    subcategory: 'strategic',
    difficulty: 'beginner',
    description:
      'Before you can plan, you must evaluate. The checklist (in order of importance): (1) King Safety — is either king exposed? (2) Material — who has more? (3) Piece Activity — are pieces well-placed and coordinated? (4) Pawn Structure — weak pawns, passed pawns, space? (5) Control of key squares and files. (6) Initiative — who is making threats? Signs of advantage: active pieces, better structure, safer king, open files, passed pawns, outposts. Signs of trouble: passive pieces, weak pawns, exposed king, no pawn breaks.',
    // A position where evaluation reveals White has a clear advantage:
    // better pieces, safer king, pressure on weak pawns.
    startingFen: 'r4rk1/pbq1bppp/1pn1pn2/2pp4/3P4/1PNBPN2/PBP2PPP/R2Q1RK1 w - - 0 10',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'dxc5',
        explanation:
          'Evaluation step: White\'s bishop pair (Bb2 + Bd3) is strong in this semi-open position. Opening the position favors bishops over knights. This capture creates an isolated pawn on d5 for Black.',
        playedBy: 'user',
      },
      {
        moveSan: 'bxc5',
        explanation: 'Black recaptures, but now has an isolated d5-pawn — a structural weakness identified in the evaluation.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bf5',
        explanation:
          "Piece activity check: the bishop moves to an active square, pressuring the e6-pawn and getting out of the d-file. White's pieces are more harmoniously placed.",
        playedBy: 'user',
      },
      {
        moveSan: 'Rab8',
        explanation: 'Black seeks counterplay on the b-file.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Na4',
        explanation:
          'Targeting the weak c5 pawn — a consequence of the structural weakness. The evaluation identified this target and the plan exploits it.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Always evaluate before planning: king safety, material, piece activity, pawn structure, key squares, initiative.',
      'Active pieces, good structure, and a safe king are the three pillars of a strong position.',
      'Weak pawns (isolated, backward, doubled) are long-term targets — build your plan around attacking them.',
      'The evaluation checklist works at every level — grandmasters use the same mental framework.',
    ],
  },

  // 20. When to Trade Pieces
  {
    id: 'planning-when-to-trade',
    kind: 'middlegame',
    name: 'Planning: When to Trade Pieces',
    subcategory: 'strategic',
    difficulty: 'intermediate',
    description:
      "Knowing when to trade and when to keep pieces is a critical strategic skill. Trade when: you're ahead in material (simplification makes the advantage easier to convert), you want to reduce attacking potential, or you can swap your bad piece for their good one. Keep pieces when: you have a space advantage, you're attacking, your pieces are more active, or you're behind in material (you need complications). Golden rule: trade your worst piece for their best piece.",
    // White is up a pawn with a strong position. Trading into a winning endgame.
    startingFen: 'r2q1rk1/pp2bppp/4pn2/2Pp4/3P4/4BN2/PP2QPPP/R4RK1 w - - 0 14',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Qb5',
        explanation:
          "White is up a pawn. The plan: trade queens to reach a winning endgame. With queens off, the extra pawn becomes decisive and there's no risk of a kingside attack.",
        playedBy: 'user',
      },
      {
        moveSan: 'Qc7',
        explanation:
          'Black avoids the queen trade, trying to keep complications alive — the correct defensive strategy when down material.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Qa5',
        explanation:
          'Persistent! White keeps offering the queen exchange. When ahead in material, trade pieces (not pawns) — each trade brings you closer to a won endgame.',
        playedBy: 'user',
      },
      {
        moveSan: 'Qxa5',
        explanation: 'Black is forced to accept the trade or allow further positional concessions.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Rxa5',
        explanation:
          "Queens are off. Now White's extra pawn is a serious advantage. The rook on a5 is active, the pawn structure is healthy, and the bishop on e3 supports the passed c5-pawn.",
        playedBy: 'user',
      },
      {
        moveSan: 'Nd7',
        explanation: 'Black tries to blockade the c5-pawn.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Nd2',
        explanation:
          'Rerouting the knight to support the c-pawn advance (Nc4 next). When ahead, trade pieces but keep pawns — more pawns means more promotion candidates.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'When ahead in material: trade pieces (not pawns) to simplify into a winning endgame.',
      'When behind in material: keep pieces on and seek complications — trade pawns if anything.',
      "Trade your worst piece for the opponent's best piece — relative improvement matters more than absolute quality.",
      'If you have a space advantage, keep pieces on the board — more pieces magnify the cramping effect.',
    ],
  },

  // 21. Prophylactic Thinking
  {
    id: 'planning-prophylactic-thinking',
    kind: 'middlegame',
    name: 'Planning: Prophylactic Thinking',
    subcategory: 'strategic',
    difficulty: 'advanced',
    description:
      "Prophylactic thinking means asking \"What does my opponent want to do?\" before each move, then deciding whether to prevent it. Nimzowitsch introduced the concept; Petrosian and Karpov mastered it. A prophylactic move both prevents the opponent's plan AND improves your own position. The classic example: h3 prevents Bg4 pins, creates luft against back-rank mates, and costs just one tempo. Prophylaxis is NOT passive — it's proactive defense that restricts the opponent while you improve.",
    // White uses prophylaxis to shut down Black's counterplay before it starts.
    startingFen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PNP3/2N1B3/PP2BPPP/R2Q1RK1 w - - 0 9',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'f3',
        explanation:
          "Prophylaxis! White asks: \"What does Black want?\" Answer: ...Ng4 attacking the e3-bishop, or ...d5 striking the center. f3 prevents both — the knight is denied g4, and e4 is reinforced. One move shuts down two plans.",
        playedBy: 'user',
      },
      {
        moveSan: 'a6',
        explanation: 'Black prepares ...b5, a queenside pawn expansion. White must decide: prevent it or ignore it?',
        playedBy: 'auto',
      },
      {
        moveSan: 'a4',
        explanation:
          "Another prophylactic move! This prevents ...b5 entirely, killing Black's queenside counterplay before it starts. Petrosian loved this type of move — eliminate ALL opponent's active ideas.",
        playedBy: 'user',
      },
      {
        moveSan: 'Bd7',
        explanation: 'Black develops, but the aggressive plans have been neutralized.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Qd2',
        explanation:
          "Now that Black's counterplay is contained, White improves calmly. The queen connects to the e3-bishop, prepares Bh6 to trade Black's best piece (the g7 bishop), and eyes the kingside.",
        playedBy: 'user',
      },
      {
        moveSan: 'Rc8',
        explanation: 'Black puts the rook on the c-file, one of the few active plans left.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Bh6',
        explanation:
          "Trading the opponent's best piece — the g7-bishop that pressures d4 and the long diagonal. This is proactive prophylaxis: removing the piece that supports Black's biggest strategic threat.",
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Before each move, ask: "What does my opponent want to do?" Then decide whether to prevent it.',
      'A great prophylactic move both prevents the opponent\'s plan AND improves your own position.',
      'Prophylaxis is NOT passive — it is proactive restriction. Petrosian won a World Championship with this approach.',
      'Common prophylactic moves: h3 (prevents Bg4/back-rank issues), a4 (prevents ...b5), f3 (supports the center).',
    ],
  },

  // 22. Endgame Transition
  {
    id: 'planning-endgame-transition',
    kind: 'middlegame',
    name: 'Planning: Transitioning to the Endgame',
    subcategory: 'strategic',
    difficulty: 'advanced',
    description:
      "Knowing when and how to transition from middlegame to endgame is a hallmark of strong play. Transition when: you have a lasting structural advantage (passed pawn, better structure), you're ahead in material, or the opponent's attack is fading. How: trade queens (the most important step), activate your king (in the endgame it's a fighting piece), and create or push passed pawns. Do NOT transition when your opponent has the better endgame, when you have an active attack, or when you're behind in material.",
    // White has an extra pawn and a passed d5-pawn. Time to transition.
    startingFen: 'r3r1k1/pp3ppp/2p1pq2/3P4/8/4BQ2/PPP2PPP/R4RK1 w - - 0 18',
    userColor: 'w',
    mainLine: [
      {
        moveSan: 'Qxf6',
        explanation:
          "Trading queens! This is the critical step in transitioning to an endgame. With queens off the board, White's passed d5-pawn becomes the dominant feature, and there's no risk of a kingside attack.",
        playedBy: 'user',
      },
      {
        moveSan: 'gxf6',
        explanation:
          "Black recaptures, but now the king is slightly weakened and the endgame favors White's passed pawn.",
        playedBy: 'auto',
      },
      {
        moveSan: 'dxe6',
        explanation:
          'Advancing the passed pawn by capturing. The d-pawn was passed, and now the e6-pawn trades off, creating a new passed e-pawn for White. In the endgame, passed pawns are the primary winning weapon.',
        playedBy: 'user',
      },
      {
        moveSan: 'fxe6',
        explanation: 'Black captures back, but White still has the better structure.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Kf2',
        explanation:
          'Activating the king! This is the second key principle: in the endgame, the king is a fighting piece. It marches toward the center to support the pawns and attack weaknesses.',
        playedBy: 'user',
      },
      {
        moveSan: 'Rad8',
        explanation: 'Black activates the rook, seeking counterplay.',
        playedBy: 'auto',
      },
      {
        moveSan: 'Ke2',
        explanation:
          'The king continues its march toward the center. From e2 it can go to d3, supporting a potential passed pawn. The endgame transition is complete: no queens, active king, superior structure.',
        playedBy: 'user',
      },
    ],
    keyPoints: [
      'Trade queens to transition — it is the single most important step. Without queens, structural advantages dominate.',
      'Activate your king immediately after queens come off — in the endgame, the king is a powerful fighting piece.',
      'Create and advance passed pawns — they are the primary winning weapon in endgames.',
      'Do NOT enter the endgame if your opponent has better structure or your attack has not finished.',
    ],
  },
];
