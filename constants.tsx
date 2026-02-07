import React from "react";
import { ValentineDay, DayConfig, QuizQuestion } from "./types";

export const COLORS = {
  pink: "#FFD1DC",
  peach: "#FFCCB6",
  coral: "#F3B0C3",
  rose: "#FF69B4",
  cream: "#FFF5E1",
  mint: "#B5EAD7",
};

export const VALENTINE_WEEK: DayConfig[] = [
  {
    id: ValentineDay.ROSE,
    title: "Rose Day",
    date: 7,
    icon: "🌹",
    color: "#FF6B6B",
    message: "Pick a rose for my sweetest ayushi!",
    passwords: ["firstkiss", "ourfirstdate", "myrose"],
    hint: "Where did our love story begin? 💕",
  },
  {
    id: ValentineDay.PROPOSE,
    title: "Propose Day",
    date: 8,
    icon: "💍",
    color: "#FF92A9",
    message: "A special question just for you!",
    passwords: ["foreveryours", "yesitsyou", "sayyes"],
    hint: "What I want to be... (forever + possessive) 💑",
  },
  {
    id: ValentineDay.CHOCOLATE,
    title: "Chocolate Day",
    date: 9,
    icon: "🍫",
    color: "#D2691E",
    message: "Sweet bites for a sweet soul!",
    passwords: ["sweetayushi", "chocokiss", "sweetheart"],
    hint: "You're sweeter than... 🍫✨",
  },
  {
    id: ValentineDay.TEDDY,
    title: "Teddy Day",
    date: 10,
    icon: "🧸",
    color: "#F4A460",
    message: "Time for a cuddle session!",
    passwords: ["bearhug", "cuddlebuddy", "snugglebear"],
    hint: "What I want to give you all day? 🤗",
  },
  {
    id: ValentineDay.PROMISE,
    title: "Promise Day",
    date: 11,
    icon: "🤝",
    color: "#4facfe",
    message: "Holding onto forever together.",
    passwords: ["alwaystogether", "mypromise", "neverleave"],
    hint: "What we'll be... (always + ?) 👫",
  },
  {
    id: ValentineDay.HUG,
    title: "Hug Day",
    date: 12,
    icon: "🤗",
    color: "#f093fb",
    message: "Sending you a big warm squeeze!",
    passwords: ["warmembrace", "holdmetight", "inyourarms"],
    hint: "My favorite place to be... 💕",
  },
  {
    id: ValentineDay.KISS,
    title: "Kiss Day",
    date: 13,
    icon: "💋",
    color: "#f06292",
    message: "Kisses delivered straight to you!",
    passwords: ["softlips", "kissme", "yourkisses"],
    hint: "What I dream about... 😘",
  },
  {
    id: ValentineDay.VALENTINE,
    title: "Valentine's Day",
    date: 14,
    icon: "💕",
    color: "#e91e63",
    message: "You are my world, ayushi!",
    passwords: ["iloveayushi", "myvalentine", "ayushiforever"],
    hint: "Three words, eight letters... (+ your name) 💖",
  },
];

