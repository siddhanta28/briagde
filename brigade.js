const { events, Job } = require("brigadier");
events.on("exec", () => {
  var dockerBuild = new Job("docker-build")
  dockerBuild.image = "docker:dind";

  dockerBuild.tasks = [
    "dockerd-entrypoint.sh &",
    "sleep 30",
    "cd /src/",
    "docker build -t siddhanta28/brigade-test:20 ."
  ]

  dockerBuild.run();
});

