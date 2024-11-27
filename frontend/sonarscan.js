const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "sqp_a060ef800c0ba67b9f51b6b4e4216bca80572177",
    options: {
      "sonar.projectName": "frontend",
      "sonar.projectDescription": "Here I can add a description of my project",
      "sonar.projectKey": "frontend",
      "sonar.projectVersion": "0.0.1",
      "sonar.exclusions": "sonarscan.js, .gitignore, Dockerfile, src/components/Server.jsx, server.js",
      "sonar.sourceEncoding": "UTF-8",
    },
  },
  () => process.exit()
);
