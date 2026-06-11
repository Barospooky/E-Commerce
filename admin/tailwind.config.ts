import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        soil: "#30251d",
        clay: "#b96f3e",
        leaf: "#236b43",
        moss: "#7b9d42",
        cream: "#f8f2e8",
        oat: "#eadbc5",
        ink: "#17120e"
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Manrope", "Verdana", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(48, 37, 29, 0.14)",
        card: "0 18px 40px rgba(48, 37, 29, 0.10)"
      },
      backgroundImage: {
        "grain-field": "radial-gradient(circle at 10% 20%, rgba(123,157,66,.22), transparent 28%), radial-gradient(circle at 80% 0%, rgba(185,111,62,.18), transparent 34%), linear-gradient(135deg, #f8f2e8 0%, #f2e6d1 48%, #e7d4b9 100%)"
      }
    }
  },
  plugins: []
} satisfies Config;
