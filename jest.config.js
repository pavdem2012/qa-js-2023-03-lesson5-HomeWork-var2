module.exports = {

    testMatch: [
        '**/spec/**/*.test.js'
    ],
    reporters: [
        "default",
        ["jest-html-reporters", {
            publicPath: "./html-report",
            filename: "report.html",
            pageTitle: "Test Report",
            expand: true
        }]
    ],
};
