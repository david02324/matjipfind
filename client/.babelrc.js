module.exports = (api) => {
  const mode = process.env.NODE_ENV === "production";

  // This caches the Babel config by environment.
  api.cache.using(() => mode);

  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-typescript",
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
    plugins: ["@babel/plugin-proposal-class-properties"],
  };
};
