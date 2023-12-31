import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "Leo's Bug Tracker Api",
    description:
      "Documentation generated by the <b>swagger-autogen</b> module. With assistance of Leonardo Roić",
  },
  host: "localhost:4000",
  basePath: "./",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Projects",
      description: "Endpoints",
    },
    {
      name: "Bugs",
      description: "Endpoints",
    },
  ],
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api_key",
      in: "header",
    },
    petstore_auth: {
      type: "oauth2",
      authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
      flow: "implicit",
      scopes: {
        read_pets: "read your pets",
        write_pets: "modify pets in your account",
      },
    },
  },
  definitions: {
    Bug: {
      title: "Fix Login Page Issue",
      description: "Users unable to log in due to a bug on the login page.",
      projectId: "project123",
      completed: false,
      timestamp: new Date(), // Assuming you want the current timestamp
      createdBy: "user456",
    },
    Project: {
      projectName: "Sample Project", // Replace with an actual project name
      color: "#3498db", // Replace with an actual color code
      description: "This is a sample project description.", // Replace with an actual description
      users: ["user1", "user2"], // Replace with actual user IDs
      createdBy: "creatorUser", // Replace with the ID of the user who created the project
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/**.js"];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
  await import("./server.js"); // Your project's root file
});
