const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      gowun: ["gowun", "sans-serif"],
      dongle: ["dongle", "sans-serif"],
    },
  },
  plugins: [],
});
