export interface Testimonial {
  name: string;
  message: string;
  role?: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Carl Banner",
    message:
      "A no-code AI-powered backend? Talk about a game-changer! 🎮 For those of us in the development trenches, this could be a timesaving superhero!",
    role: "Founder @ceacle",
    avatar:
      "https://ph-avatars.imgix.net/5135330/original.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=36&h=36&fit=crop&dpr=1",
  },
  {
    name: "Sophia Watt",
    message: "No code, global delivery – this is revolutionary. 🚀",
    role: "Engineer",
    avatar:
      "https://ph-avatars.imgix.net/4571044/8fbdd4c7-ba5f-4b12-a3c6-302151ee096b.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=36&h=36&fit=crop&dpr=1",
  },
  {
    name: "Steve Jade",
    message:
      "Koxy AI = No code + AI backend magic! 🧙‍♂️ This is revolutionary. Cheers to the team for this incredible tool!",
    role: "Founder",
    avatar: "/NONE",
  },
  {
    name: "Robin Prie",
    message:
      "Koxy AI's no-code backend solution is pure brilliance. 🌟 Kudos to the team for making advanced tech so accessible!",
    role: "Indie maker",
    avatar: "/NONE",
  },
];

export default testimonials;