export const DAILY_QUIZZES: Record<ValentineDay, QuizQuestion[]> = {
  [ValentineDay.ROSE]: [
    {
      question: "If I were a rose, which color would I be to match your love?",
      options: [
        "Red (Passion)",
        "Pink (Sweetness)",
        "Yellow (Best Friends)",
        "White (Purity)",
      ],
      correctAnswer: 1,
    },
    {
      question: "Where should we plant our 'Love Garden'?",
      options: [
        "In a castle",
        "In our dream home",
        "On the moon",
        "Wherever we are",
      ],
      correctAnswer: 3,
    },
    {
      question: "How many roses does ayushi deserve?",
      options: [
        "A dozen",
        "A thousand",
        "Infinity",
        "One (Because she is the only one)",
      ],
      correctAnswer: 2,
    },
    {
      question: "What's the best way to keep our love blooming?",
      options: [
        "Watering it",
        "Daily kisses",
        "Trust and Care",
        "All of the above",
      ],
      correctAnswer: 3,
    },
    {
      question: "Funny: What happens if a peach meets a rose?",
      options: [
        "A sweet scent",
        "A fuzzy flower",
        "Pure Magic",
        "ayushi smiles",
      ],
      correctAnswer: 2,
    },
  ],
  [ValentineDay.PROPOSE]: [
    {
      question: "If I proposed on a giant pizza, would you say yes?",
      options: [
        "Only if it's extra cheese",
        "Yes, obviously!",
        "Maybe later",
        "I'd eat the proposal!",
      ],
      correctAnswer: 1,
    },
    {
      question: "What is my favorite thing about you?",
      options: [
        "Your smile",
        "Your kind heart",
        "Your cute laugh",
        "Everything!",
      ],
      correctAnswer: 3,
    },
    {
      question: "Where is our dream romantic destination?",
      options: ["Paris", "Switzerland", "In a cozy blanket fort", "The Beach"],
      correctAnswer: 2,
    },
    {
      question: "If we were in a movie, what genre would it be?",
      options: ["Rom-Com", "Epic Romance", "Action Love", "Musical"],
      correctAnswer: 1,
    },
    {
      question: "What's our secret signal for 'I Love You'?",
      options: ["A wink", "A hand squeeze", "A nose boop", "A special look"],
      correctAnswer: 1,
    },
  ],
  [ValentineDay.CHOCOLATE]: [
    {
      question: "Which chocolate is as sweet as ayushi?",
      options: [
        "Milk Chocolate",
        "Caramel Filled",
        "Hazelnut Truffle",
        "None (Nothing is that sweet!)",
      ],
      correctAnswer: 3,
    },
    {
      question: "If we shared a box of chocolates, who gets the last one?",
      options: [
        "Me (of course)",
        "ayushi (always)",
        "We split it",
        "I steal it!",
      ],
      correctAnswer: 1,
    },
    {
      question: "What's the best topping for our love life?",
      options: ["Sprinkles", "Extra Kisses", "Hot Fudge", "Cuddles"],
      correctAnswer: 1,
    },
    {
      question: "How much chocolate is 'too much' chocolate?",
      options: ["One bar", "A whole box", "No such thing!", "Ask my stomach"],
      correctAnswer: 2,
    },
    {
      question: "Why is chocolate the best medicine?",
      options: [
        "It's yummy",
        "It makes us happy",
        "It tastes like love",
        "All of the above",
      ],
      correctAnswer: 3,
    },
  ],
  [ValentineDay.TEDDY]: [
    {
      question: "If I bought you a giant 10ft teddy, where would it sleep?",
      options: [
        "Between us",
        "On the floor",
        "It replaces me!",
        "In its own bed",
      ],
      correctAnswer: 0,
    },
    {
      question: "What's the best name for our couple teddy?",
      options: ["Peachy", "Snuggles", "ayushi Jr.", "Love Bug"],
      correctAnswer: 0,
    },
    {
      question: "Who gives better hugs, me or a teddy bear?",
      options: ["The Teddy", "Definitely Me", "It's a tie!", "ayushi knows!"],
      correctAnswer: 1,
    },
    {
      question: "What's the softest part of our relationship?",
      options: [
        "Our promises",
        "Your cheeks",
        "The way we talk",
        "Our morning hugs",
      ],
      correctAnswer: 1,
    },
    {
      question: "Funny: What does a teddy say after a long day?",
      options: ["I'm stuffed", "I need a hug", "Love ya!", "Beary tired"],
      correctAnswer: 0,
    },
  ],
  [ValentineDay.PROMISE]: [
    {
      question: "What's the most important promise I can make?",
      options: [
        "To buy you pizza",
        "To never let go",
        "To always listen",
        "All of the above",
      ],
      correctAnswer: 3,
    },
    {
      question: "I promise to laugh at your jokes even when they're...",
      options: ["Amazing", "Dad jokes", "Not funny at all", "Silent"],
      correctAnswer: 2,
    },
    {
      question: "A pinky promise means...",
      options: [
        "A light deal",
        "Unbreakable vow",
        "A cute gesture",
        "Just a finger touch",
      ],
      correctAnswer: 1,
    },
    {
      question: "I promise to be your...",
      options: ["Partner in crime", "Safe place", "Best friend", "Everything"],
      correctAnswer: 3,
    },
    {
      question: "Where should we keep our promises?",
      options: ["In a book", "In a safe", "In our hearts", "On a cloud"],
      correctAnswer: 2,
    },
  ],
  [ValentineDay.HUG]: [
    {
      question: "What's the scientific benefit of an ayushi hug?",
      options: [
        "Instant happiness",
        "Heart rate sync",
        "Infinite warmth",
        "All of the above",
      ],
      correctAnswer: 3,
    },
    {
      question: "What's the best kind of hug?",
      options: ["Back hug", "Long squeeze", "Lift-and-spin", "Sudden surprise"],
      correctAnswer: 1,
    },
    {
      question: "How long should a perfect hug last?",
      options: ["1 second", "10 seconds", "Until we fall asleep", "Forever"],
      correctAnswer: 2,
    },
    {
      question: "Where is the best place for a hug?",
      options: ["In the rain", "At the airport", "On the couch", "Everywhere"],
      correctAnswer: 3,
    },
    {
      question: "Funny: If we hug too long, what happens?",
      options: [
        "We melt",
        "We turn into a peach",
        "Static electricity",
        "We get hungry",
      ],
      correctAnswer: 1,
    },
  ],
  [ValentineDay.KISS]: [
    {
      question: "Where's the cutest place for a sneaky kiss?",
      options: ["Forehead", "Nose", "Cheek", "Lids"],
      correctAnswer: 0,
    },
    {
      question: "What do my kisses taste like?",
      options: ["Strawberries", "Magic", "Love", "Peaches"],
      correctAnswer: 3,
    },
    {
      question: "If a kiss could paint a color, what would it be?",
      options: ["Electric Pink", "Deep Red", "Sunshine Gold", "Soft Rose"],
      correctAnswer: 0,
    },
    {
      question: "A 'Butterfly Kiss' is done with...",
      options: ["Lips", "Eyelashes", "Noses", "Hands"],
      correctAnswer: 1,
    },
    {
      question: "How many kisses do you want right now?",
      options: ["One", "Ten", "A billion", "Too many to count"],
      correctAnswer: 3,
    },
  ],
  [ValentineDay.VALENTINE]: [
    {
      question: "Who is the most beautiful person in this universe?",
      options: ["A model", "A movie star", "ayushi", "Is that a trick?"],
      correctAnswer: 2,
    },
    {
      question: "What's the theme song of our future?",
      options: ["A love ballad", "Upbeat pop", "A custom tune", "A lofi beat"],
      correctAnswer: 3,
    },
    {
      question: "How many lifetimes do I want to spend with you?",
      options: ["This one", "Seven", "Infinite", "Whatever is possible"],
      correctAnswer: 2,
    },
    {
      question: "What's the secret ingredient of us?",
      options: ["Laughter", "Pizza", "Fate", "Peachy Love"],
      correctAnswer: 3,
    },
    {
      question: "ayushi, will you be my Valentine forever?",
      options: ["Yes", "Absolutely Yes", "Double Yes", "YES YES YES!"],
      correctAnswer: 3,
    },
  ],
};

