const { events, Job } = require("brigadier");
events.on("exec", (e,project) => {
  var dockerBuild = new Job("docker-packaging");
  dockerBuild.image = "docker:dind";
  dockerBuild.privileged = true;
  dockerBuild.env = {
    DOCKER_DRIVER: "overlay",
    DOCKER_USER: project.secrets.dockerLogin,
    DOCKER_PASS: project.secrets.dockerPass
  }
    
  dockerBuild.tasks = [
    "dockerd-entrypoint.sh &",
    "sleep 30",
    "cd /src",
    "docker build -t siddhanta28/brigade-test:10 .",
    "docker login -u $DOCKER_USER -p $DOCKER_PASS",
    "docker push siddhanta28/brigade-test:10"
  ];
  
  dockerBuild.run();
});
