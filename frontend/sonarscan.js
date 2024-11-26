const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "sqp_65bd5cf13258a2e0a554d61f6ca6c5f29d8b5aec",
    options: {
      "sonar.projectName": "sonarqube-react-project",
      "sonar.projectDescription": "Here I can add a description of my project",
      "sonar.projectKey": "CallBase-Frontend",
      "sonar.projectVersion": "0.0.1",
      "sonar.exclusions": "sonarscan.js, .gitignore, Dockerfile, src/components/Server.jsx, server.js",
      "sonar.sourceEncoding": "UTF-8",
    },
  },
  () => process.exit()
);