export const PeachSVG: React.FC<{ mood?: string; className?: string }> = ({
  mood = "happy",
  className = "",
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-24 h-24 drop-shadow-2xl ${className}`}
    >
      <defs>
        <radialGradient id="peachGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFCCB6" />
          <stop offset="100%" stopColor="#FF9E80" />
        </radialGradient>
      </defs>
      <path
        d="M50 20 C20 20 10 50 10 70 C10 90 30 95 50 95 C70 95 90 90 90 70 C90 50 80 20 50 20"
        fill="url(#peachGradient)"
      />
      <path d="M50 25 C50 5 70 5 70 15 C70 25 50 30 50 25" fill="#8BC34A" />
      <g className="face">
        {mood === "sleepy" ? (
          <g stroke="#5D4037" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M30 55 Q35 50 40 55" />
            <path d="M60 55 Q65 50 70 55" />
          </g>
        ) : (
          <g fill="#5D4037">
            <circle cx="35" cy="55" r="4" />
            <circle cx="65" cy="55" r="4" />
          </g>
        )}
        {["blushing", "in-love", "wink", "giggling"].includes(mood) && (
          <g fill="#FF8A80" opacity="0.7">
            <circle cx="22" cy="65" r="7" />
            <circle cx="78" cy="65" r="7" />
          </g>
        )}
        <path
          d="M42 75 Q50 82 58 75"
          fill="none"
          stroke="#5D4037"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {mood === "in-love" && (
          <path
            d="M50 42 L54 46 Q56 48 54 50 L50 54 L46 50 Q44 48 46 46 Z"
            fill="#E91E63"
          />
        )}
      </g>
    </svg>
  );
};

export const PeachCoupleSVG: React.FC<{
  action?: "kiss" | "hands" | "blush";
  className?: string;
}> = ({ action = "hands", className = "" }) => {
  return (
    <div
      className={`flex items-center justify-center space-x-[-15px] ${className}`}
    >
      <PeachSVG
        mood={action === "kiss" ? "wink" : "happy"}
        className="scale-110"
      />
      {action === "hands" && (
        <div className="text-2xl z-10 animate-bounce">🤝</div>
      )}
      {action === "kiss" && (
        <div className="text-3xl z-10 animate-pulse">💋</div>
      )}
      <PeachSVG
        mood={action === "kiss" ? "blushing" : "blushing"}
        className="scale-110"
      />
    </div>
  );
};
