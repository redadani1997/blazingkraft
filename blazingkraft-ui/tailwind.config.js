module.exports = {
    important: true,
    content: ['./*.html', './src/**/*.css', './src/**/*.tsx', './src/**/*.ts'],
    plugins: [require('@tailwindcss/forms')],
    corePlugins: {
        preflight: false,
    },
};
